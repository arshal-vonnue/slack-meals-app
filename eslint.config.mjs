import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const eslintConfig = [
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "warn",
    },
  },
  {
    name: "prettier-config",
    ...prettierConfig,
  },
];

export default eslintConfig;
