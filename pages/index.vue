<template>
  <div class="home-page">
    <!-- Header Section -->
    <header class="home-page__header">
      <div class="container">
        <h1 class="home-page__title">WebAR Product Viewer</h1>
        <p class="home-page__subtitle">
          Explore our products and view them in your space using augmented reality
        </p>

        <!-- WebXR Support Notice -->
        <div v-if="!isWebXRSupported" class="home-page__notice">
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
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>
            WebXR not supported on this device. AR features will be unavailable.
            For the best experience, use Chrome on Android or Safari on iOS.
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="home-page__main">
      <div class="container">
        <!-- Category Filter (Optional for future) -->
        <div v-if="categories.length > 0" class="home-page__filters">
          <button
            v-for="category in categories"
            :key="category"
            class="btn btn-secondary"
            :class="{ 'btn--active': selectedCategory === category }"
            @click="filterByCategory(category)"
          >
            {{ category }}
          </button>
          <button
            v-if="selectedCategory"
            class="btn btn-secondary"
            @click="clearFilter"
          >
            Clear Filter
          </button>
        </div>

        <!-- Products List -->
        <ProductList
          :products="displayProducts"
          :loading="loading"
          :error="error"
          @retry="loadProducts"
        />
      </div>
    </main>

    <!-- Footer -->
    <footer class="home-page__footer">
      <div class="container">
        <p>&copy; 2024 WebAR Product Viewer. Built with Nuxt 3 and Three.js</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

// SEO and Meta tags
useHead({
  title: 'WebAR Product Viewer - View Products in AR',
  meta: [
    {
      name: 'description',
      content: 'Browse our product catalog and view items in augmented reality using WebXR technology.'
    },
    {
      property: 'og:title',
      content: 'WebAR Product Viewer'
    },
    {
      property: 'og:description',
      content: 'View products in your space using augmented reality'
    }
  ]
})

// State
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref<string>()
const categories = ref<string[]>([])
const selectedCategory = ref<string>()
const isWebXRSupported = ref(true)

// Composables
const { fetchProducts, getCategories } = useProductData()

// Computed
const displayProducts = computed(() => {
  if (!selectedCategory.value) {
    return products.value
  }
  return products.value.filter(p => p.category === selectedCategory.value)
})

/**
 * Load products from API/composable
 */
const loadProducts = async () => {
  try {
    loading.value = true
    error.value = undefined

    const response = await fetchProducts()
    products.value = response.products

    // Load categories
    categories.value = await getCategories()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load products'
    console.error('Error loading products:', e)
  } finally {
    loading.value = false
  }
}

/**
 * Filter products by category
 */
const filterByCategory = (category: string) => {
  selectedCategory.value = category
}

/**
 * Clear category filter
 */
const clearFilter = () => {
  selectedCategory.value = undefined
}

/**
 * Check WebXR support on client-side
 */
const checkWebXRSupport = () => {
  if (typeof navigator !== 'undefined' && 'xr' in navigator) {
    navigator.xr?.isSessionSupported('immersive-ar').then(supported => {
      isWebXRSupported.value = supported
    }).catch(() => {
      isWebXRSupported.value = false
    })
  } else {
    isWebXRSupported.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadProducts()
  checkWebXRSupport()
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Section */
.home-page__header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #00bd6f 100%);
  color: white;
  padding: var(--spacing-3xl) 0;
  text-align: center;
}

.home-page__title {
  font-size: var(--font-size-4xl);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.home-page__subtitle {
  font-size: var(--font-size-xl);
  font-weight: 400;
  margin-bottom: var(--spacing-lg);
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.home-page__notice {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  max-width: 600px;
  margin: var(--spacing-lg) auto 0;
}

/* Main Content */
.home-page__main {
  flex: 1;
  padding: var(--spacing-3xl) 0;
}

.home-page__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-2xl);
  justify-content: center;
}

.btn--active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

/* Footer */
.home-page__footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-xl) 0;
  text-align: center;
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .home-page__header {
    padding: var(--spacing-2xl) 0;
  }

  .home-page__title {
    font-size: var(--font-size-3xl);
  }

  .home-page__subtitle {
    font-size: var(--font-size-lg);
  }

  .home-page__main {
    padding: var(--spacing-2xl) 0;
  }
}
</style>
