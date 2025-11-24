# Activity / Lab / Assignment / Project Title

**[Optional]** If what is being submitted is an individual Lab or Assignment. Otherwise, include a brief one paragraph description about the project.

A modern, responsive full-stack portfolio website showcasing projects, skills, and developer information. The application features a React frontend with TypeScript, Express backend, and integrates external APIs for weather data. It includes dynamic project listings, searchable skills database, dark/light theme support, and a clean, professional UI built with modern web technologies.

* *Date Created*: Nov 20 2025
* *Last Modification Date*: 24 Oct 2025
* *Netlify URL*: https://chic-bienenstitch-67a326.netlify.app
* *GitLab URL*: https://git.cs.dal.ca/samad/csci-3172/-/tree/main/labs/lab6


## Authors

If what is being submitted is an individual Lab or Assignment, you may simply include your name and email address. Otherwise list the members of your group.

* Abdul Samad


## Built With

<!--- Provide a list of the frameworks used to build this application, your list should include the name of the framework used, the url where the framework is available for download and what the framework was used for, see the example below --->

* React (https://react.dev/) – Frontend framework for building the user interface and interactive components
* TypeScript (https://www.typescriptlang.org/) – Type-safe JavaScript for both frontend and backend development
* Vite (https://vitejs.dev/) – Build tool and development server with hot module replacement
* Express (https://expressjs.com/) – Node.js web framework for the backend API server
* Node.js (https://nodejs.org/) – Runtime environment for the backend server
* Tailwind CSS (https://tailwindcss.com/) – Utility-first CSS framework for styling the website
* Wouter (https://github.com/molefrog/wouter) – Lightweight routing library for React applications
* TanStack Query / React Query (https://tanstack.com/query/latest) – Data fetching and state management for server state
* Radix UI (https://www.radix-ui.com/) – Headless UI component library for accessible components
* Zod (https://zod.dev/) – TypeScript-first schema validation library for data validation
* Lucide React (https://lucide.dev/) – Icon library for React components
* Next Themes (https://github.com/pacocoursey/next-themes) – Theme provider for dark/light mode support
* OpenWeatherMap API (https://openweathermap.org/api) – External API for fetching real-time weather data



## Sources Used

If in completing your lab / assignment / project you used any interpretation of someone else's code, then provide a list of where the code was implemented, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.


### client/src/lib/utils.ts

*Lines 1 - 6*

```
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

The code above was created by adapting the code in shadcn/ui (https://ui.shadcn.com/docs/utilities) as shown below: 

The original utility function from shadcn/ui for merging Tailwind CSS classes using clsx and tailwind-merge libraries.

- How: The code from shadcn/ui was implemented by directly copying the cn utility function into our project at client/src/lib/utils.ts. This function is a standard utility used across all shadcn/ui components.
- Why: shadcn/ui's Code was used because it provides a clean way to merge conditional Tailwind CSS classes without conflicts, which is essential for all UI components in the project.
- How: shadcn/ui's Code was modified by... The code was used as-is without modifications, as it's a standard utility function.


### client/src/components/ui/button.tsx

*Lines 1 - 62*

```
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" +
  " hover-elevate active-elevate-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border",
        outline:
          " border [border-color:var(--button-outline)]  shadow-xs active:shadow-none ",
        secondary: "border bg-secondary text-secondary-foreground border border-secondary-border ",
        ghost: "border border-transparent",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 rounded-md px-3 text-xs",
        lg: "min-h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

The code above was created by adapting the code in shadcn/ui Button component (https://ui.shadcn.com/docs/components/button) as shown below: 

The original shadcn/ui button component structure using class-variance-authority for variant management and Radix UI Slot for composition.

- How: The code from shadcn/ui was implemented by copying the button component structure and adapting the styling variants to match our design system. The component uses cva (class-variance-authority) for managing different button variants and sizes.
- Why: shadcn/ui's Code was used because it provides an accessible, well-tested button component with proper TypeScript types, variant management, and Radix UI integration for composition patterns.
- How: shadcn/ui's Code was modified by adding custom elevation classes ("hover-elevate active-elevate-2") to the base button styles and adjusting the variant styles to use our custom CSS variables and border colors that match our design system.


### client/src/components/ui/card.tsx

*Lines 1 - 85*

```
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shadcn-card rounded-xl border bg-card border-card-border text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}

```

The code above was created by adapting the code in shadcn/ui Card component (https://ui.shadcn.com/docs/components/card) as shown below: 

The original shadcn/ui card component with Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter sub-components.

- How: The code from shadcn/ui was implemented by copying the card component structure directly into our project. The component uses React.forwardRef for proper ref forwarding and the cn utility for class name merging.
- Why: shadcn/ui's Code was used because it provides a clean, composable card component structure that is used throughout the project for displaying projects and other content in a consistent format.
- How: shadcn/ui's Code was modified by adding custom border styling ("border-card-border") and adjusting the base Card component to use "rounded-xl" instead of the default border radius, and adding the "shadcn-card" class for custom styling hooks.



## Artificial Intelligence Tools Used
If in completing your lab / assignment / project you used any Artificial Intelligence Tools or Plugins, then provide a list of the tools or plugins used, the prompt used, the code generated by the AI, where the code was implemented, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.

* [Name of Tool](http://www.dropwizard.io/1.0.2/docs/) - The AI Tool used
* [Name of Tool](http://www.dropwizard.io/1.0.2/docs/) - The AI Plugin used
* [Name of Tool](http://www.dropwizard.io/1.0.2/docs/) - The AI Tool used


### Prompt Used on *NAME OF AI TOOL*

```
Copy and paste the prompt used 

```

The code prompt above was used [NAME](link) to generate the code shown below: 

```
Copy and paste the entirety of the code generated by the AI Tool listed above.

```

#### File Name
*Lines ## - ##*

```
Copy and paste your code on the lines mentioned

```

- <!---How---> The code in [NAME](link) was implemented by...
- <!---Why---> [NAME](link)'s Code was used because...
- <!---How---> [NAME](link)'s Code was modified by...


### Prompt Used on *NAME OF AI TOOL*

```
Copy and paste the prompt used 

```

The code prompt above was used [NAME](link) to generate the code shown below: 

```
Copy and paste the entirety of the code generated by the AI Tool listed above.

```

#### File Name
*Lines ## - ##*

```
Copy and paste your code on the lines mentioned

```

- <!---How---> The code in [NAME](link) was implemented by...
- <!---Why---> [NAME](link)'s Code was used because...
- <!---How---> [NAME](link)'s Code was modified by...


*Repeat as needed*



## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
