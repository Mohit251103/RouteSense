
interface NormalizerResponse {
    path: string;
    type: 'static' | 'dynamic';
    segments: string[];
    methods: string[];
    priority: number;
    meta: Record<string, any>;
};

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
 * Normalizes a given route string by removing trailing slashes, converting to lowercase,
 * eliminating unwanted segments, and ensuring proper formatting of dynamic segments.
 * @param {string} route - The route string to normalize.
 * @returns {NormalizerResponse} - The normalized route string.
 * @throws {TypeError} - If the input route is not a string.
 * @throws {Error} - If any segment of the route is invalid.
 */
export function normalizeRoute(route: string): NormalizerResponse {
    if(typeof route !== 'string') {
        throw new TypeError('Route must be a string');
    }

    route = route.trim();
    route = route.toLowerCase();
    route = route.replace(/\/+/g, '/'); // Replace multiple slashes with a single slash

    route = route.split('//')[1] || route;
    route = route.split('?')[0] || '';

    var isDynamic: boolean = false;
    for (const segment of route.split('/')) {
        if (segment.startsWith(':') && !is_valid_segment(segment.slice(1))) {
            throw new Error(`Invalid dynamic segment: ${segment}`);
        }
        else if(!is_valid_segment(segment) && !segment.startsWith(':') && segment.length > 0) {
            throw new Error(`Invalid segment: ${segment}`);
        }

        if (segment.startsWith(':')) {
            isDynamic = true;
        }
    }

    route = route.replace(/\/+$/, ''); // Remove trailing slashes
    if (!route.startsWith('/')) {
        route = '/' + route;
    }

    const response: NormalizerResponse = {
        path: route || '',
        type: isDynamic ? 'dynamic' : 'static',
        segments: route.split('/').filter(seg => seg.length > 0),
        methods: ["GET"],
        priority: 1,
        meta: {}
    }

    return response;
}