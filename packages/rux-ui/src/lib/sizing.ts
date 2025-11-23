/**
 * Fluid sizing configuration for responsive design (JIT-compatible)
 * Tailwind v3/v4 — uses native arbitrary value syntax like text-[clamp(...)]
 */

export const fontSizes = {
  // Component sizes
  'button-sm': 'text-[clamp(0.813rem,0.25vw+0.7rem,0.875rem)]', // 13px -> 14px
  base: 'text-[clamp(0.875rem,0.3vw+0.75rem,0.938rem)]', // 14px -> 15px
  'button-lg': 'text-[clamp(0.938rem,0.35vw+0.8rem,1rem)]', // 15px -> 16px

  // Typography sizes
  xs: 'text-[clamp(0.75rem,0.3vw+0.625rem,0.875rem)]', // 12px -> 14px
  sm: 'text-[clamp(0.875rem,0.4vw+0.688rem,1rem)]', // 14px -> 16px
  'small-muted': 'text-[clamp(0.813rem,0.25vw+0.7rem,0.875rem)]', // 13px -> 14px
  md: 'text-[clamp(1rem,0.5vw+0.75rem,1.125rem)]', // 16px -> 18px
  large: 'text-[clamp(1rem,0.5vw+0.813rem,1.125rem)]', // 16px -> 18px
  lead: 'text-[clamp(1.125rem,0.6vw+0.875rem,1.25rem)]', // 18px -> 20px
  lg: 'text-[clamp(1.25rem,0.8vw+0.875rem,1.5rem)]', // 20px -> 24px
  h4: 'text-[clamp(1.125rem,0.6vw+0.875rem,1.25rem)]', // 18px -> 20px
  h3: 'text-[clamp(1.5rem,0.8vw+1.125rem,1.875rem)]', // 24px -> 30px
  h2: 'text-[clamp(1.875rem,1.2vw+1.25rem,2.25rem)]', // 30px -> 36px
  xl: 'text-[clamp(1.75rem,1.2vw+1.125rem,2.25rem)]', // 28px -> 36px
  h1: 'text-[clamp(2.25rem,1.5vw+1.5rem,3rem)]', // 36px -> 48px
} as const;

/**
 * Height presets for components
 */
export const heights = {
  sm: 'h-[clamp(1.75rem,0.8vw+1.3rem,2rem)]', // 28px -> 32px
  base: 'h-[clamp(2rem,1vw+1.5rem,2.25rem)]', // 32px -> 36px
  lg: 'h-[clamp(2.25rem,1.2vw+1.7rem,2.5rem)]', // 36px -> 40px
  'file-input': 'h-[clamp(1.5rem,0.5vw+1.25rem,1.75rem)]', // 24px -> 28px
} as const;

/**
 * Width presets (square elements like icons)
 */
export const widths = {
  icon: 'w-[clamp(2rem,1vw+1.5rem,2.25rem)]', // 32px -> 36px
} as const;

/**
 * Spacing presets for padding/margin
 */
export const spacing = {
  'button-sm-icon': 'px-[clamp(0.5rem,0.3vw+0.4rem,0.625rem)]', // 8px -> 10px
  sm: 'px-[clamp(0.625rem,0.4vw+0.5rem,0.75rem)]', // 10px -> 12px
  base: 'px-[clamp(0.75rem,0.5vw+0.5rem,1rem)]', // 12px -> 16px
  'button-default-icon': 'px-[clamp(0.625rem,0.4vw+0.5rem,0.75rem)]', // 10px -> 12px
  'button-lg-icon': 'px-[clamp(0.75rem,0.6vw+0.5rem,1rem)]', // 12px -> 16px
  lg: 'px-[clamp(1rem,0.8vw+0.7rem,1.5rem)]', // 16px -> 24px
} as const;

/**
 * SVG icon sizes (width + height shorthand)
 */
export const iconSizes = {
  'button-sm': 'size-[clamp(0.75rem,0.25vw+0.65rem,0.875rem)]', // 12px -> 14px
  base: 'size-[clamp(0.875rem,0.3vw+0.75rem,1rem)]', // 14px -> 16px
  'button-lg': 'size-[clamp(1rem,0.35vw+0.85rem,1.125rem)]', // 16px -> 18px
  icon: 'size-[clamp(1rem,0.4vw+0.85rem,1.125rem)]', // 16px -> 18px
} as const;
