import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

// configureStore wires up the reducer, Redux DevTools, and thunk middleware.
export const store = configureStore({
  reducer: { cart: cartReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
