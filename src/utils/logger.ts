import * as winston from "winston";
import config from "../config";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: config.app.env === "production" ? "info" : "debug"
    }),
    new winston.transports.File({ filename: "debug.log", level: "debug" }),
    new winston.transports.File({ filename: "app.log", level: "info" })
  ]
});

if (config.app.env !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
