// scripts/seed-admin.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("AdminPassword!2025", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Super Admin",
      password,
      role: "admin"
    }
  });

  await prisma.user.create({
    data: {
      email: "editor@example.com",
      name: "Editor Master",
      password,
      role: "editor"
    }
  });

  console.log("Admin e Editor creati nel DB");
}

main().catch((e) => console.error(e)).finally(() => prisma.$disconnect());
