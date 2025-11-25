import { describe, test, expect } from "bun:test";
import { normalizeRoute } from "../src/normalizer";

describe("normalizeRoute", () => {
    test("should normalize static routes correctly", () => {
        const result = normalizeRoute("/API/Users/");
        expect(result).toEqual("/api/users");
    });

    test("should normalize dynamic routes correctly", () => {
        const result = normalizeRoute("/API/Users/:UserID/");
        expect(result).toEqual("/api/users/:userid");
    });

    test("should normalize dynamic routes into internal format", () => {
        const result1 = normalizeRoute("/API/Users/[UserID]/");
        const result2 = normalizeRoute("/API/Users/[...UserID]/[id]");
        const result3 = normalizeRoute("/API/Users/[[...UserID]]/");
        expect(result1).toEqual("/api/users/:userid");
        expect(result2).toEqual("/api/users/*userid/:id");
        expect(result3).toEqual("/api/users/?userid");
    })

    test("should handle routes with multiple slashes and query parameters", () => {
        const result = normalizeRoute("//API//Users//?active=true");
        expect(result).toEqual("/api/users");
    });
});