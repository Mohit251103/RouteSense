import { pipeline } from "@xenova/transformers";

let embedder: any = null;

export async function getEmbedder() {
    if (embedder) return embedder;

    embedder = await pipeline(
        "feature-extraction",
        "Xenova/bge-small-en-v1.5", // FIXED MODEL ID
        {
            quantized: true, // loads model_quantized.onnx if available
        }
    );

    return embedder;
}

export async function embed(text: string): Promise<number[]> {
    const model = await getEmbedder();

    const output = await model(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}
