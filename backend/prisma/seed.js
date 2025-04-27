import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.exercise.create({
    data: {
      title: 'Fibonacci Visualizer',
      description: 'The Fibonacci sequence is defined using: F(N) = F(N-1) + F(N-2) if N >= 2. Return the six least significant decimal digits of F(N).',
      algorithm: `function fibonacci(N) {
  const MOD = 1000000;
  if (N === 0) return 0;
  if (N === 1) return 1;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= N; i++) {
    let next = (prev + curr) % MOD;
    prev = curr;
    curr = next;
  }

  return curr;
}`,
    },
  });
}

main()
  .then(() => {
    console.log('Database seeded ✅');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
