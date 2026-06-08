# React State Management Demo

This project is a small React app that compares three different ways to manage shared state:

- Redux Toolkit
- Zustand
- Signals via `@preact/signals-react`

The same cart UI is implemented three ways so you can compare:

- how state is defined
- how components read state
- how updates happen
- how async work is handled
- how each approach affects rendering

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL in your browser and use the three tabs in the app.

## Project structure

- `src/redux/` - Redux Toolkit version
- `src/zustand/` - Zustand version
- `src/signals/` - Signals version
- `src/shared/` - shared data and helpers

## What to look for

Watch the render counter in the UI while you click the cart buttons:

- Redux Toolkit and Zustand update through normal React rendering flows.
- Signals updates the dependent UI more directly, which changes how the render count behaves in the demo.

## Notes

- `StrictMode` is intentionally omitted in development so the render counts stay easy to read.
- The app is designed for a presentation, so the same interaction is repeated across all three approaches.

