import * as express from "express";
import * as featureService from "./featureService";

const router = express.Router();

// tslint:disable:variable-name
router.get("/", (_req, res) => {
  res.send(featureService.getHelloWorld());
});

export default router;
