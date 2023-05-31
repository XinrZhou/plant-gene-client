import { defineConfig } from 'vite'
import viteCompression from "vite-plugin-compression"
import externalGlobals from 'rollup-plugin-external-globals'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        //本地测试
        // target: 'http://localhost:8093/',
        //连接远程API接口
        target: 'http://124.223.40.46:8093',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [
    vue(),
    viteCompression({
      ext: ".gz",
      deleteOriginFile: false
    })
  ],
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus', 'pinia', 'vue-demi', 'echarts', 'gsap'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          pinia: 'Pinia',
          'vue-router': 'VueRouter',
          'vue-demi': 'VueDemi',
          echarts: 'echarts',
          gsap: 'gsap'
        }),
      ],
    }
  }
})
