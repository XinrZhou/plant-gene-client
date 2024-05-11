import { defineConfig } from 'vite'
import viteCompression from "vite-plugin-compression"
import externalGlobals from 'rollup-plugin-external-globals'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({command, mode, isSsrBuild, isPreview}) => {
  return {
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src")
    }
  },
  server: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/api': {
        // target: 'http://10.155.120.8:8093',
        // target: 'http://127.0.0.1:8093',
        target: 'http://bioinfor.nefu.edu.cn',
        // target: 'http://124.223.40.46:8093',
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
        // rewrite: (path) => path.replace('/api/', '/PlantASRG/api/')
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
  },
  base: command === 'build' || mode === 'production'
      ? '/PlantASRG/'
      : '/'
  }
})
