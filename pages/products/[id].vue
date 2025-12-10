<template>
  <div class="product-detail">
    <!-- Loading State -->
    <div v-if="loading" class="product-detail__loading">
      <div class="container">
        <div class="spinner"></div>
        <p>Loading product details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !product" class="product-detail__error">
      <div class="container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <h2>Product Not Found</h2>
        <p>{{ error || 'The product you are looking for does not exist.' }}</p>
        <NuxtLink to="/" class="btn btn-primary">Back to Products</NuxtLink>
      </div>
    </div>

    <!-- Product Details -->
    <div v-else class="product-detail__content">
      <div class="container">
        <!-- Back Button -->
        <button class="product-detail__back" @click="goBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Products
        </button>

        <div class="product-detail__grid">
          <!-- Product Image Section -->
          <div class="product-detail__image-section">
            <div class="product-detail__image-container">
              <img
                :src="product.imageUrl"
                :alt="product.name"
                class="product-detail__image"
                @error="handleImageError"
              />
              <div v-if="product.category" class="product-detail__category">
                {{ product.category }}
              </div>
            </div>
          </div>

          <!-- Product Info Section -->
          <div class="product-detail__info-section">
            <h1 class="product-detail__title">{{ product.name }}</h1>

            <div v-if="product.price" class="product-detail__price">
              ${{ product.price }}
            </div>

            <p class="product-detail__description">{{ product.description }}</p>

            <!-- Specifications -->
            <div class="product-detail__specs">
              <h3 class="product-detail__specs-title">Specifications</h3>
              <dl class="product-detail__specs-list">
                <div class="product-detail__spec-item">
                  <dt>Dimensions</dt>
                  <dd>
                    {{ product.dimensions.width }}m × {{ product.dimensions.height }}m ×
                    {{ product.dimensions.depth }}m
                  </dd>
                </div>
                <div class="product-detail__spec-item">
                  <dt>Width</dt>
                  <dd>{{ product.dimensions.width }} meters</dd>
                </div>
                <div class="product-detail__spec-item">
                  <dt>Height</dt>
                  <dd>{{ product.dimensions.height }} meters</dd>
                </div>
                <div class="product-detail__spec-item">
                  <dt>Depth</dt>
                  <dd>{{ product.dimensions.depth }} meters</dd>
                </div>
                <div class="product-detail__spec-item">
                  <dt>Scale</dt>
                  <dd>{{ product.scale }}x (Real-world size)</dd>
                </div>
              </dl>
            </div>

            <!-- Action Buttons -->
            <div class="product-detail__actions">
              <button
                class="btn btn-primary btn-lg product-detail__ar-button"
                :disabled="!isWebXRSupported"
                @click="viewInAR"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  <path
                    d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"
                  />
                </svg>
                View in AR
              </button>

              <p v-if="!isWebXRSupported" class="product-detail__ar-notice">
                WebXR is not supported on this device. Please use Chrome on Android or
                Safari on iOS for AR features.
              </p>
            </div>

            <!-- AR Instructions -->
            <div class="product-detail__instructions">
              <h4>How to use AR:</h4>
              <ol>
                <li>Click "View in AR" button</li>
                <li>Grant camera permissions when prompted</li>
                <li>Point your device at a flat surface</li>
                <li>Tap to place the product in your space</li>
                <li>Use gestures to rotate and scale the object</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const route = useRoute()
const router = useRouter()
const { fetchProductById } = useProductData()

// State
const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref<string>()
const isWebXRSupported = ref(true)

// Get product ID from route
const productId = computed(() => route.params.id as string)

/**
 * Load product details
 */
const loadProduct = async () => {
  try {
    loading.value = true
    error.value = undefined

    const data = await fetchProductById(productId.value)

    if (!data) {
      error.value = 'Product not found'
      return
    }

    product.value = data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load product'
    console.error('Error loading product:', e)
  } finally {
    loading.value = false
  }
}

/**
 * Check WebXR support
 */
const checkWebXRSupport = () => {
  if (typeof navigator !== 'undefined' && 'xr' in navigator) {
    navigator.xr
      ?.isSessionSupported('immersive-ar')
      .then(supported => {
        isWebXRSupported.value = supported
      })
      .catch(() => {
        isWebXRSupported.value = false
      })
  } else {
    isWebXRSupported.value = false
  }
}

