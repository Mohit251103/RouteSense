// Validator Module
// This module provides functionality to validate route segments for correctness.

import type { ValidatorResponse } from "../types";
import { rules } from "../rules/validation.rules";

/**
 * 
 * @param {string} path Normalized route path
 */
export async function validator(path: string) : Promise<ValidatorResponse> {
    const segments = path.split('/');
    try {
        await Promise.all(segments.map(async (segment) => {
            if (!segment) return;
            if (segment.startsWith(':') || segment.startsWith('*') || segment.startsWith('?')) {
                return rules.validate_dynamic_segment(segment.slice(1));
            }
            else {
                return rules.validate_static_segment(segment);
            }
        }));
    } catch (error) {
        return {
            isValid: false,
            errors: [(error as Error).message]
        }
    }

    return { isValid: true };
}