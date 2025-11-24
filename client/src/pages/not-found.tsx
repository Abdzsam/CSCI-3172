import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="font-heading font-bold text-9xl text-muted-foreground/20" data-testid="text-404">
          404
        </h1>
        <h2 className="font-heading font-bold text-3xl" data-testid="text-page-not-found">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg" data-testid="text-404-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button size="lg" className="gap-2" data-testid="button-return-home" asChild>
          <Link href="/">
            <Home className="h-5 w-5" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
