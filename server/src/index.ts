import express, { Application, Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { Server } from "http";
import { config } from "dotenv";
import cors from "cors";

import router from "./router";
import errorHandler from "./middlewares/errorHandler";

config();
const app: Application = express();
const PORT: Number = Number(process.env.PORT) || 3000;

const corsOptions = {
    origin: "http://127.0.0.1:5173",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound("Invalid Request!"));
});
app.use(errorHandler);

(async function () {
    try {
        const server: Server = app.listen(PORT, () =>
            console.log(`server is listening on port: ${PORT}`)
        );
    } catch (error) {
        throw new Error(`failed to connect to server ${error}`);
    }
})();
