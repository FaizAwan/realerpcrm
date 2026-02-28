import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('superpassword123', 10);
  const userPassword = await bcrypt.hash('admin123', 10);

  // 1. Seed Tenants
  const eliteDev = await prisma.tenant.upsert({
    where: { slug: 'elite-dev' },
    update: {},
    create: {
      name: 'Elite Developers (Demo HQ)',
      slug: 'elite-dev',
      plan: 'pro',
    },
  });

  const skylineAgency = await prisma.tenant.upsert({
    where: { slug: 'skyline-agency' },
    update: {},
    create: {
      name: 'Skyline Agencies',
      slug: 'skyline-agency',
      plan: 'basic',
    },
  });

  // 2. Seed Users
  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@realerpcrm.com' },
    update: { password: hashedPassword },
    create: {
      username: 'superadmin',
      email: 'superadmin@realerpcrm.com',
      password: hashedPassword,
      role: 'superadmin',
      isVerified: true,
    },
  });

  const eliteAdmin = await prisma.user.upsert({
    where: { email: 'admin@realerpcrm.com' },
    update: { password: userPassword },
    create: {
      tenantId: eliteDev.id,
      username: 'elite_admin',
      email: 'admin@realerpcrm.com',
      password: userPassword,
      role: 'admin',
      isVerified: true,
    },
  });

  // 3. Seed Chart of Accounts (Essential for Finance)
  const coaData = [
    { code: '1000', name: 'Cash', type: 'Asset', category: 'Current Asset' },
    { code: '1100', name: 'Accounts Receivable', type: 'Asset', category: 'Current Asset' },
    { code: '1200', name: 'Inventory', type: 'Asset', category: 'Stock' },
    { code: '2100', name: 'Accounts Payable', type: 'Liability', category: 'Current Liability' },
    { code: '4000', name: 'Sales Revenue', type: 'Income', category: 'Operating Income' },
    { code: '5000', name: 'Cost of Goods Sold', type: 'Expense', category: 'Operating Expense' },
  ];

  for (const acc of coaData) {
    await prisma.chartOfAccount.upsert({
      where: { id: -1 }, // Dummy check for slug-like uniqueness if needed, using name/code here
      update: {},
      create: { ...acc, tenantId: eliteDev.id }
    });
  }

  // 4. Seed Suppliers
  await prisma.supplier.upsert({
    where: { id: 1 },
    update: {},
    create: {
      tenantId: eliteDev.id,
      name: 'Global Hardware Corp',
      contact: 'John Supplier',
      email: 'john@globalhw.com',
      phone: '+1 888 777 6666',
      address: 'Industrial Zone A, Silicon Valley'
    }
  });

  // 5. Seed Store Items (Inventory)
  await prisma.storeItem.upsert({
    where: { id: 1 },
    update: {},
    create: {
      tenantId: eliteDev.id,
      name: 'Ultra Concrete Mixer',
      category: 'Heavy Machinery',
      quantity: 50,
      unit: 'pcs',
      price: 25000.00
    }
  });

  // 6. Seed Leads (Marketing)
  const leadsData = [
    { name: 'Bruce Wayne', email: 'bruce@waynecorp.com', phone: '555-0192', source: 'Digital Marketing', status: 'qualified', priority: 'Hot', notes: 'Interested in industrial society project.' },
    { name: 'Peter Parker', email: 'peter@bugle.com', phone: '555-0123', source: 'Direct Referral', status: 'new', priority: 'Medium', notes: 'Looking for a residential studio unit.' },
  ];

  for (const ld of leadsData) {
    await prisma.lead.create({
      data: {
        ...ld,
        tenantId: eliteDev.id,
        status: ld.status as any
      }
    });
  }

  console.log('🏁 Professional Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
