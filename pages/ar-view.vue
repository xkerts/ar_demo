<template>
  <div class="ar-view">
    <div class="ar-view__placeholder">
      <div class="container">
        <h1>AR Viewer</h1>
        <p class="ar-view__message">
          AR viewer will be implemented in Phase 3 with WebXR integration
        </p>
        <div class="ar-view__info">
          <h3>Selected Product:</h3>
          <div v-if="product">
            <p><strong>{{ product.name }}</strong></p>
            <p>{{ product.description }}</p>
            <p class="ar-view__model-path">Model: {{ product.modelUrl }}</p>
          </div>
          <p v-else>No product selected</p>
        </div>
        <NuxtLink to="/" class="btn btn-primary">Back to Products</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

definePageMeta({
  // This page should be client-only as it uses WebXR APIs
  // which are not available during SSR
  ssr: false
})

useHead({
  title: 'AR Viewer - WebAR Product Viewer'
})

const route = useRoute()
const { fetchProductById } = useProductData()

// Get product from state or route query
const product = ref<Product | null>(null)

onMounted(async () => {
  // Try to get product from state first
  const selectedProduct = useState<Product | null>('selectedProduct')

  if (selectedProduct.value) {
    product.value = selectedProduct.value
  } else if (route.query.productId) {
    // Fallback to fetching by ID from query
    const productId = route.query.productId as string
    product.value = await fetchProductById(productId)
  }
})
</script>

<style scoped>
.ar-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.ar-view__placeholder {
  text-align: center;
  color: white;
}

.ar-view__placeholder h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-lg);
}

.ar-view__message {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-2xl);
  opacity: 0.9;
}

.ar-view__info {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-2xl);
  text-align: left;
}

.ar-view__info h3 {
  margin-bottom: var(--spacing-md);
}

.ar-view__info p {
  margin-bottom: var(--spacing-sm);
}

.ar-view__model-path {
  font-family: monospace;
  font-size: var(--font-size-sm);
  opacity: 0.8;
}
</style>
