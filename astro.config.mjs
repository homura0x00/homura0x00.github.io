// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://homura0x00.github.io',
  integrations: [react({
    experimentalReactChildren: true,
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});