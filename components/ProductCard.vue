<template>
  <article class="product-card">
    <NuxtLink :to="`/products/${product.id}`" class="product-card__link">
      <!-- Product Image -->
      <div class="product-card__image-container">
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="product-card__image"
          loading="lazy"
          @error="handleImageError"
        />
        <div v-if="product.category" class="product-card__category">
          {{ product.category }}
        </div>
      </div>

      <!-- Product Info -->
      <div class="product-card__content">
        <h3 class="product-card__title">{{ product.name }}</h3>
        <p class="product-card__description">{{ truncatedDescription }}</p>

        <!-- Product Details -->
        <div class="product-card__details">
          <div class="product-card__dimensions">
            <span class="product-card__label">Dimensions:</span>
            <span class="product-card__value">
              {{ formatDimensions(product.dimensions) }}
            </span>
          </div>
          <div v-if="product.price" class="product-card__price">
            ${{ product.price }}
          </div>
        </div>

        <!-- Action Button -->
        <button
          class="btn btn-primary product-card__button"
          @click.prevent="navigateToProduct"
        >
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
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
          </svg>
          View in AR
        </button>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Product, ProductDimensions } from '~/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter()

/**
 * Truncate description to a maximum length
 */
const truncatedDescription = computed(() => {
  const maxLength = 100
  if (props.product.description.length <= maxLength) {
    return props.product.description
  }
  return props.product.description.substring(0, maxLength) + '...'
})

/**
 * Format dimensions for display
 */
const formatDimensions = (dimensions: ProductDimensions): string => {
  const { width, height, depth } = dimensions
  return `${width}m × ${height}m × ${depth}m`
}

/**
 * Handle image loading errors
 */
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  // Set a placeholder image
  img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23e2e8f0" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="18" dy="10" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EImage not found%3C/text%3E%3C/svg%3E'
}

/**
 * Navigate to product detail page
 */
const navigateToProduct = () => {
  router.push(`/products/${props.product.id}`)
}
</script>

<style scoped>
.product-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.product-card__link {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.product-card__image-container {
  position: relative;
  width: 100%;
  padding-top: 75%; /* 4:3 aspect ratio */
  background-color: var(--color-border);
  overflow: hidden;
}

.product-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}

.product-card__category {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background-color: rgba(0, 220, 130, 0.9);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-card__content {
  display: flex;
  flex-direction: column;
  padding: var(--spacing-lg);
  flex: 1;
}

.product-card__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
  line-height: 1.3;
}

.product-card__description {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
  line-height: 1.5;
  flex: 1;
}

.product-card__details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--color-border);
}

.product-card__dimensions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.product-card__label {
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-card__value {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  font-weight: 500;
}

.product-card__price {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-primary);
}

.product-card__button {
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .product-card__title {
    font-size: var(--font-size-lg);
  }

  .product-card__details {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .product-card__price {
    font-size: var(--font-size-xl);
  }
}
</style>
