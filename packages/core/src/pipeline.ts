import { normalizeRoute } from "./normalizer";
import { validator } from "./validator";
import { classifier } from "./classifier";
import { createRouteStore } from "./store/RouteStore";
import type { ValidatorResponse, ClassifierResponse } from "./types";

const routeStore = createRouteStore();

/**
 * 
 * @param route Route to be processed
 * @param apiKey API Key of the user for authenticated and isolated processing of routes
 * @returns
 */
export async function processRoute(route: string, apiKey: string) {
    // Step 1: Normalize the route
    const normalizedRoute = normalizeRoute(route);
    if (!normalizedRoute) {
        return { success: false, error: "Normalization failed" };
    }

    // Step 2: Validate the normalized route
    const validationResponse: ValidatorResponse = await validator(normalizedRoute);
    if (!validationResponse.isValid) {
        const error = `Invalid route: ${validationResponse.errors?.join(", ")}`;
        return { success: false, error };
    }

    // Step 3: Classify the validated route
    const classificationResponse: ClassifierResponse = await classifier(normalizedRoute);

    // Step 4: Store the classified route
    switch (classificationResponse.type) {
        case "semantic":
            await routeStore.addToSemanticStore(normalizedRoute, apiKey);
            await routeStore.addToTemplateStore(normalizedRoute, apiKey);
            break;

        case "template":
            await routeStore.addToTemplateStore(normalizedRoute, apiKey);
            break;

        case "ignore":
            await routeStore.addToIgnoreStore(normalizedRoute);
            break;
    }

    return { success: true };
}