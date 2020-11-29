import { Response, Request, NextFunction } from "express";
export const index = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        res.status(200).json("ok");
    } catch (error) {
        next(error);
    }
};
