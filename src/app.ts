import * as compression from "compression";
import * as express from "express";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import * as helmet from "helmet";
import * as morgan from "morgan";
import StatusError from "./errors/StatusError";
import featureRouter from "./feature/featureController";
import logger from "./utils/logger";

const app = express();

app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(
  morgan("tiny", {
    stream: {
      write: (message: string) => {
        logger.info(message);
      }
    }
  })
);

app.use("/", featureRouter);

// tslint:disable:variable-name
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new StatusError("Not Found", 404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  logger.error(
    `${err.status || 500} - ${err.message} - ${req.method} - ${
      req.originalUrl
    } - ${req.ip}`
  );

  res.status(err.status || 500);
  res.send();
});

export default app;
