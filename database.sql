-- RealEstateFortify MySQL Database Schema
-- Database: fortify_crm
-- Server: 127.0.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table structure for table `tenants`
-- --------------------------------------------------------

CREATE TABLE `tenants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `plan` enum('basic','pro','enterprise') DEFAULT 'basic',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `users`
-- --------------------------------------------------------

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin','manager','agent') DEFAULT 'agent',
  `is_verified` tinyint(1) DEFAULT '0',
  `otp_code` varchar(6) DEFAULT NULL,
  `otp_expiry` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `projects`
-- --------------------------------------------------------

CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('society','building','industrial','townhouse') NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `units`
-- --------------------------------------------------------

CREATE TABLE `units` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `unit_number` varchar(50) NOT NULL,
  `status` enum('available','booked','sold','vacant','reserved') DEFAULT 'available',
  `price` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `units_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `units_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `bookings`
-- --------------------------------------------------------

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `booking_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount_paid` decimal(15,2) DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `unit_id` (`unit_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `finance_entries`
-- --------------------------------------------------------

CREATE TABLE `finance_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `type` enum('income','expense') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `finance_entries_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `leads`
-- --------------------------------------------------------

CREATE TABLE `leads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `status` enum('new','contacted','qualified','lost','won') DEFAULT 'new',
  `assigned_to` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `leads_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leads_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `tasks`
-- --------------------------------------------------------

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenant_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `assigned_to` int(11) DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `status` enum('todo','in_progress','done') DEFAULT 'todo',
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- DUMMY DATA
-- --------------------------------------------------------

INSERT INTO `tenants` (`id`, `name`, `slug`, `plan`) VALUES
(1, 'Elite Developers', 'elite-dev', 'pro'),
(2, 'Skyline Agencies', 'skyline-agency', 'basic'),
(3, 'Northern Greens', 'northern-greens', 'enterprise');

-- Password is 'superpassword123' hashed (in dummy code we use raw for SQL import, but app uses bcrypt)
INSERT INTO `users` (`id`, `tenant_id`, `username`, `email`, `password`, `role`, `is_verified`) VALUES
(1, NULL, 'superadmin', 'superadmin@fortify.biz', '$2a$10$vI8A7DXpZyFjU1eP7pM9ZeNqW5m5mO5/b5yYpXJ5jXJ5jXJ5jXJ5', 'superadmin', 1),
(2, 1, 'elite_admin', 'admin@elitedev.com', '$2a$10$vI8A7DXpZyFjU1eP7pM9ZeNqW5m5mO5/b5yYpXJ5jXJ5jXJ5jXJ5', 'admin', 1),
(3, 1, 'elite_agent', 'agent@elitedev.com', '$2a$10$vI8A7DXpZyFjU1eP7pM9ZeNqW5m5mO5/b5yYpXJ5jXJ5jXJ5jXJ5', 'agent', 1);

INSERT INTO `projects` (`id`, `tenant_id`, `name`, `type`, `location`, `description`) VALUES
(1, 1, 'Northern Greens', 'society', 'Islamabad', 'Premium gated community with lush green parks.'),
(2, 1, 'Skyline Mall', 'building', 'Karachi', 'High-end shopping destination in the heart of the city.'),
(3, 3, 'Pine Valley', 'townhouse', 'Murree', 'Exclusive townhouses with scenic mountain views.');

INSERT INTO `units` (`id`, `tenant_id`, `project_id`, `unit_number`, `status`, `price`) VALUES
(1, 1, 1, 'Block A - 101', 'available', 15000000.00),
(2, 1, 1, 'Block A - 102', 'sold', 15000000.00),
(3, 1, 2, 'Shop 24', 'booked', 45000000.00),
(4, 1, 2, 'Shop 25', 'available', 48000000.00);

INSERT INTO `leads` (`id`, `tenant_id`, `name`, `phone`, `email`, `source`, `status`, `assigned_to`) VALUES
(1, 1, 'Ahmed Khan', '0300-1234567', 'ahmed@gmail.com', 'Facebook Ads', 'qualified', 3),
(2, 1, 'Sara Sheikh', '0321-9876543', 'sara@hotmail.com', 'Walk-in', 'new', 3),
(3, 1, 'Bilal Malik', '0333-5554443', 'bilal@yahoo.com', 'Referral', 'won', 3);

INSERT INTO `finance_entries` (`id`, `tenant_id`, `type`, `amount`, `category`, `description`) VALUES
(1, 1, 'income', 5000000.00, 'Booking Payment', 'Installment received for Shop 24'),
(2, 1, 'expense', 150000.00, 'Marketing', 'Monthly Facebook campaign budget'),
(3, 1, 'income', 45000.00, 'Late Fee', 'Recovery of late payment penalty');

INSERT INTO `tasks` (`id`, `tenant_id`, `title`, `description`, `assigned_to`, `due_date`, `status`) VALUES
(1, 1, 'Call Ahmed Khan', 'Follow up on the site visit request.', 3, '2026-02-18', 'todo'),
(2, 1, 'Update Unit Inventory', 'Mark Plot 102 as sold in the portal.', 2, '2026-02-17', 'done');

COMMIT;
