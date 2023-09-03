import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@app/lib/utils';

const alertVariants = cva('relative w-full rounded-lg border py-4 px-4 [&>svg]:text-foreground', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      success: 'bg-accent/20 border-accent [&>svg]:text-black text-black',
      destructive:
        'text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-2 text-base font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-sm font-normal', className)} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
