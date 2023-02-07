import { NextFunction, Request, Response } from "express";
import multer, { MulterError } from "multer";

const upload = multer({ dest: "uploads/" });

const fileUploader = (req: Request, res: Response, next: NextFunction) => {
    return (
        upload.single(req.params.fieldName)(req, res, next),
        function (err: MulterError) {
            if (err) {
                return next(err.message);
            }
        }
    );
};

export default fileUploader;
