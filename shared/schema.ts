import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Project schema for portfolio projects
export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  languages: z.array(z.string()),
  description: z.string(),
  image: z.string().optional(),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

// Skill schema for portfolio skills
export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["Frontend", "Backend", "Tools", "Design"]),
  proficiency: z.number().min(1).max(5).optional(),
});

export type Skill = z.infer<typeof skillSchema>;

// Weather data schema
export const weatherSchema = z.object({
  city: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export type Weather = z.infer<typeof weatherSchema>;
