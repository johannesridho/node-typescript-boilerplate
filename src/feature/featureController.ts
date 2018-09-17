import { Request, Response, Router } from "express";
import logger from "../utils/logger";
import * as featureService from "./featureService";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  logger.debug(req);
  res.send(featureService.getHelloWorld());
});

export default router;
