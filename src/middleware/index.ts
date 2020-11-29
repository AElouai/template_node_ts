import { NextFunction, Request, Response } from "express";

import logger from "../util/logger";
import { formatError } from "../util/error";

export const handleErrors = (
    error: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void => {
    logger.error(error.stack);
    res.status(500).json(formatError("Server Error"));
};

export const handleMissing = (_req: Request, res: Response): void => {
    res.sendStatus(404);
};
