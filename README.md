# RealERPCRM - Cloud-Based Real Estate ERP/CRM

RealERPCRM is a comprehensive SaaS solution for realtors, developers, builders, and property managers. It streamlines operations, manages leads, tracks bookings, and provides AI-driven financial analysis.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (with Prisma ORM)
- **Authentication:** NextAuth.js (Email/Password + OTP Verification)
- **AI:** OpenAI API (for Real Estate Analysis)
- **Language:** TypeScript

## Features

- **Multi-Tenancy:** Role-based access for Superadmins, Admins, Managers, and Agents.
- **Lead Management:** Follow-up tracking, lead scoring, and automated assignments.
- **Booking System:** Unit tracking, payment progress, and tenant profiles.
- **Finance Module:** Income/Expense tracking and automated reports.
- **AI Copilot:** Financial performance analysis, chat-based queries, and recommendations.
- **Responsive UI:** Modern, teal-themed design optimized for all devices.

## Getting Started

### 1. Clone & Install
```bash
npm install
```

### 2. Database Setup
Create a `.env` file and add your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/fortify_crm?schema=public"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
OPENAI_API_KEY="your-openai-key"
```

### 3. Run Migrations & Seed
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```

## Deployment

This app is ready to be deployed on **Vercel**.
1. Push your code to GitHub.
2. Connect your repo to Vercel.
3. Add Environment Variables.
4. Vercel will automatically handle the build and deployment.

## License

MIT
