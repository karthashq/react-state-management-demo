import { signal, computed } from '@preact/signals-react'
import { fetchProducts, type Product } from '../shared/data'

// State is plain module-level signals. No store object, no provider, no hooks.
export const products = signal<Product[]>([])
export const loading = signal(false)
export const items = signal<Record<string, number>>({})

// computed() derives a new signal that only recalculates when its inputs change.
export const totalItems = computed(() =>
  Object.values(items.value).reduce((sum, qty) => sum + qty, 0),
)
export const totalPrice = computed(() =>
  products.value.reduce(
    (sum, p) => sum + (items.value[p.id] ?? 0) * p.price,
    0,
  ),
)

// "Actions" are just functions that assign to .value — anywhere, even outside React.
export async function loadProducts() {
  loading.value = true
  products.value = await fetchProducts()
  loading.value = false
}

export function addToCart(id: string) {
  items.value = { ...items.value, [id]: (items.value[id] ?? 0) + 1 }
}

export function removeFromCart(id: string) {
  const next = { ...items.value }
  if (!next[id]) return
  next[id] -= 1
  if (next[id] <= 0) delete next[id]
  items.value = next
}

export function clearCart() {
  items.value = {}
}