/**
 * Navigate to AR view
 */
const viewInAR = () => {
  if (!product.value) return

  // Store product in state for AR view (could also use route params)
  useState('selectedProduct', () => product.value)

  // Navigate to AR viewer page
  router.push({
    path: '/ar-view',
    query: { productId: product.value.id }
  })
}

/**
 * Go back to previous page
 */
const goBack = () => {
  router.back()
}

/**
 * Handle image loading errors
 */
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%23e2e8f0" width="800" height="600"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="24" dy="10" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E'
}

// SEO and Meta tags
useHead(() => ({
  title: product.value ? `${product.value.name} - WebAR Product Viewer` : 'Product Details',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'View product details and experience in AR'
    }
  ]
}))

// Lifecycle
onMounted(() => {
  loadProduct()
  checkWebXRSupport()
})

// Watch for route changes
watch(() => route.params.id, () => {
  if (route.params.id) {
    loadProduct()
  }
})
</script>

<style scoped>
.product-detail {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
}

/* Loading State */
.product-detail__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.product-detail__loading .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.product-detail__loading p {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
}

/* Error State */
.product-detail__error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.product-detail__error .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  text-align: center;
}

.product-detail__error svg {
  color: var(--color-error);
}

.product-detail__error h2 {
  font-size: var(--font-size-3xl);
  margin: 0;
}

.product-detail__error p {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  max-width: 500px;
  margin: 0;
}

/* Content */
.product-detail__back {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  background: none;
  border: none;
  color: var(--color-text);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: var(--radius-md);
}

.product-detail__back:hover {
  background-color: var(--color-surface);
  color: var(--color-primary);
}

.product-detail__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-3xl);
  align-items: start;
}

@media (min-width: 1024px) {
  .product-detail__grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Image Section */
.product-detail__image-section {
  position: sticky;
  top: var(--spacing-xl);
}

.product-detail__image-container {
  position: relative;
  width: 100%;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-xl);
}

.product-detail__image {
  width: 100%;
  height: auto;
  display: block;
}

.product-detail__category {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  background-color: rgba(0, 220, 130, 0.95);
  color: white;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: var(--shadow-md);
}

/* Info Section */
.product-detail__title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
  line-height: 1.2;
}

.product-detail__price {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: var(--spacing-xl);
}

.product-detail__description {
  font-size: var(--font-size-lg);
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: var(--spacing-2xl);
}

/* Specifications */
.product-detail__specs {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.product-detail__specs-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
}

.product-detail__specs-list {
  display: grid;
  gap: var(--spacing-md);
}

.product-detail__spec-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border);
}

.product-detail__spec-item:last-child {
  border-bottom: none;
}

.product-detail__spec-item dt {
  font-weight: 600;
  color: var(--color-text-light);
}

.product-detail__spec-item dd {
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
}

/* Actions */
.product-detail__actions {
  margin-bottom: var(--spacing-2xl);
}

.product-detail__ar-button {
  width: 100%;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.product-detail__ar-notice {
  font-size: var(--font-size-sm);
  color: var(--color-warning);
  text-align: center;
  margin: 0;
  padding: var(--spacing-sm);
  background-color: rgba(245, 158, 11, 0.1);
  border-radius: var(--radius-md);
}

/* Instructions */
.product-detail__instructions {
  background: linear-gradient(135deg, var(--color-primary) 0%, #00bd6f 100%);
  color: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-lg);
}

.product-detail__instructions h4 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.product-detail__instructions ol {
  margin: 0;
  padding-left: var(--spacing-xl);
}

.product-detail__instructions li {
  margin-bottom: var(--spacing-sm);
  line-height: 1.6;
}

.product-detail__instructions li:last-child {
  margin-bottom: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .product-detail {
    padding: var(--spacing-lg) 0;
  }

  .product-detail__title {
    font-size: var(--font-size-3xl);
  }

  .product-detail__price {
    font-size: var(--font-size-2xl);
  }

  .product-detail__spec-item {
    grid-template-columns: 100px 1fr;
  }
}
</style>
