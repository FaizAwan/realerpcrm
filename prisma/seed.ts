import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('superpassword123', 10);
  const userPassword = await bcrypt.hash('password123', 10);

  // Seed Tenants
  const eliteDev = await prisma.tenant.upsert({
    where: { slug: 'elite-dev' },
    update: {},
    create: {
      name: 'Elite Developers',
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

  // Seed Superadmin
  await prisma.user.upsert({
    where: { email: 'superadmin@fortify.biz' },
    update: {
      password: hashedPassword,
    },
    create: {
      username: 'superadmin',
      email: 'superadmin@fortify.biz',
      password: hashedPassword,
      role: 'superadmin',
      isVerified: true,
    },
  });

  // Seed Admins
  await prisma.user.upsert({
    where: { email: 'admin@elitedev.com' },
    update: {
      password: userPassword,
    },
    create: {
      tenantId: eliteDev.id,
      username: 'elite_admin',
      email: 'admin@elitedev.com',
      password: userPassword,
      role: 'admin',
      isVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@skyline.com' },
    update: {
      password: userPassword,
    },
    create: {
      tenantId: skylineAgency.id,
      username: 'skyline_admin',
      email: 'admin@skyline.com',
      password: userPassword,
      role: 'admin',
      isVerified: true,
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
