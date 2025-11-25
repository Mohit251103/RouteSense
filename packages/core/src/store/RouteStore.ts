// Route Store Module
// This module provides functionality to store and manage classified routes.

class RouteStore {
    private semanticStore = null;
    private templateStore = null;
    private ignoreStore = null;

    constructor(semanticStore: any, templateStore: any, ignoreStore: any) {
        this.semanticStore = semanticStore;
        this.templateStore = templateStore;
        this.ignoreStore = ignoreStore;
    }

    public getSemanticStore() {
        return this.semanticStore;
    }

    public getTemplateStore() {
        return this.templateStore;
    }

    public getIgnoreStore() {
        return this.ignoreStore;
    }

    public async addToSemanticStore(route: string, apiKey: string) {
        // Implementation to add route to semantic store
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
export function createRouteStore(semanticStore: any, templateStore: any, ignoreStore: any): RouteStore {
    if (!persistentRouteStore) {
        persistentRouteStore = new RouteStore(semanticStore, templateStore, ignoreStore);
    }
    return persistentRouteStore;
}

// Function to get the existing persistent RouteStore instance
export function getRouteStore(): RouteStore | null {
    return persistentRouteStore;
}
