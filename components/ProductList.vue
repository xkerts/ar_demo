<template>
  <div class="product-list">
    <!-- Loading State -->
    <div v-if="loading" class="product-list__loading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="product-list__error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
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
      <h3>Failed to load products</h3>
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="retryLoad">Try Again</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!products.length" class="product-list__empty">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
      <h3>No products found</h3>
      <p>Check back later for new items.</p>
    </div>

    <!-- Products Grid -->
    <div v-else class="product-list__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

interface Props {
  products: Product[]
  loading?: boolean
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: undefined
})

const emit = defineEmits<{
  retry: []
}>()

/**
 * Retry loading products
 */
const retryLoad = () => {
  emit('retry')
}
</script>

<style scoped>
.product-list {
  width: 100%;
}

/* Loading State */
.product-list__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) var(--spacing-md);
  gap: var(--spacing-lg);
}

.product-list__loading p {
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  margin: 0;
}

/* Error State */
.product-list__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) var(--spacing-md);
  gap: var(--spacing-md);
  text-align: center;
}

.product-list__error svg {
  color: var(--color-error);
}

.product-list__error h3 {
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  margin: 0;
}

.product-list__error p {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  margin: 0;
  max-width: 400px;
}

/* Empty State */
.product-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-3xl) var(--spacing-md);
  gap: var(--spacing-md);
  text-align: center;
}

.product-list__empty svg {
  color: var(--color-text-light);
  opacity: 0.5;
}

.product-list__empty h3 {
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  margin: 0;
}

.product-list__empty p {
  font-size: var(--font-size-base);
  color: var(--color-text-light);
  margin: 0;
}

/* Products Grid */
.product-list__grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: var(--spacing-lg);
  width: 100%;
}

/* Responsive Grid */
@media (min-width: 640px) {
  .product-list__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .product-list__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--spacing-xl);
  }
}

@media (min-width: 1024px) {
  .product-list__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .product-list__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
