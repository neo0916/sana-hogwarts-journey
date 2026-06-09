import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // 引入樣式

// 初始化多語言配置（簡易本地擋載入）
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        'zh-HK': { translation: {} }, // 這裡會由 public/locales 自動接管
    },
    lng: 'zh-HK',
    fallbackLng: 'zh-HK',
    interpolation: { escapeValue: false }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)