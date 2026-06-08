import { useEffect } from 'react'
import {
  products,
  loading,
  items,
  totalItems,
  totalPrice,
  loadProducts,
  addToCart,
  removeFromCart,
  clearCart,
} from './store'
import { useRenderCount } from '../shared/useRenderCount'

function ProductList() {
  // This component READS .value, so the signals-react transform makes it reactive:
  // it re-renders when products/items change (like a normal component would).
  if (loading.value) return <p>Loading…</p>

  return (
    <div>
      {products.value.map((p) => (
        <div className="product" key={p.id}>
          <span>
            <span className="name">{p.name}</span>
            <span className="price">${p.price}</span>
          </span>
          <span>
            <button className="btn" onClick={() => removeFromCart(p.id)}>−</button>
            <span className="qty">{items.value[p.id] ?? 0}</span>
            <button className="btn" onClick={() => addToCart(p.id)}>+</button>
          </span>
        </div>
      ))}
    </div>
  )
}

function CartSummary() {
  const renders = useRenderCount()

  // This is the "signals as a different model" proof point for the final section.
  // The values update without re-rendering the component itself.
  return (
    <div>
      <div className="summary">
        <span className="totals">
          {totalItems} items · ${totalPrice}
        </span>
        <span className="count flat">Renders: {renders}</span>
      </div>
      <button className="clear" onClick={clearCart}>
        clear cart
      </button>
    </div>
  )
}

export default function SignalsCart() {
  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="panel">
      <h3>⚡ Signals (@preact/signals-react)</h3>
      <ProductList />
      <CartSummary />
      <p className="hint">
        State: module-level <code>signal()</code> / <code>computed()</code>. Update:{' '}
        <code>signal.value = …</code>. Bind a signal directly in JSX and the
        component skips re-rendering entirely.
      </p>
    </div>
  )
}
