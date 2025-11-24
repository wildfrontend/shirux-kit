import { Typography } from '@shirux/rux-ui/components/typography';
import { cn } from '@shirux/rux-ui/lib/classes';
import type { RCC } from '@shirux/types/react';

type ComponentPreviewProps = {
  title: string;
  description?: string;
  className?: string;
};

export const ComponentPreview: RCC<ComponentPreviewProps> = ({
  title,
  description,
  children,
  className,
}) => (
  <div className="space-y-4">
    <div>
      <Typography variant="h3">{title}</Typography>
      {description && (
        <Typography className="mt-1" color="muted" variant="sm">
          {description}
        </Typography>
      )}
    </div>
    <div className="overflow-x-auto">
      <div
        className={cn(
          'bg-background flex min-w-max items-center justify-center gap-4 rounded-lg border px-8 py-6',
          className
        )}
      >
        {children}
      </div>
    </div>
  </div>
);
