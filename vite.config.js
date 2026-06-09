import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 確保打包路徑為相對路徑，讓 Vercel 能完美抓取 SPA 的路由與靜態記憶檔案
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist', // 告訴 Vercel 編譯後的魔法陣要產在 dist 資料夾
    }
})