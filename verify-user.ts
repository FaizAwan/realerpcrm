import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@elitedev.com';
    const password = 'password123';

    console.log(`Searching for user: ${email}`);
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error('User NOT found.');
        return;
    }

    console.log('User found:', user.email);
    console.log('Stored password hash (first 10 chars):', user.password.substring(0, 10) + '...');

    const isValid = await bcrypt.compare(password, user.password);
    console.log(`Password '${password}' is valid: ${isValid}`);

    if (!isValid) {
        console.log('Login failed because password hash does not match.');
    } else {
        console.log('Credentials are correct in the database.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
