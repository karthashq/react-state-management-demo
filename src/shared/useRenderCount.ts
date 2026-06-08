import { useRef } from 'react'

// Increments once per actual component render. We display this on screen so the
// audience can SEE which engines re-render the component and which don't.
export function useRenderCount(): number {
  const renders = useRef(0)
  renders.current += 1
  return renders.current
}
