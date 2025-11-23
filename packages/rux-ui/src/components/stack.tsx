import { RCC } from '@shirux/types/react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Children,
  cloneElement,
  type ComponentPropsWithoutRef,
  isValidElement,
  type JSX,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '../lib/classes';

const stackVariants = cva('', {
  variants: {
    inline: {
      true: 'inline-flex',
      false: 'flex',
    },
    direction: {
      column: 'flex-col',
      row: 'flex-row',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    inline: false,
    direction: 'column',
    align: 'stretch',
    justify: 'start',
    wrap: 'wrap',
  },
});

type StackProps = {
  asChild?: boolean;
  as?: keyof JSX.IntrinsicElements;
  divider?: ReactNode;
  dividerClassName?: string;
  /**
   * If true, disables default divider wrapper styles, allowing full customization via dividerClassName
   * @default false
   */
  disableDividerStyles?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'children'> &
  VariantProps<typeof stackVariants>;

const Stack: RCC<StackProps> = ({
  asChild = false,
  as,
  children,
  className,
  divider,
  dividerClassName,
  disableDividerStyles = false,
  direction = 'column',
  align,
  justify,
  inline,
  wrap,
  fullWidth,
  ...rest
}) => {
  const orientation = direction === 'row' ? 'row' : 'column';

  const createDividerNode = (key: React.Key | number) =>
    divider ? (
      <div
        aria-hidden
        className={cn(
          !disableDividerStyles && 'flex shrink-0 self-stretch',
          !disableDividerStyles &&
            (orientation === 'row'
              ? 'flex-col items-center justify-center'
              : 'w-full flex-row items-center justify-center'),
          dividerClassName
        )}
        data-stack-divider
        key={`stack-divider-${String(key)}`}
        role="presentation"
      >
        {divider}
      </div>
    ) : null;

  const applyDivider = (nodes: ReactNode[]) => {
    if (!divider || nodes.length <= 1) {
      return nodes;
    }

    const result: ReactNode[] = [];
    nodes.forEach((node, index) => {
      result.push(node);
      if (index === nodes.length - 1) {
        return;
      }
      result.push(createDividerNode(index));
    });
    return result;
  };

  const stackClasses = cn(
    stackVariants({
      direction,
      inline,
      align,
      justify,
      wrap,
      fullWidth,
      className,
    })
  );

  const normalizedChildren = Children.toArray(children);

  const canSlotChild =
    asChild &&
    normalizedChildren.length === 1 &&
    isValidElement(normalizedChildren[0]);

  if (canSlotChild) {
    const childElement = normalizedChildren[0] as ReactElement<{
      children?: ReactNode;
    }>;
    const childNodes = Children.toArray(childElement.props.children);
    const processedChildNodes = applyDivider(childNodes);
    const clonedChild = cloneElement(childElement, {
      children: processedChildNodes,
    } as Partial<typeof childElement.props>);

    return (
      <Slot data-slot="stack" className={stackClasses} {...rest}>
        {clonedChild}
      </Slot>
    );
  }

  const Comp = (as ?? 'div') as React.ElementType;
  const processedChildren = applyDivider(normalizedChildren);

  return (
    <Comp data-slot="stack" className={stackClasses} {...rest}>
      {processedChildren}
    </Comp>
  );
};

export { Stack, stackVariants };
