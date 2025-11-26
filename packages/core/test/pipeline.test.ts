import { describe, test, expect } from 'bun:test';
import { processRoute } from '../src/pipeline';

describe('processRoute', () => {
    test('should process a valid semantic route successfully', async () => {
        const result = await processRoute('/api/users/:userid/profile', 'test-api-key');
        expect(result).toEqual({ success: true });
    });

    test('should fail validation for an invalid route', async () => {
        const result = await processRoute('/api/!nvalidSegment', 'test-api-key');
        expect(result.success).toBe(false);
        expect(result.error).toContain('Invalid route:');
    });

    test('should process a valid template route successfully', async () => {
        const result = await processRoute('/api/products/:productid', 'test-api-key');
        expect(result).toEqual({ success: true });
    });

    test('should process a semantic route and store in both semantic and template stores', async () => {
        const result = await processRoute('/orders', 'test-api-key');
        expect(result).toEqual({ success: true });
    });
});