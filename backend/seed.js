import { AppDataSource } from "./data-source.js";
import { Exercise } from "./entities/Exercise.js";

async function main() {
  // Initialize the datasource
  await AppDataSource.initialize();

  const exerciseRepository = AppDataSource.getRepository(Exercise);

  // Check if exercise exists
  const existingExercise = await exerciseRepository.findOneBy({
    title: "Fibonacci Visualizer",
  });

  const exerciseData = {
    title: "Fibonacci Visualizer",
    description:
      "The Fibonacci sequence is defined using: F(N) = F(N-1) + F(N-2) if N >= 2. Return the six least significant decimal digits of F(N).",
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
  };

  if (existingExercise) {
    await exerciseRepository.update(existingExercise.id, exerciseData);
    console.log(`Updated exercise: ${exerciseData.title}`);
  } else {
    await exerciseRepository.save(exerciseData);
    console.log(`Created exercise: ${exerciseData.title}`);
  }
}

main()
  .then(() => {
    console.log("Database seeded ✅");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
