import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { keycloakify } from 'keycloakify/vite-plugin';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    keycloakify({
      themeName: 'keycloakify-starter-svelte',
      accountThemeImplementation: 'Multi-Page',
    }),
  ],
});
