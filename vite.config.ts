import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const ConfigeProxy = () => ({
  target: "http://192.168.39.3:8083",
  changeOrigin: true,
  secure: false,
  onProxyRes: (proxyRes: any) => {
    proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
    proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type";
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), svgr()],
    server: {
      open: true,
      host: true,
      proxy: {
        "/api": ConfigeProxy(),
        "/api/v1": {
          target: "http://192.168.39.3:8083",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
// production : "http://192.168.39.3:8084"
// test : "http://192.168.39.3:8083"
// main : "https://cloud.raymand.net"
