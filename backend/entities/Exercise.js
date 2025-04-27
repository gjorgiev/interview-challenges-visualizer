// backend/entities/Exercise.js
import { EntitySchema } from "typeorm";

// Using EntitySchema instead of decorators to avoid TS/decorator issues
export const Exercise = new EntitySchema({
  name: "Exercise",
  tableName: "exercise",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      unique: true,
    },
    description: {
      type: "text",
    },
    algorithm: {
      type: "text",
    },
  },
});
