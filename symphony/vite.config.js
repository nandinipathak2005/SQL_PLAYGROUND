// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true, // automatically open browser
//     hmr: {
//       overlay: true, // error overlay
//     },
//   },
//   resolve: {
//     alias: {
//       // Add any path aliases if needed
//       // '@': '/src',
//     },
//   },
//   css: {
//     devSourcemap: true, // helps with CSS debugging
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: true,
//     cssCodeSplit: true,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'lucide-react'],
//         },
//       },
//     },
//   },
// })
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "tailwindcss";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [tailwindcss()],
//     },
//   },

// });
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true, // automatically open browser
//     hmr: {
//       overlay: true, // error overlay
//     },
//   },
//   resolve: {
//     alias: {
//       // Add any path aliases if needed
//       // '@': '/src',
//     },
//   },
//   css: {
//     devSourcemap: true, // helps with CSS debugging
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: true,
//     cssCodeSplit: true,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ['react', 'react-dom', 'lucide-react'],
//         },
//       },
//     },
//   },
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: {}, // Explicitly tell Vite to use PostCSS
//   },
// });
// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from 'tailwindcss';
// import autoprefixer from 'autoprefixer';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   css: {
//     postcss: {
//       plugins: [
//         tailwindcss(),
//         autoprefixer(),
//       ],
//     },
//   },
//   optimizeDeps: {
//     include: [
//       'react',
//       'react-dom',
//       'tailwindcss',
//       'autoprefixer'
//     ],
//   }
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        tailwindcss(),
        autoprefixer(),
        postcssNested()
      ]
    }
  }
});