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

  const jumpExerciseData = {
    title: "Jump Visualizer",
    description: `A non-empty array A consisting of N integers is given. Each element of the array can be treated as a relative pointer to another element in the array: if A[K] = M then element A[K] points to element A[K+M].

The array defines a sequence of jumps of a pawn as follows:

- initially, the pawn is located at element A[0]
- on each jump the pawn moves from its current element to the destination element pointed to by the current element; i.e if the pawn stands on element A[K] then it jumps to the element pointed to by A[K];
- the pawn may jump forever or may jump out of the array.

For example, consider the following array A.

A[0] = 2  
A[1] = 3  
A[2] = -1  
A[3] = 1  
A[4] = 3  

This array defines the following sequence of jumps of the pawn:
- initially the pawn is located at element A[0]
- on the first jump the pawn moves from A[0] to A[2] because 0 + A[0] = 2
- on the second jump, the pawn moves from A[2] to A[1] because 2 + A[2] = 1
- on the third jump, the pawn moves from A[1] to A[4] because 1 + A[1] = 4
- on the fourth jump, the pawn jumps out of the array.

write a function:

function solution(A);

that, given a non-empty array A consisting of N integers, returns the number of jumps after which the pawn will be out of the array. The function should return -1 if the pawn will never jump out of the array.

For example, for the array A given above, the function should return 4, as explained above. Given array A such that:

A[0] = 1  
A[1] = 1  
A[2] = -1  
A[3] = 1  

the function should return -1.

write an efficent algorithm for the following assumptions:
- N is an integer within the range [1...100,000]
- each element of array A is an integer withing range [-1,000,000..1,000,000].`,
    algorithm: `function solution(A) {
  const N = A.length;
  let visited = new Array(N).fill(false);
  let currentIndex = 0;
  let jumps = 0;
  while (currentIndex >= 0 && currentIndex < N) {
    if (visited[currentIndex]) return -1;
    visited[currentIndex] = true;
    let nextIndex = currentIndex + A[currentIndex];
    currentIndex = nextIndex;
    jumps++;
  }
  return jumps;
}`,
  };

  const existingJumpExercise = await exerciseRepository.findOneBy({
    title: "Jump Visualizer",
  });

  if (existingJumpExercise) {
    await exerciseRepository.update(existingJumpExercise.id, jumpExerciseData);
    console.log(`Updated exercise: ${jumpExerciseData.title}`);
  } else {
    await exerciseRepository.save(jumpExerciseData);
    console.log(`Created exercise: ${jumpExerciseData.title}`);
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
