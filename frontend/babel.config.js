module.exports = {
  presets: [
    [
      "@babel/preset-env", // Transpile modern JavaScript (ES6+)
      {
        targets: {
          browsers: [">0.2%", "not dead", "not op_mini all"], // Target a wide range of browsers
        },
      },
    ],
    "@babel/preset-react", // Enable JSX and React transformations
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Optimize helper code and avoid duplication
    "@babel/plugin-syntax-dynamic-import", // Enable dynamic imports
    "@babel/plugin-proposal-class-properties", // Enable class properties
    "@babel/plugin-proposal-private-methods", // Enable private methods
    "@babel/plugin-proposal-private-property-in-object", // Enable private properties in objects
  ],
};
