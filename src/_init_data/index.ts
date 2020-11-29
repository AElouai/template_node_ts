import { Band, Venue, Concert } from "../models/Concert";
import bands from "./bands.json";
import concerts from "./concerts.json";
import venues from "./venues.json";

const getBand = (id: number): Band => {
    return bands.find((el) => el.id === id);
};

const getVenue = (venueId: number): Venue => {
    const { id, name, latitude, longitude } = venues.find(
        (el) => el.id === venueId
    );

    return {
        id,
        name,
        location: {
            type: "Point",
            coordinates: [longitude, latitude],
        },
    };
};

const initData = async (): Promise<void> => {
    const count = await Concert.estimatedDocumentCount();
    if (count === 0)
        for await (const concert of concerts) {
            const concertRow = new Concert({
                date: concert.date,
                band: getBand(concert.bandId),
                venue: getVenue(concert.venueId),
            });
            await concertRow.save();
        }
};

export default initData;
