import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config = {
  app: {
    env: process.env.NODE_ENV,
    port: normalizePort(process.env.PORT || "8080")
  }
};

function normalizePort(val: string) {
  const parsedPort = parseInt(val, 10);

  if (isNaN(parsedPort)) {
    return val;
  }

  if (parsedPort >= 0) {
    return parsedPort;
  }

  return false;
}

export default config;
