import { Router } from "express";

import { logParser } from "../controllers/logParserController";
import fileUploader from "../middlewares/fileUploader";

const router = Router();

router.route("/logParser/:fieldName").post(fileUploader, logParser);

export default router;
