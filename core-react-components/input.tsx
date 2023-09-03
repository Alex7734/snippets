'use client';

import * as React from 'react';

import { cn } from '@app/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean; // Add the disabled prop
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <div className="grid w-full items-center gap-1.5">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
