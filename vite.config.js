
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base:
    // eslint-disable-next-line no-undef
    process.env.GITHUB_ACTIONS === 'true'
      ? '/REACT_SHOE_1/'
      : '/',
})

