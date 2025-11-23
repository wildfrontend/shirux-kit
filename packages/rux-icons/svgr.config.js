/** @type {import('@svgr/core').Config} */
export default {
  // TypeScript output
  typescript: true,

  // Put props at the end of the component
  expandProps: "end",

  // Dimensions - let the component control via props or CSS
  dimensions: false,

  // Disable prettier (we'll use our own)
  prettier: false,

  // Custom filename case
  filenameCase: "kebab",

  // Enable SVGO optimization
  svgo: true,
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false, // keep viewBox for scaling
            removeUnknownsAndDefaults: {
              keepDataAttrs: true, // IMPORTANT: keep data-* attributes for dual-color handling
            },
          },
        },
      },
      {
        name: "removeViewBox",
        active: false, // explicitly keep viewBox
      },
      {
        name: "removeDimensions",
        active: true, // remove fixed width/height
      },
    ],
  },

  // Replace SVG props for better customization
  replaceAttrValues: {
    "#E17663": "currentColor", // Replace hardcoded colors with currentColor
    "#000": "currentColor",
    "#000000": "currentColor",
  },

  // SVG props will be added via template to preserve viewBox dimensions
  svgProps: {
    fill: "currentColor",
  },

  // Template for generating components - dimensions will come from viewBox
  template: (variables, { tpl }) => {
    return tpl`
${variables.imports};

// Extended props for dual-color support
export interface DualColorIconProps extends SVGProps<SVGSVGElement> {
  primaryColor?: string;
  secondaryColor?: string;
}

const ${variables.componentName} = ({
  primaryColor = "currentColor",
  secondaryColor = "transparent",
  ...props
}: DualColorIconProps) => (
  ${variables.jsx}
);

${variables.exports};
`;
  },
};
