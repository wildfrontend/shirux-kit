import * as React from "react";
import type { SVGProps } from "react";
// Extended props for dual-color support
export interface DualColorIconProps extends SVGProps<SVGSVGElement> {
  primaryColor?: string;
  secondaryColor?: string;
}
const SvgIconBookmarks = ({
  primaryColor = "currentColor",
  secondaryColor = "transparent",
  ...props
}: DualColorIconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" {...props}><path d="M35.85 3.86c1.03-.18 2.07-.3 3.12-.34 140.34-.06 280.69.09 421.03-.05 5.37.15 10.82-.57 16.14.36.49 17.37-.03 34.79.14 52.17 0 146.69.03 293.37-.05 440.05-.02 2.65-.35 5.28-.56 7.93-2.24-.21-4.56-.2-6.64-1.12-28.76-14.04-57.92-27.24-86.66-41.32-10.46-5.43-21.54-9.57-32.03-14.93-7.26-3.86-14.94-6.87-22.22-10.69-16.75-7.55-33.09-15.96-49.88-23.42-6.58-2.89-12.88-6.36-19.43-9.3-2.57-1.29-5.63-.99-8.14.3-4.74 2.33-9.66 4.3-14.22 6.99-23.86 11.62-47.77 23.09-71.8 34.34-17.2 8.5-34.58 16.63-51.9 24.89-6.07 3.36-12.42 6.17-18.67 9.17-7.76 4.2-16.12 7.16-23.89 11.35-8.65 4.65-17.64 8.61-26.62 12.57-2.53 1.19-5.32 1.75-8.11 1.37.38-17.72.02-35.46.14-53.18.04-145.33-.2-290.67.01-436 .04-3.71-.26-7.45.24-11.14" /></svg>;
export default SvgIconBookmarks;