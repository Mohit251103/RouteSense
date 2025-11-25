import { describe, test, expect } from "bun:test";
import { classifier } from "../src/classifier";

describe("classifier", () => {
    test("should classify a semantic route correctly", async () => {
        const result = await classifier("/api/users/profile");
        expect(result).toEqual({ route: "/api/users/profile", type: "semantic" });
    });

    test("should classify a template route correctly", async () => {
        const result = await classifier("/api/users/:userid");
        expect(result).toEqual({ route: "/api/users/:userid", type: "template" });
    });
});