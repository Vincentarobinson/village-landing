import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-pine",
        butter: "bg-butter text-[#8A6510]",
        coral: "bg-coral text-white",
        outline: "border-[1.5px] border-input bg-white text-ink",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
