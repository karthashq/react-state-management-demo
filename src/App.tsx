import { useState } from 'react'
import ReduxCart from './redux/ReduxCart'
import ZustandCart from './zustand/ZustandCart'
import SignalsCart from './signals/SignalsCart'

const TABS = {
  redux: 'Redux Toolkit',
  zustand: 'Zustand',
  signals: 'Signals',
} as const
type Tab = keyof typeof TABS

export default function App() {
  const [tab, setTab] = useState<Tab>('redux')

  return (
    <div className="app">
      <h1>One cart, three engines</h1>
      <p className="sub">
        Identical UI. Watch the “Renders” badge on the summary as you click + / −.
      </p>

      <div className="tabs">
        {(Object.keys(TABS) as Tab[]).map((key) => (
          <button
            key={key}
            className={`tab ${tab === key ? 'active' : ''}`}
            onClick={() => setTab(key)}
          >
            {TABS[key]}
          </button>
        ))}
      </div>

      {/* Only mount the active engine so each demo starts from the same baseline. */}
      {tab === 'redux' && <ReduxCart />}
      {tab === 'zustand' && <ZustandCart />}
      {tab === 'signals' && <SignalsCart />}
    </div>
  )
}
