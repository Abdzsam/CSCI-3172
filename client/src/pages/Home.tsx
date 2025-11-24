import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/WeatherWidget";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/professional_developer_workspace_hero.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Hero Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Developer workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Weather Widget - Positioned absolutely */}
        <div className="absolute top-8 right-8 z-20 hidden md:block">
          <WeatherWidget />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
          <div className="max-w-3xl">
            <h1 
              className="font-heading font-bold text-5xl md:text-hero leading-tight mb-6"
              data-testid="text-hero-title"
            >
              Abdul Samad
            </h1>
            <p 
              className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed"
              data-testid="text-hero-subtitle"
            >
              Full-Stack Developer creating innovative web solutions with modern technologies. 
              Passionate about building exceptional user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                data-testid="button-view-projects"
                asChild
              >
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                data-testid="button-view-skills"
                asChild
              >
                <Link href="/skills">
                  My Skills
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Weather Widget */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 md:hidden">
          <WeatherWidget />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading font-bold text-section mb-6" data-testid="text-about-title">
              About Me
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-description">
              I'm Abdul Samad, a passionate full-stack developer with expertise in modern web technologies. 
              I love building scalable applications that solve real-world problems and deliver 
              exceptional user experiences. With a strong foundation in both frontend and backend 
              development, I bring ideas to life through clean, efficient code.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
