import {
  createSlice,
  createAsyncThunk,
  createSelector,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { fetchProducts, type Product } from '../shared/data'
import type { RootState } from './store'

// --- async: createAsyncThunk generates pending/fulfilled/rejected actions ---
export const loadProducts = createAsyncThunk('cart/loadProducts', async () => {
  return await fetchProducts()
})

interface CartState {
  products: Product[]
  loading: boolean
  items: Record<string, number> // productId -> quantity
}

const initialState: CartState = { products: [], loading: false, items: {} }

// --- the slice: reducers look like mutations, but Immer keeps them immutable ---
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.items[id] = (state.items[id] ?? 0) + 1
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload
      if (!state.items[id]) return
      state.items[id] -= 1
      if (state.items[id] <= 0) delete state.items[id]
    },
    clearCart: (state) => {
      state.items = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer

// --- selectors: memoized derived state lives next to the slice ---
export const selectProducts = (s: RootState) => s.cart.products
export const selectLoading = (s: RootState) => s.cart.loading
export const selectItems = (s: RootState) => s.cart.items

export const selectTotalItems = createSelector(selectItems, (items) =>
  Object.values(items).reduce((sum, qty) => sum + qty, 0),
)

export const selectTotalPrice = createSelector(
  [selectItems, selectProducts],
  (items, products) =>
    products.reduce((sum, p) => sum + (items[p.id] ?? 0) * p.price, 0),
)
