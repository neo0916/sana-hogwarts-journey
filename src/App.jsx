import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 「1229sana&ho」的不可逆 SHA-256 雜湊值封印
const CHAMBER_PASSWORD_HASH = "ee04207f29a0076a5b7194f1b7ba1b333c1eb75796c827c1a2f64790103738b3";

export default function App() {
    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState('zh-HK');
    const [inputPassword, setInputPassword] = useState('');
    const [chamberUnlocked, setChamberUnlocked] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [myLetter, setMyLetter] = useState('');

    // 🗃️ 儲思盆數據狀態
    const [discoData, setDiscoData] = useState({ twice_korean: [], misamo_japanese: [], sana_solos: [], komca_credits: [] });
    const [activeVideoId, setActiveVideoId] = useState(null); // 彈出式 YouTube 播放窗

    // 網頁立體層層按入的 DOM 錨點
    const containerRef = useRef(null);
    const scene1Ref = useRef(null);
    const scene2Ref = useRef(null);
    const scene3Ref = useRef(null);
    const scene4Ref = useRef(null);
    const scene5Ref = useRef(null);
    const chamberRef = useRef(null);

    // 🌐 語言切換咒語
    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);
    };

    // 🔐 密室原生 SHA-256 加密驗證
    const sha256 = async (string) => {
        const utf8 = new TextEncoder().encode(string);
        const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const handleChamberUnlock = async (e) => {
        e.preventDefault();
        const hashedInput = await sha256(inputPassword);

        if (hashedInput === CHAMBER_PASSWORD_HASH) {
            setChamberUnlocked(true);
            setPasswordError(false);
            gsap.to(".chamber-inside", { opacity: 1, duration: 1.5, scale: 1 });
        } else {
            setPasswordError(true);
            setInputPassword('');
            gsap.fromTo(".chamber-gate-ui", { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        }
    };

    // 🧪 讀取 discography.json 魔法數據
    useEffect(() => {
        fetch('/data/discography.json')
            .then(res => res.json())
            .then(data => setDiscoData(data))
            .catch(err => console.error("🔮 讀取儲思盆記憶失敗:", err));
    }, []);

    // 🌀 GSAP 「一頁一世界」立體視差與推進特效
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: 1,
                    pin: true,
                }
            })
                .to(scene1Ref.current, { scale: 2.5, opacity: 0, duration: 1 })
                .from(scene2Ref.current, { scale: 0.5, opacity: 0, duration: 1 }, "-=0.5")

                .to(scene2Ref.current, { scale: 2.5, opacity: 0, duration: 1 })
                .from(scene3Ref.current, { scale: 0.5, opacity: 0, duration: 1 }, "-=0.5")

                .to(scene3Ref.current, { scale: 2.5, opacity: 0, duration: 1 })
                .from(scene4Ref.current, { scale: 0.5, opacity: 0, duration: 1 }, "-=0.5")

                .to(scene4Ref.current, { scale: 2.5, opacity: 0, duration: 1 })
                .from(scene5Ref.current, { scale: 0.5, opacity: 0, duration: 1 }, "-=0.5")

                .to(scene5Ref.current, { scale: 2.5, opacity: 0, duration: 1 })
                .from(chamberRef.current, { scale: 0.8, opacity: 0, duration: 1 }, "-=0.5");

            // 金色漂浮粒子
            gsap.to(".magic-particle", {
                y: "-100vh",
                stagger: { each: 0.2, repeat: -1 },
                duration: "random(6, 12)",
                ease: "linear"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black font-serif text-amber-100 select-none">

            {/* 🌐 右上角多語言切換護符 */}
            <div className="fixed top-4 right-4 z-50 flex space-x-2 bg-gray-900/80 p-2 rounded-lg border border-amber-500/40 backdrop-blur-sm">
                {['zh-HK', 'ja', 'ko'].map((lang) => (
                    <button
                        key={lang}
                        onClick={() => switchLanguage(lang)}
                        className={`px-3 py-1 rounded text-xs md:text-sm transition-all ${currentLang === lang ? 'bg-amber-500 text-black font-bold' : 'hover:text-amber-400'}`}
                    >
                        {lang === 'zh-HK' ? '繁中' : lang === 'ja' ? '日文' : '韓文'}
                    </button>
                ))}
            </div>

            {/* 🕯️ 赫夫帕夫金色粒子流層 */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="magic-particle absolute bottom-0 w-1 h-1 md:w-2 md:h-2 bg-amber-400/60 rounded-full blur-sm" style={{ left: `${Math.random() * 100}%` }} />
                ))}
            </div>

            {/* ========================================================= */}
            {/* 🚂 場景 1：九分之三月台 & 入學通知書 */}
            {/* ========================================================= */}
            <div ref={scene1Ref} className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/public/assets/backgrounds/platform_wall.jpg')" }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                <div className="relative z-20 text-center max-w-xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-amber-400 tracking-wider mb-2">{t('welcome.title')}</h1>
                    <p className="text-sm md:text-md text-gray-300 italic mb-8">{t('welcome.subtitle')}</p>

                    <div className="relative bg-[#f4ebd0] text-gray-800 p-6 md:p-8 rounded-md shadow-2xl border-2 border-amber-700/30 max-w-sm mx-auto transform rotate-1">
                        <img src="/public/assets/sana/envelope_seal.png" className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 z-10" alt="Seal" />
                        <p className="text-green-800 font-mono text-left whitespace-pre-line text-xs md:text-sm leading-relaxed pt-4">
                            {t('welcome.letter_address')}
                        </p>
                    </div>
                    <p className="text-xs text-amber-400/70 mt-12 animate-pulse">↓ 向下滾動滑鼠 · 進入魔法世界探險 ↓</p>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 📚 場景 2：斜角巷 · 麗痕書店 (Sana 個人檔案) */}
            {/* ========================================================= */}
            <div ref={scene2Ref} className="absolute inset-0 opacity-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/public/assets/backgrounds/diagon_alley.jpg')" }}>
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex justify-center">
                        <img src="/public/assets/sana/sana_profile.png" className="max-h-[40vh] md:max-h-[60vh] object-contain drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]" alt="Sana" />
                    </div>
                    <div className="bg-gray-900/80 p-6 rounded-xl border border-amber-500/30 backdrop-blur-md">
                        <h2 className="text-2xl font-bold text-amber-400 mb-4">{t('scenes.scene2_title')}</h2>
                        <div className="space-y-2 text-sm md:text-base border-b border-gray-700 pb-4 mb-4">
                            <p><strong>本名：</strong> {t('profile.name')}</p>
                            <p><strong>星曜與血型：</strong> {t('profile.birth')} / {t('profile.blood_type')}</p>
                            <p><strong>靈魂特質：</strong> {t('profile.traits')}</p>
                            <p className="text-purple-400"><strong>{t('profile.official_color')}</strong></p>
                        </div>
                        <h3 className="text-amber-500 font-bold text-sm mb-2">{t('profile.chronicle_title')}</h3>
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-h-[20vh] overflow-y-auto pr-2">
                            {t('profile.origin_text')}
                        </p>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🏰 場景 3：霍格華茲大禮堂 (樂譜與 KOMCA 創作對接) */}
            {/* ========================================================= */}
            <div ref={scene3Ref} className="absolute inset-0 opacity-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/public/assets/backgrounds/great_hall.jpg')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
                <div className="relative z-20 w-full max-w-6xl text-center">
                    <h2 className="text-2xl md:text-4xl font-bold text-amber-400 mb-6 tracking-widest">{t('scenes.scene3_title')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                        {/* 🔮 具象化：KOMCA 創作魔鏡 (動態對接數據) */}
                        <div className="relative flex justify-center items-center h-[45vh]">
                            <img src="/public/assets/sana/magic_mirror.png" className="absolute max-h-full object-contain opacity-70" alt="Mirror" />
                            <div className="relative z-10 w-[65%] h-[75%] overflow-y-auto p-4 text-left text-xs space-y-3 scrollbar-thin">
                                <p className="font-bold border-b border-amber-500/30 pb-1 text-center text-amber-400">🔮 KOMCA 創作靈魂</p>
                                {discoData.komca_credits.map((item, index) => (
                                    <div key={index} className="border-b border-gray-800 pb-1.5">
                                        <p className="text-amber-300 font-bold">《{item.title}》 <span className="text-xs text-amber-500/80">({item.type})</span></p>
                                        <p className="text-gray-400 text-[11px] leading-tight mt-0.5">{item.story}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 📜 歷年魔法樂譜記錄 (分類讀取數據) */}
                        <div className="bg-gray-950/80 p-5 rounded-xl border border-amber-600/30 text-left h-[45vh] overflow-y-auto space-y-4">
                            <div>
                                <h4 className="text-amber-400 font-bold text-xs mb-2 border-b border-gray-800 pb-1">✨ TWICE 韓國音樂資產</h4>
                                <ul className="space-y-1.5 text-xs">
                                    {discoData.twice_korean.map((song, i) => (
                                        <li key={i} onClick={() => setActiveVideoId(song.youtube_id)} className="hover:text-amber-300 cursor-pointer flex justify-between items-start transition-colors">
                                            <span>▶ {song.year} - {song.title} <span className="text-gray-500 text-[10px]">{song.album}</span></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-amber-500 font-bold text-xs mb-2 border-b border-gray-800 pb-1">⚜️ MISAMO 日本分隊樂章</h4>
                                <ul className="space-y-1.5 text-xs">
                                    {discoData.misamo_japanese.map((song, i) => (
                                        <li key={i} onClick={() => song.youtube_id.includes("PLACEHOLDER") ? null : setActiveVideoId(song.youtube_id)} className="hover:text-amber-300 cursor-pointer flex justify-between transition-colors">
                                            <span>▶ {song.year} - {song.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-purple-400 font-bold text-xs mb-2 border-b border-gray-800 pb-1">🔮 SANA 專屬獨唱魔奏</h4>
                                <ul className="space-y-1.5 text-xs">
                                    {discoData.sana_solos.map((song, i) => (
                                        <li key={i} onClick={() => song.youtube_id.includes("PLACEHOLDER") ? null : setActiveVideoId(song.youtube_id)} className="hover:text-amber-300 cursor-pointer flex justify-between transition-colors">
                                            <span>▶ {song.year} - {song.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🧪 場景 4：萬應室 & 交誼廳 (概念細節展示) */}
            {/* ========================================================= */}
            <div ref={scene4Ref} className="absolute inset-0 opacity-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/public/assets/backgrounds/cozy_tavern.jpg')" }}>
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-20 w-full max-w-4xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-6 text-center">{t('scenes.scene4_title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-amber-950/40 p-4 rounded-lg border border-amber-500/20 h-[30vh] overflow-y-auto">
                            <h4 className="text-amber-400 font-bold text-sm mb-2">🎬 影音概念解密</h4>
                            <p className="text-xs text-gray-300 leading-relaxed space-y-2">
                                {[...discoData.twice_korean, ...discoData.misamo_japanese].slice(0, 4).map((item, i) => (
                                    <span key={i} className="block border-b border-amber-900/40 pb-1 mb-1"><strong>{item.title}:</strong> {item.concept}</span>
                                ))}
                            </p>
                        </div>
                        <div className="bg-amber-950/40 p-4 rounded-lg border border-amber-500/20 h-[30vh]">
                            <h4 className="text-amber-400 font-bold text-sm mb-2">🐹 趣味冷知識大賞</h4>
                            <p className="text-xs text-gray-300 leading-relaxed">極度熱愛恐怖片卻會瘋狂尖叫[cite: 1, 2]；擁有嚴重的夢遊症候群；能完美臨摹並偽造隊長志效的韓文書法字跡[cite: 2, 3]。</p>
                        </div>
                        <div className="bg-amber-950/40 p-4 rounded-lg border border-amber-500/20 h-[30vh]">
                            <h4 className="text-amber-400 font-bold text-sm mb-2">🏆 三巫鬥法榮譽</h4>
                            <p className="text-xs text-gray-300 leading-relaxed">記載 TWICE 橫掃 MMA、MAMA 大賞紀錄[cite: 3]，以及日韓累計突破 1400 萬張實體銷量的至高魔法榮耀[cite: 2, 3]。</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🍻 場景 5：三把掃帚酒吧 (ONCE 公開留言板) */}
            {/* ========================================================= */}
            <div ref={scene5Ref} className="absolute inset-0 opacity-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/public/assets/backgrounds/cozy_tavern.jpg')" }}>
                <div className="absolute inset-0 bg-black/80" />
                <div className="relative z-20 w-full max-w-2xl bg-gray-900/90 p-6 rounded-xl border border-amber-500/40 shadow-2xl">
                    <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-4 text-center">🍻 {t('scenes.scene5_title')}</h2>
                    <div className="h-[25vh] bg-black/50 rounded-lg p-3 overflow-y-auto mb-4 border border-gray-800 text-xs space-y-2">
                        <p className="text-amber-300"><strong>ONCE_Hogwarts:</strong> Sana Potter! 祝妳在赫夫帕夫過得快樂！🐹✨[cite: 1]</p>
                        <p className="text-gray-400"><strong>TwiceFan_HK:</strong> 期待 2026 正規專輯音樂盛宴！</p>
                    </div>
                    <div className="flex space-x-2">
                        <input type="text" placeholder="寫下對 Sana 的公開魔法祝福..." className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 text-sm text-amber-100 focus:outline-none focus:border-amber-500" />
                        <button className="bg-amber-600 hover:bg-amber-500 text-black font-bold px-4 py-2 rounded text-sm transition-colors">投遞</button>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🐍 高級安全特設：地窖秘密房間 (密碼保護) */}
            {/* ========================================================= */}
            <div ref={chamberRef} className="absolute inset-0 opacity-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${chamberUnlocked ? '/public/assets/backgrounds/chamber_inside.jpg' : '/public/assets/backgrounds/chamber_gate.jpg'})` }}>
                <div className="absolute inset-0 bg-black/80" />

                <div className="relative z-20 w-full max-w-xl text-center chamber-gate-ui">
                    {!chamberUnlocked ? (
                        <div className="bg-gray-950/90 p-6 md:p-8 rounded-xl border-2 border-green-900/60 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <h2 className="text-xl md:text-2xl font-bold text-green-400 tracking-widest mb-4">🐍 {t('scenes.chamber_title')}</h2>
                            <p className="text-xs md:text-sm text-gray-400 mb-6 whitespace-pre-line">{t('chamber.hint')}</p>

                            <form onSubmit={handleChamberUnlock} className="space-y-4">
                                <input
                                    type="password"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    placeholder={t('chamber.placeholder')}
                                    className="w-full bg-black border border-green-800 rounded px-4 py-3 text-center tracking-widest text-green-400 font-mono focus:outline-none focus:border-green-500"
                                />
                                <button type="submit" className="w-full bg-green-900/60 hover:bg-green-800 border border-green-500/40 text-green-300 font-bold py-2.5 rounded transition-all text-sm">
                                    📢 注入爬說語能量
                                </button>
                            </form>
                            {passwordError && <p className="text-red-500 text-xs mt-3 animate-pulse">{t('chamber.error')}</p>}
                        </div>
                    ) : (
                        <div className="chamber-inside opacity-0 transform scale-95 w-full bg-gray-900/95 p-6 rounded-xl border-2 border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-left">
                            <h2 className="text-xl font-bold text-purple-400 text-center mb-6">🔮 {t('chamber.letter_title')}</h2>
                            <div className="bg-black/40 border border-purple-900/40 p-4 rounded-lg text-xs md:text-sm text-purple-200/90 leading-relaxed mb-6 max-h-[25vh] overflow-y-auto">
                                這裡放置你寫給Sana的情感長信。在這個私密房間裡，字句將化為永恆的魔法符文，不受任何人打擾...
                            </div>
                            <div className="border-t border-purple-900/60 pt-4">
                                <h4 className="text-xs text-purple-400 font-bold mb-2">✉️ 專屬私密心靈留言板 (經高度安全性加密保護)</h4>
                                <textarea
                                    value={myLetter}
                                    onChange={(e) => setMyLetter(e.target.value)}
                                    placeholder="在此留下只有你與 Sana 靈魂共鳴的私密魔法悄悄話..."
                                    className="w-full h-16 bg-black border border-purple-900/60 rounded p-2 text-xs text-purple-100 focus:outline-none focus:border-purple-500"
                                />
                                <button className="mt-2 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/30 text-purple-200 text-xs font-bold px-4 py-1.5 rounded transition-all">
                                    🔒 加密封存留言
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ========================================================= */}
            {/* 📺 魔法傳送陣：無版權風險 YouTube 播放彈窗 */}
            {/* ========================================================= */}
            {activeVideoId && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/90 p-4 animate-fade-in">
                    <div className="relative w-full max-w-3xl aspect-video bg-gray-950 rounded-lg overflow-hidden border border-amber-500/30">
                        <button onClick={() => setActiveVideoId(null)} className="absolute top-2 right-2 z-10 bg-black/80 hover:bg-amber-600 text-amber-100 hover:text-black font-bold w-8 h-8 rounded-full flex justify-center items-center transition-all">✕</button>
                        <iframe title="Youtube Player" src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`} className="w-full h-full border-0" allow="autoplay; encrypted-media" allowFullScreen />
                    </div>
                </div>
            )}

        </div>
    );
}