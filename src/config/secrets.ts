import dotenv from "dotenv";
import fs from "fs";
import { NODE_ENV, TEST, PRODUCTION } from "./settings";
import logger from "../util/logger";

if (!fs.existsSync(".env")) {
    logger.info("No .env file found, looking for variables in environment.");
}

if (NODE_ENV !== TEST) dotenv.config();

const requiredSecrets = ["MONGO_DATABASE", "MONGO_HOST", "CORS_REGEX"];

if (NODE_ENV === PRODUCTION) {
    requiredSecrets.push(...["MONGO_USERNAME", "MONGO_PASSWORD"]);
}

const missingSecrets = requiredSecrets.filter((s) => !process.env[s]);
if (missingSecrets.length > 0) {
    missingSecrets.forEach((ms) =>
        logger.error(`Env variable ${ms} is missing.`)
    );
    process.exit(1);
}

const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
export const MONGO_URI = mongoURI;
export const CORS_REGEX = process.env["CORS_REGEX"];
