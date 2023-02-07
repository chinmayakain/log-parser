import { Router } from "express";

import logRouter from "./routes/logRoutes";

const router = Router();

router.use("/logs", logRouter);

export default router;
