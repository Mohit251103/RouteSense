// Normalizer Module
// This module provides functionality to normalize route strings for consistent processing.

/**
 * Checks if a given segment is valid based on a specific pattern.
 * @param {string} segment Segment to be checked
 * @returns {boolean} - True if the segment is valid, false otherwise
 */
function is_valid_segment(segment: string): boolean {
    const isValid = /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(segment);
    return isValid;
}

/**
 * Checks if a segment is a dynamic segment.
 * @param {string} segment Segment to be checked
 * @returns {boolean} - True if the segment is dynamic, false otherwise
 */
function is_dynamic_segment(segment: string): boolean {
    return segment.startsWith('[') && segment.endsWith(']');
}

/**
 * Converts a dynamic segment to a standardized format.
 * @param {string} segment Dynamic segment to be converted
 * @returns {string} - Converted dynamic segment
 */
function convert_dynamic_segment(segment: string): string {
    const paramName = segment.slice(1, -1);
    if (is_dynamic_segment(paramName)) {
        return paramName.slice(1, -1).startsWith('...') ? `?${paramName.slice(4, -1)}` : paramName;
    }
    return paramName.startsWith('...') ? `*${paramName.slice(3)}` : `:${paramName}`;
}

/**
 * Normalizes a given route string by removing trailing slashes, converting to lowercase,
 * eliminating unwanted segments, and ensuring proper formatting of dynamic segments.
 * @param {string} route - The route string to normalize.
 * @returns {string} - The normalized route string.
 */
export function normalizeRoute(route: string): string {
    if(typeof route !== 'string') {
        throw new TypeError('Route must be a string');
    }

    route = route.trim();
    route = route.toLowerCase();
    route = route.replace(/\/+/g, '/'); // Replace multiple slashes with a single slash

    route = route.split('//')[1] || route;
    route = route.split('?')[0] || '';

    route = route.split('/').map(seg => {
        if (is_dynamic_segment(seg)) {
            return convert_dynamic_segment(seg);
        }
        return seg;
    }).join('/');

    route = route.replace(/\/+$/, ''); // Remove trailing slashes
    if (!route.startsWith('/')) {
        route = '/' + route;
    }

    return route;
}