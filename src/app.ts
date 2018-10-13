import * as compression from "compression";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import * as helmet from "helmet";
import * as morgan from "morgan";
import ErrorResponse from "./errors/ErrorResponse";
import featureController from "./feature/featureController";
import logger from "./utils/logger";
import * as HttpStatusCodes from "http-status-codes";

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

app.use("/", featureController);

// tslint:disable:variable-name
app.use((_req: express.Request, res: express.Response) => {
  res.status(HttpStatusCodes.NOT_FOUND);
  res.send(new ErrorResponse("Not Found", HttpStatusCodes.NOT_FOUND));
});

app.use((err: any, req: express.Request, res: express.Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  logger.error(
    `${err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR} - ${err.message} - ${req.method} - ${
      req.originalUrl
    } - ${req.ip}`
  );

  const status = err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR;
  res.status(status);
  res.send(new ErrorResponse(err.message, status));

  next(err);
});

export default app;
