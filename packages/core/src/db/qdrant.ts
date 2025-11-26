import { QdrantClient } from '@qdrant/js-client-rest';

export const qdrant = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});

/**
 * 
 * Ensures that a collection with the given name exists in Qdrant. If it does not exist, it creates one.
 * 
 * @param collectionName Name of the collection to check or create
 * @returns True if the collection already existed, false if it was created
 */
export async function createCollectionIfNotExists(collectionName: string) {
    const collections = await qdrant.getCollections();
    const exists = collections.collections.some(col => col.name === collectionName);

    if (!exists) {
        await qdrant.createCollection(collectionName, {
            vectors: {
                size: 384,
                distance: 'Cosine',
            },
        });
    }

    return exists;
}
