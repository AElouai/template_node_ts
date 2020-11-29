import { handleMissing, handleErrors } from "../../src/middleware";

/* eslint-disable @typescript-eslint/no-explicit-any */

const mockResponse = (): any => {
    const res: any = {};
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("Middlewares", () => {
    describe("404 handler", () => {
        it("should return status 404", () => {
            const res = mockResponse();
            handleMissing({} as any, res);
            expect(res.sendStatus).toHaveBeenCalledWith(404);
        });
    });

    describe("error handler", () => {
        it("should return status 500 and Server Error message", () => {
            const res = mockResponse();
            handleErrors({} as any, {} as any, res, {} as any);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                errors: [{ msg: "Server Error" }],
            });
        });
    });
});
