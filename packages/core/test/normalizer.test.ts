import { describe, test, expect } from "bun:test";
import { normalizeRoute } from "../src/normalizeRoute";

describe("normalizeRoute", () => {
    test("should normalize static routes correctly", () => {
        const result = normalizeRoute("/API/Users/");
        expect(result).toEqual({
            path: "/api/users",
            type: "static",
            segments: ["api", "users"],
            methods: ["GET"],
            priority: 1,
            meta: {}
        });
    });

    test("should normalize dynamic routes correctly", () => {
        const result = normalizeRoute("/API/Users/:UserID/");
        expect(result).toEqual({
            path: "/api/users/:userid",
            type: "dynamic",
            segments: ["api", "users", ":userid"],
            methods: ["GET"],
            priority: 1,
            meta: {}
        });
    });

    test("should throw TypeError for non-string input", () => {
        expect(() => normalizeRoute(123 as any)).toThrow(TypeError);
    });

    test("should throw Error for invalid static segment", () => {
        expect(() => normalizeRoute("/API/Us@ers/")).toThrow(Error);
    });

    test("should throw Error for invalid dynamic segment", () => {
        expect(() => normalizeRoute("/API/Users/:User!ID/")).toThrow(Error);
    });

    test("should handle routes with multiple slashes and query parameters", () => {
        const result = normalizeRoute("//API//Users//?active=true");
        expect(result).toEqual({
            path: "/api/users",
            type: "static",
            segments: ["api", "users"],
            methods: ["GET"],
            priority: 1,
            meta: {}
        });
    });
});