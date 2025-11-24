import { useQuery } from "@tanstack/react-query";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Project } from "@shared/schema";

export default function Projects() {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 
            className="font-heading font-bold text-section md:text-5xl mb-4"
            data-testid="text-projects-title"
          >
            My Projects
          </h1>
          <p 
            className="text-lg text-muted-foreground max-w-2xl"
            data-testid="text-projects-subtitle"
          >
            A collection of projects showcasing my skills and creativity in web development.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to load projects. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && projects && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && projects && projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No projects available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
