import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { Skill } from "@shared/schema";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card 
      className="hover-elevate transition-all hover:shadow-md"
      data-testid={`card-skill-${skill.id}`}
    >
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-base" data-testid={`text-skill-name-${skill.id}`}>
              {skill.name}
            </h3>
            <Badge variant="outline" className="text-xs" data-testid={`badge-category-${skill.category.toLowerCase()}`}>
              {skill.category}
            </Badge>
          </div>

          {skill.proficiency && (
            <div className="flex gap-1" data-testid={`proficiency-${skill.id}`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < skill.proficiency!
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
