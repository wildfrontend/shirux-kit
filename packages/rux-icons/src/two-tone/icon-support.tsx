import * as React from "react";
import type { SVGProps } from "react";
// Extended props for dual-color support
export interface DualColorIconProps extends SVGProps<SVGSVGElement> {
  primaryColor?: string;
  secondaryColor?: string;
}
const SvgIconSupport = ({
  primaryColor = "currentColor",
  secondaryColor = "transparent",
  ...props
}: DualColorIconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67 63" fill="currentColor" {...props}><path fill={primaryColor} d="M29.445 6.174c14.868 0 27.016 12.005 27.016 26.807S44.362 59.79 29.445 59.79 2.478 47.735 2.478 32.933s12.099-26.76 26.967-26.76m0-2.46C13.168 3.715 0 16.782 0 32.935 0 49.084 13.168 62.15 29.445 62.15S58.89 49.085 58.89 32.933 45.722 3.715 29.445 3.715"  /><path fill={primaryColor} d="M29.444 60.943c15.51 0 28.085-12.477 28.085-27.868S44.955 5.207 29.444 5.207c-15.51 0-28.085 12.477-28.085 27.868s12.574 27.868 28.085 27.868"  /><path fill="#fff" d="M20.458 29.744a2.565 2.565 0 0 0 2.575-2.556 2.565 2.565 0 0 0-2.575-2.555 2.565 2.565 0 0 0-2.575 2.555 2.565 2.565 0 0 0 2.575 2.556M38.482 29.744a2.565 2.565 0 0 0 2.575-2.556 2.565 2.565 0 0 0-2.576-2.555 2.565 2.565 0 0 0-2.575 2.555 2.565 2.565 0 0 0 2.575 2.556M39.209 36.305c0 5.352-4.373 9.69-9.767 9.69s-9.766-4.338-9.766-9.69z" /><path fill={secondaryColor} d="M44.607.048H60.4c3.547 0 6.414 2.845 6.414 6.365s-2.867 6.364-6.414 6.364H53.45c-1.41 0-2.576.723-3.596 1.64-1.555 1.398-2.624 2.555-6.074 2.651 0 0 3.499-.627 3.742-4.34h-2.867c-3.547 0-6.414-2.844-6.414-6.364S41.11 0 44.656 0z"  /></svg>;
export default SvgIconSupport;