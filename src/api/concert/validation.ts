import { RequestHandler } from "express";
import { formatError } from "../../util/error";

// bandIds: String - Comma separated list of bandIds
// latitude: float
// longitude: float
// radius: Int - In kilometers
const concertValidationMiddleware: RequestHandler = (req, res, next) => {
    if (req.query.bandIds === undefined || req.query.bandIds.length === 0) {
        if (
            req.query.latitude === undefined ||
            req.query.longitude === undefined ||
            req.query.radius === undefined
        )
            res.status(401).json(formatError("Input Validation Error"));
    }
    next();
};

export { concertValidationMiddleware };
