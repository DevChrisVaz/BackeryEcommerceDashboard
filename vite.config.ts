import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from "dotenv";
import { resolve } from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': Object.keys(process.env).reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {}),
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
})
