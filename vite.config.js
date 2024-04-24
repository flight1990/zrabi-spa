import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [
      vue(),
      vuetify({autoImport: true}),
  ],
  rollupOptions: {
    external: ['vuetify', 'lodash'],
    output: {
      globals: {
        vue: 'Vue',
        vuetify: 'Vuetify',
      },
    },
  },
});
