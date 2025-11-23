import { RC } from '@shirux/types/react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva } from 'class-variance-authority';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classes';

const separatorVariants = cva('bg-border shrink-0', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    size: {
      '1': 'data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px',
      '2': 'data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5',
      '3': 'data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1',
      '4': 'data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: '1',
  },
});

type SeparatorProps = {
  size?:
    | '1'
    | '2'
    | '3'
    | '4'
    | number
    | `${number}${'px' | 'rem' | 'em' | '%'}`;
  orientation?: 'horizontal' | 'vertical';
} & Omit<
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  'orientation' | 'size'
>;

const Separator: RC<SeparatorProps> = ({
  className,
  orientation = 'horizontal',
  size = '1',
  decorative = true,
  style,
  ...props
}) => {
  // 判斷是否為預設的 size variant
  const isPresetSize = ['1', '2', '3', '4'].includes(size as string);

  // 計算自訂 size 的 inline style
  const customSizeStyle =
    !isPresetSize && size
      ? {
          [orientation === 'vertical' ? 'width' : 'height']:
            typeof size === 'number' ? `${size}px` : size,
        }
      : undefined;

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorVariants({
          orientation,
          size: isPresetSize ? (size as '1' | '2' | '3' | '4') : '1',
        }),
        // 當使用自訂 size 時，移除預設的 h-px/w-px
        !isPresetSize &&
          (orientation === 'vertical'
            ? 'w-auto data-[orientation=vertical]:w-auto'
            : 'h-auto data-[orientation=horizontal]:h-auto'),
        className
      )}
      style={{ ...customSizeStyle, ...style }}
      {...props}
    />
  );
};

export { Separator };
