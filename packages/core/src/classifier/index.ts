// Semantic Classifier Module
// This module provides functionality to classify route segments semantically.

import type { ClassifierResponse } from "../types";
import { rules } from "../rules/classifier.rules";

/**
 * @param route - The route string to classify.
 * @returns A promise that resolves to a ClassifierResponse object.
 */
export async function classifier(route: string): Promise<ClassifierResponse> {
    // Split the route into segments
    const segments = route.split("/").filter(Boolean);
    
    // Check each segment against classification rules
    for (const segment of segments) {
        if (rules.is_ignore_segment(segment)) {
            return { route, type: "ignore" };
        }
        if (rules.is_template_segment(segment)) {
            return { route, type: "template" };
        }
    }
    
    // If no special segments found, classify as semantic
    return { route, type: "semantic" };
}