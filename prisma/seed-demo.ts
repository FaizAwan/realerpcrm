import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding demo user...");

  // Create demo tenant
  let tenant = await db.tenant.findUnique({
    where: { slug: "realerpcrm" }
  });

  if (!tenant) {
    tenant = await db.tenant.create({
      data: {
        name: "RealERPcrm",
        slug: "realerpcrm",
        plan: "enterprise"
      }
    });
    console.log("Created tenant:", tenant.name);
  }

  // Create demo user
  const existingUser = await db.user.findUnique({
    where: { email: "admin@realerpcrm.com" }
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    const user = await db.user.create({
      data: {
        username: "Admin",
        email: "admin@realerpcrm.com",
        password: hashedPassword,
        tenantId: tenant.id,
        role: "superadmin",
        isVerified: true
      }
    });
    console.log("Created user:", user.email);
  } else {
    console.log("User already exists:", existingUser.email);
  }

  console.log("Seeding completed!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
