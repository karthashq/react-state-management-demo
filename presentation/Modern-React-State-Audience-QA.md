# Modern React State Management — Audience Questions and Answers

## Redux / RTK

**Q: Why not just use Context for everything?**  
A: Context is great for some shared state, but it can become noisy when the app gets larger. Redux gives you a more explicit update model and better tooling for debugging and tracing changes.

**Q: Why did Redux Toolkit become the default recommendation?**  
A: It keeps Redux’s predictability but removes a lot of boilerplate. `createSlice`, `configureStore`, and `createAsyncThunk` make the common path much easier.

**Q: Is Redux still relevant now that newer libraries exist?**  
A: Yes, especially when teams want strong conventions, explicit workflows, and mature tooling. The trade-off is that it is more structured than lighter alternatives.

## Zustand

**Q: Is Zustand just a smaller Redux?**  
A: Not really. It aims for a simpler mental model and less ceremony. You still get shared state and selectors, but the setup is much lighter.

**Q: When would you choose Zustand over Redux Toolkit?**  
A: When the app does not need Redux’s full structure and the team wants a quicker, lower-friction store setup.

**Q: Does Zustand replace React state?**  
A: No. Local state still belongs in React. Zustand is mainly useful when state needs to be shared across parts of the app.

## Signals

**Q: What is the advantage of Signals?**  
A: They can update only the UI pieces that depend on them, which can reduce full component re-renders and give you a more granular update model.

**Q: Is Signals the same thing as a store library?**  
A: No. Signals represent a different reactivity model. That is why they feel different from the usual React state flow.

**Q: Why show `@preact/signals-react` in a React talk?**  
A: It is a practical way to use Signals in React today. The demo uses `@preact/signals-react` plus `@preact/signals-react-transform`.

## Ecosystem

**Q: Why mention Jotai, Recoil, and MobX?**  
A: They are other client-state options worth knowing. They help show that Redux and Zustand are not the only paths.

**Q: Why is TanStack Query separate from the others?**  
A: Because it solves server state and async data fetching. That is a different problem from client state libraries.

## General

**Q: Which one would you use?**  
A: It depends on the team and the problem. My takeaway is to start with the smallest tool that fits the use case, then add structure only when the pain is real.

**Q: Is one approach universally best?**  
A: No. The right choice depends on whether you need structure, low ceremony, or a different reactivity model.

