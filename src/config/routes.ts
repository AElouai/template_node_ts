import { Express } from "express";
import { concertRouter } from "../api/concert";
import { healthyRouter } from "../api/healthy";

export const setupRoutesV1 = (app: Express): void => {
    app.use("/concert", concertRouter);
    app.use("/healthy", healthyRouter);
};
