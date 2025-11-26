// Route Store Module
// This module provides functionality to store and manage classified routes.

import { createCollectionIfNotExists, qdrant } from "../db/qdrant";
import { embed } from "../utils/embed";

class RouteStore {

    public async addToSemanticStore(route: string, apiKey: string) {
        // Implementation to add route to semantic store
        const vector = await embed(route);
    
        // Store embeddings in the semantic store associated with the apiKey
        await createCollectionIfNotExists('routes');
        await qdrant.upsert('routes', {
            points: [
                {
                    id: `${apiKey}-${Date.now()}`,
                    vector: vector,
                    payload: { route: route, apiKey: apiKey }
                }
            ]
        })
    }

    public async addToTemplateStore(route: string, apiKey: string) {
        // Implementation to add route to template store
    }

    public async addToIgnoreStore(route: string) {
        // Implementation to add route to ignore store
    }
};

let persistentRouteStore: RouteStore | null = null;

// Factory function to create a persistent RouteStore instance
export function createRouteStore(): RouteStore {
    if (!persistentRouteStore) {
        persistentRouteStore = new RouteStore();
    }
    return persistentRouteStore;
}

// Function to get the existing persistent RouteStore instance
export function getRouteStore(): RouteStore | null {
    return persistentRouteStore;
}
