import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { username: 'user1' },
    update: {},
    create: {
      username: 'user1',
      password: 'password',
      balance: 1000,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'user2' },
    update: {},
    create: {
      username: 'user2',
      password: 'password',
      balance: 500,
    },
  });

  // const transaction1 = await prisma.transaction.upsert({
  //   where: { id: 0 },
  //   update: {},
  //   create: {
  //     from: 1,
  //     to: 2,
  //     amount: 100,
  //   },
  // });

  console.log(user1, user2);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
