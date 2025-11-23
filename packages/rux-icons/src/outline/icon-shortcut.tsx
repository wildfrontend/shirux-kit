import * as React from "react";
import type { SVGProps } from "react";
// Extended props for dual-color support
export interface DualColorIconProps extends SVGProps<SVGSVGElement> {
  primaryColor?: string;
  secondaryColor?: string;
}
const SvgIconShortcut = ({
  primaryColor = "currentColor",
  secondaryColor = "transparent",
  ...props
}: DualColorIconProps) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 59" fill="currentColor" {...props}><path fill="transparent" stroke="currentColor" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={2} d="M29.663 57.98c15.83 0 28.663-12.756 28.663-28.49C58.326 13.755 45.493 1 29.663 1S1 13.755 1 29.49s12.833 28.49 28.663 28.49Z" /><path fill="currentColor" d="M18.977 21.682A3.11 3.11 0 0 0 22.1 18.58a3.11 3.11 0 0 0-3.122-3.102 3.11 3.11 0 0 0-3.122 3.102 3.11 3.11 0 0 0 3.122 3.103M29.665 21.682a3.11 3.11 0 0 0 3.121-3.103 3.11 3.11 0 0 0-3.121-3.102 3.11 3.11 0 0 0-3.122 3.102 3.11 3.11 0 0 0 3.122 3.103M40.356 21.682a3.11 3.11 0 0 0 3.122-3.103 3.11 3.11 0 0 0-3.122-3.102 3.11 3.11 0 0 0-3.122 3.102 3.11 3.11 0 0 0 3.122 3.103M18.977 32.167a3.11 3.11 0 0 0 3.122-3.103 3.11 3.11 0 0 0-3.122-3.103 3.11 3.11 0 0 0-3.122 3.103 3.11 3.11 0 0 0 3.122 3.103M29.665 32.167a3.11 3.11 0 0 0 3.121-3.103 3.11 3.11 0 0 0-3.121-3.103 3.11 3.11 0 0 0-3.122 3.103 3.11 3.11 0 0 0 3.122 3.103M40.356 32.167a3.11 3.11 0 0 0 3.122-3.103 3.11 3.11 0 0 0-3.122-3.103 3.11 3.11 0 0 0-3.122 3.103 3.11 3.11 0 0 0 3.122 3.103M18.977 43.495a3.11 3.11 0 0 0 3.122-3.103 3.11 3.11 0 0 0-3.122-3.103 3.11 3.11 0 0 0-3.122 3.103 3.11 3.11 0 0 0 3.122 3.103M29.665 43.495a3.11 3.11 0 0 0 3.121-3.103 3.11 3.11 0 0 0-3.121-3.103 3.11 3.11 0 0 0-3.122 3.103 3.11 3.11 0 0 0 3.122 3.103M40.356 43.495a3.11 3.11 0 0 0 3.122-3.103 3.11 3.11 0 0 0-3.122-3.103 3.11 3.11 0 0 0-3.122 3.103 3.11 3.11 0 0 0 3.122 3.103" /></svg>;
export default SvgIconShortcut;