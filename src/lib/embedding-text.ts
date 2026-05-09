import { DataArray, pipeline } from "@huggingface/transformers"

export default async function embeddingText(
  text: string
): Promise<{ data: DataArray; dims: number }> {
  // Create a feature-extraction pipeline
  const extractor = await pipeline(
    "feature-extraction",
    "onnx-community/all-MiniLM-L6-v2-ONNX",
    {
      dtype: "q4f16",
      device: "cpu",
    }
  )

  // Compute sentence embeddings
  // const sentences = ['This is an example sentence', 'Each sentence is converted'];
  const output = await extractor(text, { pooling: "mean", normalize: true })

  return {
    data: output.data,
    dims: output.dims[1],
  }
}
