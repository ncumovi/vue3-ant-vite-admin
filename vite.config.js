import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    port: 9898,
    open: true,
    proxy: {
      "/service": {
        target: "http://x.x.x.x",
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/service/, "");
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A",
          "link-color": "#1DA57A",
        },
        javascriptEnabled: true,
      },
    },
  },
});
