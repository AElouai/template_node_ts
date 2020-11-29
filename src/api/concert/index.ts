import express from "express";
import { index } from "./controller";
import { concertValidationMiddleware } from "./validation";
const router = express.Router();

router.get("/", concertValidationMiddleware, index);

export const concertRouter = router;
