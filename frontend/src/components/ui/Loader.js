"use client";

import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      icon: Icon,
      error,
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">

        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>
        )}

        <div className="relative">

          {Icon && (
            <Icon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}

          <input
            ref={ref}
            className={`
              w-full
              rounded-lg
              border
              px-3
              py-2
              transition
              outline-none
              ${Icon ? "pl-10" : ""}
              ${
                error
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
              ${className}
            `}
            {...props}
          />

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