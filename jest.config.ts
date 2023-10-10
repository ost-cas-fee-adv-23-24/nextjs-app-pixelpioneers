import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  testMatch: ["**/tests/unit/**/*.ts?(x)"],
  verbose: true,
  preset: "jest-playwright-preset",
};

export default config;
