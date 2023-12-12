import * as React from "react";

import { cn } from "@/lib/utils";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col justify-between rounded-card bg-card text-card-foreground",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon?: MaterialSymbolProps["icon"] }
>(({ className, icon, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-start justify-between p-4", className)}
    {...props}
  >
    <div className="flex flex-col space-y-1">{children}</div>
    {icon && <CardIcon icon={icon} />}
  </div>
));
CardHeader.displayName = "CardHeader";

const CardIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLDivElement> & { icon: MaterialSymbolProps["icon"] }
>(({ className, icon, ...props }, ref) => (
  <MaterialSymbol
    ref={ref}
    icon={icon}
    size={24}
    className={className}
    {...props}
  />
));
CardIcon.displayName = "CardIcon";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "flex items-center space-x-4 text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    noPadding?: boolean;
    overflowHidden?: boolean;
  }
>(({ className, noPadding = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(noPadding ? "p-0" : "p-4", "pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between space-x-1 bg-secondary p-4 pt-3",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardHome = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex justify-between rounded-card bg-card text-card-foreground",
      className,
    )}
    {...props}
  />
));
CardHome.displayName = "CardHome";

const CardHomeHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon?: MaterialSymbolProps["icon"] }
>(({ className, icon, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-between space-x-4 p-4 ", className)}
    {...props}
  >
    <div className="flex flex-col space-y-1">{children}</div>
    {icon && <CardIcon icon={icon} />}
  </div>
));
CardHomeHeader.displayName = "CardHomeHeader";

const DevicesCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between self-end rounded-card bg-secondary pr-3 font-bold text-card-foreground",
      className,
    )}
    {...props}
  />
));
DevicesCard.displayName = "DevicesCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardHome,
  CardHomeHeader,
  DevicesCard,
};
