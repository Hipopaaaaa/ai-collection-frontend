import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";

import vue from "@vitejs/plugin-vue";
import { ConfigEnv, loadEnv, UserConfig } from "vite";
const CWD = process.cwd();

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_VIEWS_URL, VITE_VIEWS_COMPONENTS_URL } = loadEnv(mode, CWD);
  return {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/_variable.scss";`
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        imports: ["vue", "vue-router", "pinia"],
        dts: "./src/auto-import.d.ts"
      }),
      Components({
        dts: "./src/components.d.ts",
        dirs: [`./src/${VITE_VIEWS_COMPONENTS_URL}`],
        resolvers: [VantResolver()]
      })
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@page":fileURLToPath(new URL(`./src/${VITE_VIEWS_URL}`, import.meta.url)) 
      }
    }
  };
};
