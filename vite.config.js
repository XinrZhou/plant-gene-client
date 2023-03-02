import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "~":path.resolve(__dirname,"src")
    }
  },
  server:{
    proxy:{
      '/api': {
        //本地测试
        // target: 'http://localhost:8093',
        //连接远程API接口
        target: 'http://175.178.9.163:8093',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  plugins: [vue()],
})
