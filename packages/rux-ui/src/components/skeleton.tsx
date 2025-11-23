import { RC } from '@shirux/types/react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';

type SkeletonProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

const Skeleton: RC<SkeletonProps> = ({ className, ...props }) => (
  <div
    data-slot="skeleton"
    className={cn('bg-muted animate-pulse rounded-md', className)}
    {...props}
  />
);

export { Skeleton };
