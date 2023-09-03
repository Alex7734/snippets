'use client';

import React from 'react';
import { cn } from '@app/lib/utils';
import { Icons } from '@app/components/icons';

interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, type, ...props }, ref) => {
    const [visible, setVisible] = React.useState<boolean>(false);

    return (
      <div className="relative grid w-full items-center gap-1.5">
        <input
          type={visible ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-transparent py-2  pl-3 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <div
          className={
            'absolute right-2 top-2 flex w-6 cursor-pointer flex-col items-center text-gray-400'
          }
          onClick={() => setVisible(!visible)}
        >
          {visible && <Icons.eyeOff />}
          {!visible && <Icons.eye className={''} />}
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
