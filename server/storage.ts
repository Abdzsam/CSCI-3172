import { type User, type InsertUser, type Project } from "@shared/schema";
import { randomUUID } from "crypto";
import { readFile } from "fs/promises";
import { join } from "path";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    try {
      const projectsPath = join(process.cwd(), "server", "data", "projects.json");
      const data = await readFile(projectsPath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading projects:", error);
      return [];
    }
  }
}

export const storage = new MemStorage();
