import { RC } from '@shirux/types/react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';
import { ComponentPropsWithoutRef, useContext } from 'react';

import { cn } from '../lib/classes';

const InputOTP: RC<ComponentPropsWithoutRef<typeof OTPInput>> = ({
  className,
  containerClassName,
  ...props
}) => (
  <OTPInput
    containerClassName={cn(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
);

const InputOTPGroup: RC<ComponentPropsWithoutRef<'div'>> = ({
  className,
  ...props
}) => <div className={cn('flex items-center gap-2', className)} {...props} />;

const InputOTPSlot: RC<ComponentPropsWithoutRef<'div'> & { index: number }> = ({
  index,
  className,
  ...props
}) => {
  const inputOTPContext = useContext(OTPInputContext);
  const slot = inputOTPContext.slots[index];

  if (!slot) return null;

  const { char, hasFakeCaret, isActive } = slot;

  return (
    <div
      data-active={isActive}
      className={cn(
        'border-primary relative flex size-12 items-center justify-center border bg-transparent text-base transition-all',
        'rounded-md',
        'shadow-xs',
        isActive && 'border-primary ring-primary/50 z-10 ring-[3px]',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
};

const InputOTPSeparator: RC<ComponentPropsWithoutRef<'div'>> = ({
  ...props
}) => (
  <div role="separator" {...props}>
    <Dot />
  </div>
);

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
