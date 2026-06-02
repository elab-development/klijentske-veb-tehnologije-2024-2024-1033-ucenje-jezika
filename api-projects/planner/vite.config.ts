import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      // Allow popups (GIS) to talk to their opener
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
});
