import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// FIX: Correctly import the 'process' object from the 'node:process' module.
// This provides the necessary types for a Node.js environment, including `process.cwd()`,
// and resolves the runtime error "does not provide an export named 'process'".
import process from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env': env
    },
    // Set the base path for GitHub Pages deployment.
    // This should match the name of your repository.
    base: '/falkom/',
  }
})