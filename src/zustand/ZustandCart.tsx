import { useEffect } from 'react'
import {
  useCartStore,
  selectTotalItems,
  selectTotalPrice,
} from './store'
import { useRenderCount } from '../shared/useRenderCount'

function ProductList() {
  // The "read" story is just selectors that subscribe to slices directly.
  const products = useCartStore((s) => s.products)
  const loading = useCartStore((s) => s.loading)
  const items = useCartStore((s) => s.items)
  const addToCart = useCartStore((s) => s.addToCart)
  const removeFromCart = useCartStore((s) => s.removeFromCart)

  if (loading) return <p>Loading…</p>

  return (
    <div>
      {products.map((p) => (
        <div className="product" key={p.id}>
          <span>
            <span className="name">{p.name}</span>
            <span className="price">${p.price}</span>
          </span>
          <span>
            <button className="btn" onClick={() => removeFromCart(p.id)}>−</button>
            <span className="qty">{items[p.id] ?? 0}</span>
            <button className="btn" onClick={() => addToCart(p.id)}>+</button>
          </span>
        </div>
      ))}
    </div>
  )
}

function CartSummary() {
  // This is the Zustand comparison point for the render-count slide.
  const renders = useRenderCount()
  const totalItems = useCartStore(selectTotalItems)
  const totalPrice = useCartStore(selectTotalPrice)
  const clearCart = useCartStore((s) => s.clearCart)

  return (
    <div>
      <div className="summary">
        <span className="totals">
          {totalItems} items · ${totalPrice}
        </span>
        <span className="count climbs">Renders: {renders}</span>
      </div>
      <button className="clear" onClick={clearCart}>
        clear cart
      </button>
    </div>
  )
}

export default function ZustandCart() {
  // No provider wrapper; the store is just a hook you import anywhere.
  const loadProducts = useCartStore((s) => s.loadProducts)
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return (
    <div className="panel">
      <h3>🐻 Zustand</h3>
      <ProductList />
      <CartSummary />
      <p className="hint">
        Store: <code>create()</code> (no provider). Read:{' '}
        <code>useCartStore(selector)</code>. Update: call an action. Async: just an{' '}
        <code>async</code> function.
      </p>
    </div>
  )
}
