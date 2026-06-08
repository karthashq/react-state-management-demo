import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  loadProducts,
  addToCart,
  removeFromCart,
  clearCart,
  selectProducts,
  selectLoading,
  selectItems,
  selectTotalItems,
  selectTotalPrice,
} from './cartSlice'
import { useRenderCount } from '../shared/useRenderCount'

function ProductList() {
  // This mirrors the "define / read / update" story from the slides.
  const dispatch = useAppDispatch()
  const products = useAppSelector(selectProducts)
  const loading = useAppSelector(selectLoading)
  const items = useAppSelector(selectItems)

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
            <button className="btn" onClick={() => dispatch(removeFromCart(p.id))}>−</button>
            <span className="qty">{items[p.id] ?? 0}</span>
            <button className="btn" onClick={() => dispatch(addToCart(p.id))}>+</button>
          </span>
        </div>
      ))}
    </div>
  )
}

function CartSummary() {
  // This is the render-count proof point for the Redux section of the talk.
  const renders = useRenderCount()
  const totalItems = useAppSelector(selectTotalItems)
  const totalPrice = useAppSelector(selectTotalPrice)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className="summary">
        <span className="totals">
          {totalItems} items · ${totalPrice}
        </span>
        <span className="count climbs">Renders: {renders}</span>
      </div>
      <button className="clear" onClick={() => dispatch(clearCart())}>
        clear cart
      </button>
    </div>
  )
}

function Loader() {
  // Async flow stays inside Redux Toolkit's thunk layer.
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])
  return null
}

export default function ReduxCart() {
  // Redux needs a <Provider> wrapping the tree.
  return (
    <Provider store={store}>
      <div className="panel">
        <h3>🟣 Redux Toolkit</h3>
        <Loader />
        <ProductList />
        <CartSummary />
        <p className="hint">
          Store: <code>configureStore</code> + <code>createSlice</code>. Read:{' '}
          <code>useSelector</code>. Update: <code>dispatch(action)</code>. Async:{' '}
          <code>createAsyncThunk</code>.
        </p>
      </div>
    </Provider>
  )
}
