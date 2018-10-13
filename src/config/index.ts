import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const DEFAULT_PORT = 8080;

const config = {
  app: {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || DEFAULT_PORT,
    version: process.env.npm_package_version
  }
};

export default config;
