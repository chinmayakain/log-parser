import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(err.status || 500).send({
        success: false,
        message: err.message,
    });
};

export default errorHandler;
