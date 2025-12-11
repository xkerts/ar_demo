import type { Product, ProductListResponse } from '~/types'

/**
 * Mock product data for development and testing
 * In production, this would be replaced with API calls
 */
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Red velvet caje',
    description: 'A small red velvet cake. Serves 2 people.',
    imageUrl: '/images/redVelvet.jpg',
    modelUrl: '/models/redVelvet.glb',
    scale: 1.0,
    dimensions: {
      width: 0.8,
      height: 0.9,
      depth: 0.85
    },
    category: 'Dessert',
    price: 5.99
  },
  {
    id: '2',
    name: 'Nachos',
    description: 'Nachos con queso. Serves 2 people.',
    imageUrl: '/images/redVelvet.jpg',
    modelUrl: '/models/nachos.glb',
    scale: 1.0,
    dimensions: {
      width: 0.8,
      height: 0.9,
      depth: 0.85
    },
    category: 'Dessert',
    price: 5.99
  },
  {
    id: '3',
    name: 'Sushi',
    description: 'Nachos con queso. Serves 2 people.',
    imageUrl: '/images/redVelvet.jpg',
    modelUrl: '/models/cielomar.glb',
    scale: 1.0,
    dimensions: {
      width: 0.8,
      height: 0.9,
      depth: 0.85
    },
    category: 'Dessert',
    price: 5.99
  }
]

/**
 * Composable for managing product data
 * Provides methods to fetch products and handle product-related state
 */
export const useProductData = () => {
  /**
   * Fetch all products
   * @returns Promise resolving to product list response
   */
  const fetchProducts = async (): Promise<ProductListResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      products: mockProducts,
      total: mockProducts.length
    }
  }

  /**
   * Fetch a single product by ID
   * @param id - Product identifier
   * @returns Promise resolving to product or null if not found
   */
  const fetchProductById = async (id: string): Promise<Product | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200))

    const product = mockProducts.find(p => p.id === id)
    return product || null
  }

  /**
   * Fetch products by category
   * @param category - Category name to filter by
   * @returns Promise resolving to filtered product list
   */
  const fetchProductsByCategory = async (category: string): Promise<ProductListResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const filtered = mockProducts.filter(p => p.category === category)

    return {
      products: filtered,
      total: filtered.length
    }
  }

  /**
   * Get all unique categories from products
   * @returns Promise resolving to array of category names
   */
  const getCategories = async (): Promise<string[]> => {
    const categories = [...new Set(mockProducts.map(p => p.category).filter(Boolean))] as string[]
    return categories
  }

  return {
    fetchProducts,
    fetchProductById,
    fetchProductsByCategory,
    getCategories
  }
}
