# Modern React State Management — Code Walkthrough Cues

Use this alongside the live app during the presentation.

## RTK section

Cover these files in order:

1. `src/redux/store.ts`
   - Point out `configureStore`.
   - Mention that it wires the reducer and gives you good defaults.
   - Call out that Redux still wants a central store, even with RTK.

2. `src/redux/cartSlice.ts`
   - Show `createSlice`.
   - Explain that reducers look mutable, but Immer keeps the updates safe.
   - Mention `createAsyncThunk` for loading products.
   - Call out selectors like `selectTotalItems` and `selectTotalPrice`.

3. `src/redux/ReduxCart.tsx`
   - Show `useAppSelector` for reading state.
   - Show `dispatch(addToCart(id))` for updates.
   - Mention the `<Provider>` wrapper.
   - Point to the render counter and explain that Redux still re-renders the summary when the selected state changes.

4. Live demo
   - Open the Redux tab.
   - Click `+` and `−`.
   - Point at the quantity changing and the render counter climbing.
   - Mention that the app behavior is predictable, but the update flow still goes through React rendering.

## Zustand section

Cover these files in order:

1. `src/zustand/store.ts`
   - Show `create((set) => ({ ... }))`.
   - Explain that state and actions live together.
   - Mention that async is just a normal `async` function.
   - Point out the selectors at the bottom for totals.

2. `src/zustand/ZustandCart.tsx`
   - Show `useCartStore(selector)` for reads.
   - Show actions like `addToCart` and `clearCart`.
   - Mention that there is no provider wrapper.
   - Point to the render counter and explain that the behavior is still React-driven, just with less ceremony.

3. Live demo
   - Switch to Zustand.
   - Repeat the same click pattern.
   - Compare the shape of the store and how quickly you can understand it.
   - Keep the emphasis on simplicity and lower setup cost.

## Signals section

Cover these files in order:

1. `src/signals/store.ts`
   - Show the module-level `signal()` values.
   - Explain `computed()` for derived values.
   - Point out that `loadProducts` and the cart mutations are just plain functions.

2. `src/signals/SignalsCart.tsx`
   - Show how the component binds signals directly in JSX.
   - Explain that this is the part that changes the render behavior.
   - Mention the package names used in React: `@preact/signals-react` and `@preact/signals-react-transform`.

3. Live demo
   - Switch to Signals.
   - Click the cart controls.
   - Show that the summary can update more granularly.
   - Point at the render counter staying low and connect that back to the different reactivity model.

## What to mention explicitly

- Redux Toolkit reduces boilerplate, but keeps Redux structure.
- Zustand removes ceremony and feels more like a plain hook-based store.
- Signals are not just another store; they change how updates flow through the UI.
- TanStack Query belongs in server state / data fetching, not the same bucket as client state libraries.
- Jotai, Recoil, and MobX are other client-state libraries worth knowing.

