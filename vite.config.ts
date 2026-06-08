import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The @preact/signals-react-transform Babel plugin makes any component that
// reads `signal.value` automatically reactive. Without it you'd call
// `useSignals()` manually at the top of each component instead.
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['module:@preact/signals-react-transform']],
      },
    }),
  ],
})
