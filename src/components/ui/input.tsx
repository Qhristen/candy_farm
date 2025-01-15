
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    //Function to toggle showPassword
    const toggleShowPassword = () => {
      setShowPassword((showPassword) => !showPassword);
    };

    const showPasswordIcon =
      type === "password" ? (
        <div onClick={toggleShowPassword} className="absolute right-5 top-3.5 z-10">
          <span className="cursor-pointer"> {showPassword ? <EyeIcon /> : <EyeIcon />}</span>
        </div>
      ) : null;

    const inputType =
      type !== "password" ? type : showPassword ? "text" : "password";

    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            "flex justify-content-between h-10 w-full z-0 rounded-full border border-gray-900 bg-transparent p-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {showPasswordIcon}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
