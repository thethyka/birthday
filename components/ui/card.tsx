import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

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
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

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
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

interface PersonCardProps {
  name: string;
  message?: string;
  photoUrl?: string;
}

interface PersonCardProps {
  name: string;
  message?: string;
  photoUrl?: string;
}

const PersonCard: React.FC<PersonCardProps> = ({ name, photoUrl, message }) => {
  return (
    // Height is capped against the viewport rather than fixed: the old 36rem
    // was taller than a phone screen, which pushed the carousel arrows off.
    <div className="w-[31rem] max-w-full h-[min(36rem,calc(100dvh-13rem))] panel overflow-hidden p-5 sm:p-7 flex flex-col">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gold">
        {name}
      </h2>

      {photoUrl && (
        <img
          src={photoUrl}
          alt={name}
          loading="lazy"
          className="w-36 h-36 sm:w-52 sm:h-52 object-cover rounded-full mx-auto mb-4 ring-2 ring-gold/30 shrink-0"
        />
      )}

      {message && (
        <div className="flex-1 overflow-y-auto text-cream/85 text-[15px] sm:text-lg leading-relaxed pr-1 whitespace-pre-line">
          {message}
        </div>
      )}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  PersonCard,
};
