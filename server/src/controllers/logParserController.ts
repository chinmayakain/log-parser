import { Request, Response } from "express";
import fs from "fs";
import { promisify } from "util";
import moment, { ISO_8601 } from "moment";

const readFile = promisify(fs.readFile);

interface LogMessage {
    timestamp: number;
    loglevel: string;
    transactionId: string;
    err?: string;
}

async function parseLogFile(file: Express.Multer.File): Promise<LogMessage[]> {
    const fileData = await readFile(file.path, "utf-8");
    const logLines = fileData.split("\n");
    const logMessages: LogMessage[] = [];

    logLines.forEach((logLine) => {
        const logElements = logLine.split(" - ");

        if (!logElements[1] || !["error", "warn"].includes(logElements[1])) {
            return;
        }

        const logObject = JSON.parse(logElements[2]);

        logMessages.push({
            timestamp: moment(logElements[0], ISO_8601).valueOf(),
            loglevel: logElements[1],
            transactionId: logObject.transactionId,
            err: logObject?.err,
        });
    });
    return logMessages;
}

const logParser = async (req: Request, res: Response) => {
    if (!req.file) {
        return res
            .status(400)
            .send({ success: false, message: "No log file was uploaded" });
    }

    const logFile = req.file;

    try {
        const logMessages = await parseLogFile(logFile);
        return res.status(200).json(logMessages);
    } catch (error: any) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

export { logParser };
