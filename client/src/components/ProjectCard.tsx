import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card 
      className="overflow-hidden hover-elevate transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col"
      data-testid={`card-project-${project.id}`}
    >
      {project.image && (
        <div className="aspect-video w-full bg-muted overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
            data-testid={`img-project-${project.id}`}
          />
        </div>
      )}
      
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="font-heading text-xl" data-testid={`text-project-name-${project.id}`}>
          {project.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground" data-testid={`text-project-author-${project.id}`}>
          by {project.author}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {project.languages.map((lang) => (
            <Badge 
              key={lang} 
              variant="secondary" 
              className="text-xs"
              data-testid={`badge-language-${lang.toLowerCase()}`}
            >
              {lang}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1" data-testid={`text-project-description-${project.id}`}>
          {project.description}
        </p>

        {(project.githubUrl || project.demoUrl) && (
          <div className="flex gap-2 pt-2">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid={`button-github-${project.id}`}
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid={`button-demo-${project.id}`}
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <div className="aspect-video w-full bg-muted animate-pulse-subtle" />
      <CardHeader className="space-y-2 pb-4">
        <div className="h-6 bg-muted rounded animate-pulse-subtle w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse-subtle w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded animate-pulse-subtle w-16" />
          <div className="h-6 bg-muted rounded animate-pulse-subtle w-20" />
          <div className="h-6 bg-muted rounded animate-pulse-subtle w-14" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse-subtle w-full" />
          <div className="h-4 bg-muted rounded animate-pulse-subtle w-5/6" />
          <div className="h-4 bg-muted rounded animate-pulse-subtle w-4/6" />
        </div>
      </CardContent>
    </Card>
  );
}
