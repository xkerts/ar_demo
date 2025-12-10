/**
 * Product dimension specifications in meters
 */
export interface ProductDimensions {
  width: number
  height: number
  depth: number
}

/**
 * Product interface representing an item that can be viewed in AR
 */
export interface Product {
  /** Unique identifier for the product */
  id: string

  /** Display name of the product */
  name: string

  /** Detailed description of the product */
  description: string

  /** URL path to the product thumbnail image */
  imageUrl: string

  /** URL path to the GLTF/GLB 3D model file */
  modelUrl: string

  /** Scale factor for real-world size (in meters) */
  scale: number

  /** Physical dimensions of the product */
  dimensions: ProductDimensions

  /** Optional category for filtering/grouping */
  category?: string

  /** Optional price for display */
  price?: number
}

/**
 * Product list response type
 */
export interface ProductListResponse {
  products: Product[]
  total: number
}
