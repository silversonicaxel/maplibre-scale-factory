import { dirname, resolve } from 'path';
import { copyFileSync } from 'fs';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function copyCss(src: string, dest: string) {
  return {
    name: 'copy-css',
    closeBundle() {
      copyFileSync(src, dest);
    },
  };
}

export default defineConfig({
  plugins: [
    copyCss(resolve(__dirname, 'src/index.css'), resolve(__dirname, 'dist/maplibre-scale-factory.css')),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'maplibre-scale-factory',
      formats: ['es', 'umd'],
      name: 'MapLibreScaleFactory',
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['maplibre-gl'],
      output: {
        globals: {
          'maplibre-gl': 'maplibregl',
        },
      },
    },
    sourcemap: true,
  },
});
