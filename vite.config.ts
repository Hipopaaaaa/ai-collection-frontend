import { fileURLToPath, URL } from 'node:url'
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_variable.scss";`,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
      ],
      imports: ["vue", "vue-router", "pinia"],
      dts: './src/auto-import.d.ts'      
  }),
  Components({
    dts: "./src/components.d.ts",
    dirs: ["./src/components"],
    resolvers: [VantResolver()],
}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
