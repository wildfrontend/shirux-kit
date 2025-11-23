import * as React from "react";
import type { SVGProps } from "react";
// Extended props for dual-color support
export interface DualColorIconProps extends SVGProps<SVGSVGElement> {
  primaryColor?: string;
  secondaryColor?: string;
}
const SvgIconMessage = ({
  primaryColor = "currentColor",
  secondaryColor = "transparent",
  ...props
}: DualColorIconProps) => <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48" {...props}><path fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={2.5} d="M25.062 1.472c7.215.232 14.126 3.484 18.684 11.148 4.632 7.82 3.493 17.652-2.887 24.31-7.063 7.432-15.57 8.903-24.911 5.961-.835-.232-1.519-.232-2.354.155-3.418 1.858-7.14 2.864-10.937 3.484-.38 0-.836-.078-1.063-.387-.152-.155 0-.775.152-1.084 1.974-2.71 2.658-5.884 3.037-9.136.076-.774 0-1.858-.38-2.477-5.923-9.6-2.582-21.832 6.153-27.794 4.1-2.787 8.506-4.258 14.506-4.18Z" /><path fill="currentColor" d="M16.176 26.632c1.426 0 2.582-1.179 2.582-2.633s-1.156-2.632-2.582-2.632-2.582 1.179-2.582 2.632 1.156 2.633 2.582 2.633M24 26.632c1.426 0 2.582-1.179 2.582-2.633S25.427 21.367 24 21.367 21.418 22.546 21.418 24s1.156 2.633 2.582 2.633M31.82 26.632c1.427 0 2.583-1.179 2.583-2.633s-1.156-2.632-2.582-2.632c-1.427 0-2.583 1.179-2.583 2.632s1.156 2.633 2.583 2.633" /></svg>;
export default SvgIconMessage;