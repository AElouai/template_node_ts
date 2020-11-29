import { Response, Request, NextFunction } from "express";
import { Concert, ConcertAPIFormat } from "../../models/Concert";
const earthRadiusInKilometers = 6371;

const kilometerToRadian = (kilometers: string): number => {
    return parseInt(kilometers, 10) / earthRadiusInKilometers;
};

export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        let query = {};
        if (req.query.bandIds !== undefined && req.query.bandIds.length > 0) {
            const bandIds = (req.query.bandIds as string).split(";");
            query = {
                "band.id": {
                    $in: bandIds,
                },
            };
        } else {
            const landmark = [
                parseFloat(req.query.longitude as string),
                parseFloat(req.query.latitude as string),
            ];
            query = {
                "venue.location": {
                    $geoWithin: {
                        $centerSphere: [
                            landmark,
                            kilometerToRadian(req.query.radius as string),
                        ],
                    },
                },
            };
        }

        const concerts = await Concert.find(query).sort({
            date: 1,
        });

        const result = new Array<ConcertAPIFormat>();
        for (const concert of concerts) {
            result.push(concert.format());
        }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
