import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🧭 這是 2026 年最穩定的 Vite + Tailwind 標準編譯配置
export default defineConfig({
    plugins: [react()],
    base: './',
    css: {
        postcss: './postcss.config.js' // 🔑 強制 Vite 在打包時必須讀取 PostCSS 樣式配方！
    },
    build: {
        outDir: 'dist'
    }
})