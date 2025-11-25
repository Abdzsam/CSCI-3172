import type { Context, Config } from "@netlify/functions";

interface Project {
  id: string;
  name: string;
  author: string;
  languages: string[];
  description: string;
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
}

// Static projects data (embedded since we can't use fs in serverless)
const projects: Project[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    author: "Abdul Samad",
    languages: ["React", "Node.js", "PostgreSQL", "Stripe"],
    description: "A full-stack e-commerce platform with payment integration, user authentication, and real-time inventory management. Features include shopping cart, product search, and admin dashboard.",
    githubUrl: "https://github.com",
    demoUrl: "https://example.com"
  },
  {
    id: "2",
    name: "Task Management App",
    author: "Abdul Samad",
    languages: ["TypeScript", "React", "Express", "MongoDB"],
    description: "Collaborative task management application with drag-and-drop interface, real-time updates, and team collaboration features. Supports custom workflows and task assignments.",
    githubUrl: "https://github.com"
  },
  {
    id: "3",
    name: "Weather Dashboard",
    author: "Abdul Samad",
    languages: ["Vue.js", "Python", "FastAPI"],
    description: "Interactive weather dashboard displaying real-time weather data, forecasts, and historical trends. Includes interactive maps and customizable widgets.",
    demoUrl: "https://example.com"
  },
  {
    id: "4",
    name: "Social Media Analytics",
    author: "Abdul Samad",
    languages: ["React", "GraphQL", "Node.js", "D3.js"],
    description: "Analytics platform for social media metrics with beautiful data visualizations, sentiment analysis, and engagement tracking across multiple platforms.",
    githubUrl: "https://github.com",
    demoUrl: "https://example.com"
  },
  {
    id: "5",
    name: "Recipe Finder",
    author: "Abdul Samad",
    languages: ["Next.js", "TypeScript", "Tailwind CSS"],
    description: "Recipe discovery app with ingredient-based search, nutritional information, and meal planning features. Includes user-generated content and ratings.",
    githubUrl: "https://github.com"
  },
  {
    id: "6",
    name: "Portfolio Builder",
    author: "Abdul Samad",
    languages: ["React", "Firebase", "Material-UI"],
    description: "Drag-and-drop portfolio builder allowing users to create stunning portfolio websites without coding. Features templates, custom domains, and analytics.",
    demoUrl: "https://example.com"
  }
];

export default async (req: Request, context: Context): Promise<Response> => {
  try {
    return new Response(JSON.stringify(projects), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch projects",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config: Config = {
  path: "/api/projects",
};
