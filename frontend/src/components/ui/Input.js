"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(
  ({ label, error, type = "text", className = "", ...props }, ref) => {

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-1">

        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div className="relative">

          <input
            ref={ref}
            type={
              isPassword
                ? (showPassword ? "text" : "password")
                : type
            }
            {...props}
            className={`
              w-full
              rounded-lg
              border
              px-4
              py-3
              pr-12
              outline-none
              transition
              ${
                error
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              }
              ${className}
            `}
          />

          {isPassword && (

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          )}

        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;