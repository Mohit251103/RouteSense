import { describe, test, expect } from "bun:test";
import { validator } from "../src/validator";

describe("validator", () => {
    test("should validate a valid static route", async () => {
        const result = await validator("/api/users");
        expect(result).toEqual({ isValid: true });
    });

    test("should validate a valid dynamic route", async () => {
        const result = await validator("/api/users/:userid");
        expect(result).toEqual({ isValid: true });
    });

    test("should invalidate an invalid static segment", async () => {
        const result = await validator("/api/!nvalidSegment");
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain("Invalid static segment: !nvalidSegment");
    });

    test("should invalidate an invalid dynamic segment", async () => {
        const result = await validator("/api/users/:!nvalidDynamic");
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain("Invalid dynamic segment: !nvalidDynamic");
    });
});