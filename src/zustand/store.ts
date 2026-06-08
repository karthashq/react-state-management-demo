import { create } from 'zustand'
import { fetchProducts, type Product } from '../shared/data'

interface CartState {
  products: Product[]
  loading: boolean
  items: Record<string, number>
  // actions live INSIDE the store — no action creators, no reducers, no provider
  loadProducts: () => Promise<void>
  addToCart: (id: string) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

// v5 TypeScript idiom: create<State>()(...) — note the extra ().
export const useCartStore = create<CartState>()((set) => ({
  products: [],
  loading: false,
  items: {},

  // async is just an async function that calls set() — no middleware needed
  loadProducts: async () => {
    set({ loading: true })
    const products = await fetchProducts()
    set({ products, loading: false })
  },

  addToCart: (id) =>
    set((s) => ({ items: { ...s.items, [id]: (s.items[id] ?? 0) + 1 } })),

  removeFromCart: (id) =>
    set((s) => {
      const next = { ...s.items }
      if (!next[id]) return s
      next[id] -= 1
      if (next[id] <= 0) delete next[id]
      return { items: next }
    }),

  clearCart: () => set({ items: {} }),
}))

// v5 best practice: define selectors outside components.
export const selectTotalItems = (s: CartState) =>
  Object.values(s.items).reduce((sum, qty) => sum + qty, 0)

export const selectTotalPrice = (s: CartState) =>
  s.products.reduce((sum, p) => sum + (s.items[p.id] ?? 0) * p.price, 0)
