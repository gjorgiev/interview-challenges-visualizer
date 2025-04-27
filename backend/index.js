import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source.js";
import { Exercise } from "./entities/Exercise.js";

const app = express();

app.use(cors());
app.use(express.json());

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.get("/api/exercises/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const exerciseRepository = AppDataSource.getRepository(Exercise);
    const exercise = await exerciseRepository.findOneBy({ id: parseInt(id) });

    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }

    res.json(exercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
