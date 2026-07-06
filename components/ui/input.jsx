import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-12 w-full rounded-2xl border-[1.5px] border-input bg-white px-4 py-2 text-[15px] font-semibold text-ink placeholder:text-sub/70 focus-visible:outline-none focus-visible:border-pine disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
