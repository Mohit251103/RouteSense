// Rules Module
// This module provides functionality to define and manage routing rules.

const validate_static_segment = (segment: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const isValid = /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(segment);
        if(!isValid) {
            reject(new Error(`Invalid static segment: ${segment}`));
        }
        resolve(isValid);
    });
}

const validate_dynamic_segment = (segment: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const isValid = /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(segment);
        if(!isValid) {
            reject(new Error(`Invalid dynamic segment: ${segment}`));
        }
        resolve(isValid);
    });
}

export const rules = {
    validate_static_segment,
    validate_dynamic_segment
};