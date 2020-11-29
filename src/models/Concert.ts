import mongoose from "mongoose";

export interface Band {
    id: number;
    name: string;
}

export interface Venue {
    id: number;
    name: string;
    location: {
        type: "Point";
        coordinates: [number, number];
    };
}

export interface ConcertAPIFormat {
    band: string;
    location: string;
    date: number;
    latitude: number;
    longitude: number;
}
export type ConcertDocument = mongoose.Document & {
    date: number;
    band: Band;
    venue: Venue;
    format: () => ConcertAPIFormat;
};

const ConcertSchema = new mongoose.Schema({
    date: Number,
    band: {
        id: Number,
        name: String,
    },
    venue: {
        id: Number,
        name: String,
        location: {
            type: { type: String, default: "Point" },
            coordinates: { type: [Number], default: [0, 0] },
        },
    },
});

ConcertSchema.methods = {
    format: function (): ConcertAPIFormat {
        const result = {
            band: this.band.name,
            location: this.venue.name,
            date: this.date,
            longitude: this.venue.location.coordinates[0],
            latitude: this.venue.location.coordinates[1],
        };

        return result;
    },
};

export const Concert = mongoose.model<ConcertDocument>(
    "Concert",
    ConcertSchema
);
