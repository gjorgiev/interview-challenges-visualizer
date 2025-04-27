import "reflect-metadata";
import { DataSource } from "typeorm";
import { Exercise } from "./entities/Exercise.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "type-orm",
  password: process.env.DB_PASSWORD || "type-orm",
  database: process.env.DB_NAME || "type-orm",
  synchronize: process.env.NODE_ENV !== "production", // Automatically create database tables in development
  logging: process.env.NODE_ENV !== "production",
  entities: [Exercise],
  migrations: ["./migrations/*.js"],
});
