import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkillCard } from "@/components/SkillCard";
import { Search } from "lucide-react";
import type { Skill } from "@shared/schema";

const SKILLS: Skill[] = [
  // Frontend Skills
  { id: "1", name: "React", category: "Frontend", proficiency: 5 },
  { id: "2", name: "TypeScript", category: "Frontend", proficiency: 5 },
  { id: "3", name: "JavaScript", category: "Frontend", proficiency: 5 },
  { id: "4", name: "HTML5", category: "Frontend", proficiency: 5 },
  { id: "5", name: "CSS3", category: "Frontend", proficiency: 5 },
  { id: "6", name: "Tailwind CSS", category: "Frontend", proficiency: 4 },
  { id: "7", name: "Vue.js", category: "Frontend", proficiency: 3 },
  { id: "8", name: "Next.js", category: "Frontend", proficiency: 4 },
  
  // Backend Skills
  { id: "9", name: "Node.js", category: "Backend", proficiency: 5 },
  { id: "10", name: "Express", category: "Backend", proficiency: 5 },
  { id: "11", name: "PostgreSQL", category: "Backend", proficiency: 4 },
  { id: "12", name: "MongoDB", category: "Backend", proficiency: 4 },
  { id: "13", name: "REST APIs", category: "Backend", proficiency: 5 },
  { id: "14", name: "GraphQL", category: "Backend", proficiency: 3 },
  { id: "15", name: "Python", category: "Backend", proficiency: 4 },
  
  // Tools
  { id: "16", name: "Git", category: "Tools", proficiency: 5 },
  { id: "17", name: "GitHub", category: "Tools", proficiency: 5 },
  { id: "18", name: "VS Code", category: "Tools", proficiency: 5 },
  { id: "19", name: "Docker", category: "Tools", proficiency: 3 },
  { id: "20", name: "Jest", category: "Tools", proficiency: 4 },
  { id: "21", name: "Webpack", category: "Tools", proficiency: 3 },
  { id: "22", name: "Vite", category: "Tools", proficiency: 4 },
  
  // Design
  { id: "23", name: "Figma", category: "Design", proficiency: 4 },
  { id: "24", name: "UI/UX Design", category: "Design", proficiency: 4 },
  { id: "25", name: "Responsive Design", category: "Design", proficiency: 5 },
];

const CATEGORIES: Array<Skill["category"]> = ["Frontend", "Backend", "Tools", "Design"];

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<Skill["category"]>>(new Set());

  const toggleCategory = (category: Skill["category"]) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.size === 0 || selectedCategories.has(skill.category);
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 
            className="font-heading font-bold text-section md:text-5xl mb-4"
            data-testid="text-skills-title"
          >
            Skills & Expertise
          </h1>
          <p 
            className="text-lg text-muted-foreground max-w-2xl"
            data-testid="text-skills-subtitle"
          >
            Technologies and tools I work with to build amazing web applications.
          </p>
        </div>

        {/* Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-skills"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategories.has(category) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category)}
                className="toggle-elevate"
                data-testid={`button-filter-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground" data-testid="text-results-count">
            Showing {filteredSkills.length} of {SKILLS.length} skills
          </p>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg" data-testid="text-no-results">
              No skills found matching your filters. Try adjusting your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
