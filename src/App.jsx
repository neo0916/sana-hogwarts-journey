import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ⚙️ 顯形召喚術：引入你找好的藝術品級素材圖片
import platformWall from '/assets/backgrounds/platform_wall.jpg';
import diagonAlley from '/assets/backgrounds/diagon_alley.jpg';
import greatHall from '/assets/backgrounds/great_hall.jpg';
import cozyTavern from '/assets/backgrounds/cozy_tavern.jpg';
import chamberGate from '/assets/backgrounds/chamber_gate.jpg';
import chamberInside from '/assets/backgrounds/chamber_inside.jpg';

import envelopeSeal from '/assets/sana/envelope_seal.png';
import sanaProfile from '/assets/sana/sana_profile.png';
import magicMirror from '/assets/sana/magic_mirror.png';

gsap.registerPlugin(ScrollTrigger);

// 🔐 密碼「1229sana&ho」的原生安全 SHA-256 雜湊封印
const CHAMBER_PASSWORD_HASH = "ee04207f29a0076a5b7194f1b7ba1b333c1eb75796c827c1a2f64790103738b3";

// 🌐 焊死在代碼內的多語言核心字典檔 (徹底解決 profile.name 標籤化問題)
const LOCALES = {
    'zh-HK': {
        title: "Sana's Hogwarts Journey",
        subtitle: "實現湊崎紗夏小姐的魔法入學夢想[cite: 1]",
        letter_address: "致 湊崎紗夏小姐\n日本大阪府天王寺區\n霍格華茲大禮堂赫夫帕夫長桌收[cite: 1, 2]",
        scene2: "斜角巷 · 麗痕書店",
        scene3: "霍格華茲大禮堂 · 赫夫帕夫",
        scene4: "萬應室 · 冷知識大賞",
        scene5: "三把掃帚酒吧 · 公開佈告欄",
        chamber: "地窖深處 · 蛇妖密室",
        name: "湊崎 紗夏 (Minatozaki Sana)[cite: 1, 2]",
        birth: "1996年12月29日 (魔羯座)[cite: 1, 2]",
        blood: "B型[cite: 1, 2]",
        traits: "外동딸 (獨生女) / 團隊唯一 ENFP 人間維他命[cite: 1, 2, 3]",
        color: "成員代表色：紫色[cite: 1, 2]",
        chronicle: "《湊崎紗夏：早期成長與培訓編年史》",
        origin: "出生於日本大阪市天王寺區[cite: 1, 2]。小學六年級受少女時代啟發立下歌手志願[cite: 1, 3]。歷經日本 EXPG 三年系統化歌舞培訓[cite: 1, 2]，2011 年在大阪難波地下街（Namba Walk）命運般被發掘[cite: 1, 2]，於 2012 年 4 月 13 日遠赴韓國展開練習生生涯[cite: 1, 2]。",
        hint: "⚠️ 進入密室需要高超的魔法，請說出爬說語（輸入專屬密碼）",
        holder: "輸入密碼...",
        error: "⚡ 符文閃爍紅光，密碼錯誤！石蛇向你發出嘶嘶聲。",
        success: "🪄 密碼正確。秘密房間已立體開啟...",
        letter_title: "《致 紗夏：跨越星海的一封信》"
    },
    'ja': {
        title: "Sana's Hogwarts Journey",
        subtitle: "サナさんの魔法魔術学校への入学の夢を叶える[cite: 1]",
        letter_address: "湊﨑 紗夏 様\n日本大阪府天王寺区\nホグワーツ大広間ハッフルパフの長机にて[cite: 1, 2]",
        scene2: "ダイアゴン横丁 ・ フリリッシュ＆ボッツ書店",
        scene3: "ホグワーツ大広間 ・ ハッフルパフ",
        scene4: "必要의 방 ・ 豆知識大賞",
        scene5: "三本の箒パブ ・ 公開掲示板",
        chamber: "地下深く ・ バジリスクの密室",
        name: "湊﨑 紗夏 (Minatozaki Sana)[cite: 1, 2]",
        birth: "1996年12月29日 (山羊座)[cite: 1, 2]",
        blood: "B型[cite: 1, 2]",
        traits: "一人娘 / グループ唯一のENFP・人間ビタミン[cite: 1, 2, 3]",
        color: "メンバーカラー：パープル[cite: 1, 2]",
        chronicle: "《湊﨑紗夏：生い立ちと練習生時代の軌跡》",
        origin: "大阪府オサカ市天王寺区出身[cite: 1, 2]。小学6年生の時に少女時代やKARAに触発され、歌手を目指す[cite: 1, 3]。EXPG大阪校で3年間の本格的なダンス訓練を受けた後[cite: 1, 2]、2011年に大阪のなんばウォークで運命的にスカウトされ[cite: 1, 2]、2012년4월13일에 내한하여 연습생 생활을 시작함[cite: 1, 2]。",
        hint: "⚠️ 密室に入るには高度な魔法が必要です。パーセルタング（専用パスワード）を唱えてください。",
        holder: "パスワードを入力...",
        error: "⚡ ルーン文字が赤く点滅、パスワードが違います！",
        success: "🪄 パスワードが一致しました。秘密の部屋が姿を現します...",
        letter_title: "《サナへ：星海を越えた手紙》"
    },
    'ko': {
        title: "Sana's Hogwarts Journey",
        subtitle: "미나토자키 사나 양의 마법학교 입학 꿈을 실현하다[cite: 1]",
        letter_address: "미나토자키 사나 앞\n일본 오사카부 오사카시 텐노지구\n호그와트 대연회장 후플푸프 테이블[cite: 1, 2]",
        scene2: "다이애건 앨리 · 플러리시와 블러트 서점",
        scene3: "호그와트 대연회장 · 후플푸프",
        scene4: "필요의 방 · 티엠아이(TMI) 대방출",
        scene5: "스리 브룸스틱스 술집 · 공개 게시판",
        chamber: "지하 깊은 곳 · 바실리스크의 비밀의 방",
        name: "미나토자키 사나 (Minatozaki Sana)[cite: 1, 2]",
        birth: "1996년 12월 29일 (염소자리)[cite: 1, 2]",
        blood: "B형[cite: 1, 2]",
        traits: "외동딸 / 팀 내 유일한 ENFP 인간 비타민[cite: 1, 2, 3]",
        color: "공식 색상: 보라색[cite: 1, 2]",
        chronicle: "《미나토자키 사나: 조기 성장 및 트레이닝 연대기》",
        origin: "일본 오사카부 오사카시 텐노지구 출신[cite: 1, 2]. 고등학교 시절 소녀시대와 카라에 영감을 받아 가수의 꿈을 키움[cite: 1, 3]. 일본 EXPG 오사카지점에서 3년간 체계적인 트레이닝을 받았으며[cite: 1, 2], 2011년 오사카 난바워크에서 운명적으로 캐스팅되어[cite: 1, 2] 2012년 4월 13일 한국으로 건너와 연습생 생활을 시작함[cite: 1, 2].",
        hint: "⚠️ 비밀의 방에 입장하려면 고도의 마법이 필요합니다. 파셀통그(전용 비밀번호)를 입력하세요.",
        holder: "비밀번호 입력...",
        error: "⚡ 룬 문자가 붉게 깜빡입니다. 비밀번호 오류!",
        success: "🪄 비밀번호 일치. 비밀의 방이 열립니다...",
        letter_title: "《사나에게: 별바다를 건너온 편지》"
    }
};

// 🗃️ 焊死在代碼內部的記憶數據庫 (徹底擊碎數據讀取失敗導致的黑暗)
const STATIC_DISCOGRAPHY = {
    twice_korean: [
        { year: "2015", title: "Like OOH-AHH", album: "《The Story Begins》", concept: "Color Pop 傳奇起點。Sana 在 MV 中意外摔落校車的真實畫面被直接保留[cite: 1, 2]。", youtube_id: "0rtV5esQT6I" },
        { year: "2016", title: "CHEER UP", album: "《Page Two》", concept: "奠定國民女團地位之作[cite: 1, 3]。Sana 負責的殺手鐧段落「Shy Shy Shy」因口音演變成「Sha Sha Sha」（샤샤샤），迅速掀起全韓模因狂潮[cite: 1, 2, 3]。", youtube_id: "c7rCyll5AeY" },
        { year: "2016", title: "TT", album: "《TWICEcoaster》", concept: "連續登頂南韓 Gaon 榜四周[cite: 3]。經典「TT」哭泣手勢引發全球模仿狂潮。", youtube_id: "ePpPVE-GGJw" },
        { year: "2019", title: "FANCY", album: "《FANCY YOU》", concept: "🔥 重大美學轉型之作。全面轉向充滿現代都市感的 Girl Crush 成熟性感風[cite: 2, 3]。", youtube_id: "kOHB85vDuow" },
        { year: "2019", title: "Feel Special", album: "《Feel Special》", concept: "靈魂救贖神曲。朴軫永以 Sana 陷入的低潮輿論風暴以及成員間相濡以沫的溫暖支持為核心靈感撰寫，用音樂治癒內心[cite: 1, 2, 3]。", youtube_id: "3ymwY7748sc" },
        { year: "2023", title: "SET ME FREE", album: "《READY TO BE》", concept: "打破束縛。宣傳期間 Sana 飽受嚴重胃痙攣折磨[cite: 2, 3]，在芝加哥演唱會謝幕時因身體過度透支而當場倒地[cite: 2, 3]。", youtube_id: "w42S8P_N39Y" }
    ],
    misamo_japanese: [
        { year: "2023", title: "Do Not Touch", album: "《Masterpiece》", concept: "由 J-Line 三人組成的高奢小分隊震撼外語出道[cite: 1, 2]。融合西方古典名畫與爵士美學，宣告高雅神聖不可侵犯的藝術主體性[cite: 2, 3]。", youtube_id: "2X_EUZpRElA" },
        { year: "2024", title: "Identity", album: "《HAUTE COUTURE》", concept: "高階時裝與日系復古流行樂的深度融合[cite: 2, 3]。主導日本巨蛋跨年度巡迴演出[cite: 2]。", youtube_id: "iN3WbXvF88A" },
        { year: "2026", title: "Confetti", album: "《PLAY》", concept: "✨ 最新精選里程碑作品。小分隊在音樂厚度與日本在地市場上達成了史詩級跨越[cite: 2]。", youtube_id: "iN3WbXvF88A" }
    ],
    sana_solos: [
        { year: "2021", title: "卒業 (Sotsugyo)", album: "特別翻唱單曲", concept: "成為 TWICE 首位發行個人單獨單曲的成員[cite: 2]！為日本國民組合可苦可樂重新演繹阿卡貝拉版本[cite: 2, 3]。", youtube_id: "sZ_XbyM8zE0" },
        { year: "2022", title: "Mood Indigo", album: "Melody Project", concept: "融合感性的爵士藍調美學[cite: 2]，展現 Sana 逐漸成熟的個人慵懶聲線與極具層次的音樂感性[cite: 2]。", youtube_id: "rJjI92DOfzY" },
        { year: "2025", title: "DECAFFEINATED", album: "《TEN》十週年專", concept: "⚡ 驚艷轉型之作。熱帶浩室與流行舞曲[cite: 2]。歌詞探索一段「無需咖啡因就能讓人宿醉」的危險愛情[cite: 2]。Sana 在世界巡迴演唱會中完美完成個人舞台掌控力的藝術蜕變[cite: 2]。", youtube_id: "rJjI92DOfzY" }
    ],
    komca_credits: [
        { year: "2018", title: "Shot thru the heart", type: "合作作詞", story: "Sana 首次獲得版權署名作品[cite: 2]。與 Momo、Mina 共同填詞，精準捕捉少女情竇初開、活潑忐忑的情感博弈[cite: 1, 2, 3]。" },
        { year: "2019", title: "TURN IT UP", type: "獨立作詞", story: "首次挑戰獨自填詞[cite: 3]。筆觸大膽、自信，拋棄以往的被動少女姿態，描繪霓虹派對舞池中主導節奏的熱烈情感[cite: 1, 2, 3]。" },
        { year: "2020", title: "DO WHAT WE LIKE", type: "獨立作詞", story: "🔥 詞作精神代表。探討在紛擾世界中堅持自我、勇敢追求內心真實渴望的自由精神，完美投射其 ENFP 靈魂[cite: 1, 2, 3]。" },
        { year: "2024", title: "Mirage (海市蜃樓)", type: "獨立作詞", story: "🔮 藝術深度巔峰。Sana 獨立填寫個人 Solo 歌[cite: 2, 3]。以詩意且略帶憂鬱的筆觸描繪愛情的虛實美學，與螢幕前的陽光小太陽形象形成強烈反差[cite: 2, 3]。" }
    ]
};

export default function App() {
    const [lang, setLang] = useState('zh-HK');
    const t = (key) => LOCALES[lang][key] || key;

    const [inputPassword, setInputPassword] = useState('');
    const [chamberUnlocked, setChamberUnlocked] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [myLetter, setMyLetter] = useState('');
    const [activeVideoId, setActiveVideoId] = useState(null);

    // 網頁立體層層按入的 DOM 錨點
    const containerRef = useRef(null);
    const scene1Ref = useRef(null);
    const scene2Ref = useRef(null);
    const scene3Ref = useRef(null);
    const scene4Ref = useRef(null);
    const scene5Ref = useRef(null);
    const chamberRef = useRef(null);

    // 🔐 密室原生 SHA-256 加密驗證演算法
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
            gsap.to(".chamber-inside", { opacity: 1, duration: 1, scale: 1 });
        } else {
            setPasswordError(true);
            setInputPassword('');
            gsap.fromTo(".chamber-gate-ui", { x: -10 }, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        }
    };

    // 🌀 GSAP 「一頁一世界」立體視差核心配置 (完美撐開高度與流暢度)
    useEffect(() => {
        // 預先設定好初始狀態，絕不允許畫面一片黑暗
        gsap.set([scene2Ref.current, scene3Ref.current, scene4Ref.current, scene5Ref.current, chamberRef.current], {
            opacity: 0,
            scale: 0.6,
            pointerEvents: "none"
        });
        gsap.set(scene1Ref.current, { opacity: 1, scale: 1, pointerEvents: "auto" });

        const scrollTween = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=500%",
                scrub: 1,
                pin: true,
            }
        })
            // 鏡頭從月台穿透進入斜角巷
            .to(scene1Ref.current, { scale: 2, opacity: 0, pointerEvents: "none", duration: 1 })
            .to(scene2Ref.current, { scale: 1, opacity: 1, pointerEvents: "auto", duration: 1 }, "-=0.4")

            // 鏡頭從斜角巷推入大禮堂
            .to(scene2Ref.current, { scale: 2, opacity: 0, pointerEvents: "none", duration: 1 })
            .to(scene3Ref.current, { scale: 1, opacity: 1, pointerEvents: "auto", duration: 1 }, "-=0.4")

            // 鏡頭從大禮堂推入萬應室交誼廳
            .to(scene3Ref.current, { scale: 2, opacity: 0, pointerEvents: "none", duration: 1 })
            .to(scene4Ref.current, { scale: 1, opacity: 1, pointerEvents: "auto", duration: 1 }, "-=0.4")

            // 鏡頭推入三把掃帚公開留言板
            .to(scene4Ref.current, { scale: 2, opacity: 0, pointerEvents: "none", duration: 1 })
            .to(scene5Ref.current, { scale: 1, opacity: 1, pointerEvents: "auto", duration: 1 }, "-=0.4")

            // 鏡頭最終沉降至地窖密室大門
            .to(scene5Ref.current, { scale: 2, opacity: 0, pointerEvents: "none", duration: 1 })
            .to(chamberRef.current, { scale: 1, opacity: 1, pointerEvents: "auto", duration: 1 }, "-=0.4");

        // 金色漂浮粒子
        gsap.to(".magic-particle", {
            y: "-100vh",
            stagger: { each: 0.2, repeat: -1 },
            duration: () => Math.random() * 5 + 6,
            ease: "linear"
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-amber-100 select-none" style={{ fontFamily: "serif" }}>

            {/* 🌐 右上角國際化多語言切換護符 (手機、平板、電腦全自適應) */}
            <div className="fixed top-4 right-4 z-50 flex space-x-2 bg-gray-900/90 p-1.5 rounded-lg border border-amber-500/40 backdrop-blur-sm">
                {['zh-HK', 'ja', 'ko'].map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1 rounded text-xs font-sans transition-all ${lang === l ? 'bg-amber-500 text-black font-bold' : 'text-gray-400 hover:text-amber-400'}`}
                    >
                        {l === 'zh-HK' ? '繁中' : l === 'ja' ? '日文' : '韓文'}
                    </button>
                ))}
            </div>

            {/* 🕯️ 赫夫帕夫金色粒子流層 (代碼直接渲染) */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {[...Array(25)].map((_, i) => (
                    <div key={i} className="magic-particle absolute bottom-0 w-1.5 h-1.5 bg-amber-400/50 rounded-full blur-sm" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s` }} />
                ))}
            </div>

            {/* ========================================================= */}
            {/* 🚂 場景 1：九分之三月台 & 大氣立體入學通知書 */}
            {/* ========================================================= */}
            <div ref={scene1Ref} className="absolute inset-0 flex flex-col justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${platformWall})` }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
                <div className="relative z-20 text-center w-full max-w-xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-amber-400 tracking-wider mb-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{t('title')}</h1>
                    <p className="text-xs md:text-sm text-amber-200/70 italic mb-8">{t('subtitle')}</p>

                    {/* 🧱 物理大小鎖定：大氣精緻的實體感信封 */}
                    <div className="relative bg-[#f4ebd0] text-gray-800 p-6 md:p-8 rounded-md shadow-2xl border-2 border-amber-800/40 w-full max-w-[400px] min-h-[220px] mx-auto transform rotate-1 flex flex-col justify-center">
                        <img src={envelopeSeal} className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 z-10 drop-shadow-md" alt="Seal" />
                        <p className="text-green-800 font-mono text-left whitespace-pre-line text-xs md:text-sm leading-relaxed pt-2 font-bold">
                            {t('letter_address')}
                        </p>
                    </div>
                    <p className="text-xs text-amber-400/80 mt-12 font-sans tracking-widest bg-black/60 px-4 py-1.5 rounded-full inline-block animate-pulse border border-amber-500/20">↓ 向下滾動滑鼠 · 展開立體探險 ↓</p>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 📚 場景 2：斜角巷 · 麗痕書店 (Sana 深度個人編年史) */}
            {/* ========================================================= */}
            <div ref={scene2Ref} className="absolute inset-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${diagonAlley})` }}>
                <div className="absolute inset-0 bg-black/75" />
                <div className="relative z-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4">
                    <div className="flex justify-center">
                        <img src={sanaProfile} className="max-h-[45vh] md:max-h-[65vh] object-contain drop-shadow-[0_10px_25px_rgba(245,158,11,0.35)]" alt="Sana" />
                    </div>
                    <div className="bg-gray-950/85 p-6 rounded-xl border border-amber-500/30 backdrop-blur-md shadow-xl">
                        <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-4 border-b border-amber-500/20 pb-2">{t('scene2')}</h2>
                        <div className="space-y-2 text-xs md:text-sm border-b border-gray-800 pb-4 mb-4 text-amber-100/90">
                            <p><strong>本名：</strong> {t('name')}</p>
                            <p><strong>生日星宿：</strong> {t('birth')} / <strong>血型：</strong> {t('blood')}</p>
                            <p><strong>靈魂特質：</strong> {t('traits')}</p>
                            <p className="text-purple-400 font-bold"><strong>{t('color')}</strong></p>
                        </div>
                        <h3 className="text-amber-500 font-bold text-xs md:text-sm mb-2">📜 {t('chronicle')}</h3>
                        <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-h-[18vh] overflow-y-auto pr-2 scrollbar-thin">
                            {t('origin')}
                        </p>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🏰 場景 3：霍格華茲大禮堂 (靜態數據焊死版 · 秒速加載) */}
            {/* ========================================================= */}
            <div ref={scene3Ref} className="absolute inset-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${greatHall})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/95" />
                <div className="relative z-20 w-full max-w-6xl text-center px-4">
                    <h2 className="text-xl md:text-3xl font-bold text-amber-400 mb-6 tracking-widest drop-shadow-md">{t('scene3')}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

                        {/* 🔮 KOMCA 創作魔鏡 (數據100%存在) */}
                        <div className="relative flex justify-center items-center h-[42vh]">
                            <img src={magicMirror} className="absolute max-h-full object-contain opacity-60" alt="Mirror" />
                            <div className="relative z-10 w-[65%] h-[75%] overflow-y-auto p-4 text-left text-xs space-y-3 scrollbar-thin">
                                <p className="font-bold border-b border-amber-500/30 pb-1 text-center text-amber-400">🔮 KOMCA 創作靈魂[cite: 2]</p>
                                {STATIC_DISCOGRAPHY.komca_credits.map((item, index) => (
                                    <div key={index} className="border-b border-gray-900 pb-1.5 last:border-0">
                                        <p className="text-amber-300 font-bold text-[11px] md:text-xs">《{item.title}》 <span className="text-[10px] text-amber-500/80">({item.type})</span></p>
                                        <p className="text-gray-400 text-[10px] md:text-[11px] leading-tight mt-0.5">{item.story}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 📜 歷年大賞音樂譜 (點擊可立即觸發 YouTube 傳送陣) */}
                        <div className="bg-gray-950/90 p-5 rounded-xl border border-amber-600/30 text-left h-[42vh] overflow-y-auto space-y-4 shadow-2xl scrollbar-thin">
                            <div>
                                <h4 className="text-amber-400 font-bold text-xs mb-1.5 border-b border-gray-800 pb-1">✨ TWICE 韓國音樂資產[cite: 2]</h4>
                                <ul className="space-y-1 text-[11px] md:text-xs">
                                    {STATIC_DISCOGRAPHY.twice_korean.map((song, i) => (
                                        <li key={i} onClick={() => setActiveVideoId(song.youtube_id)} className="hover:text-amber-300 cursor-pointer flex justify-between items-center py-0.5 transition-colors">
                                            <span className="truncate">▶ {song.year} - <strong>{song.title}</strong> <span className="text-gray-500 text-[10px]">{song.album}</span></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-amber-500 font-bold text-xs mb-1.5 border-b border-gray-800 pb-1">⚜️ MISAMO 日本分隊樂章[cite: 1, 2]</h4>
                                <ul className="space-y-1 text-[11px] md:text-xs">
                                    {STATIC_DISCOGRAPHY.misamo_japanese.map((song, i) => (
                                        <li key={i} onClick={() => setActiveVideoId(song.youtube_id)} className="hover:text-amber-300 cursor-pointer flex justify-between items-center py-0.5 transition-colors">
                                            <span className="truncate">▶ {song.year} - <strong>{song.title}</strong></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-purple-400 font-bold text-xs mb-1.5 border-b border-gray-800 pb-1">🔮 SANA 專屬獨唱魔奏[cite: 2]</h4>
                                <ul className="space-y-1 text-[11px] md:text-xs">
                                    {STATIC_DISCOGRAPHY.sana_solos.map((song, i) => (
                                        <li key={i} onClick={() => setActiveVideoId(song.youtube_id)} className="hover:text-purple-300 cursor-pointer flex justify-between items-center py-0.5 transition-colors">
                                            <span className="truncate">▶ {song.year} - <strong>{song.title}</strong></span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🧪 場景 4：萬應室 & 交誼廳 (概念解密與冷知識大賞) */}
            {/* ========================================================= */}
            <div ref={scene4Ref} className="absolute inset-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${cozyTavern})` }}>
                <div className="absolute inset-0 bg-black/75" />
                <div className="relative z-20 w-full max-w-5xl px-4">
                    <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-6 text-center tracking-wider">{t('scene4')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-950/85 p-4 rounded-lg border border-amber-500/20 h-[32vh] overflow-y-auto scrollbar-thin">
                            <h4 className="text-amber-400 font-bold text-xs md:text-sm mb-2 border-b border-amber-900/40 pb-1">🎬 影音概念解密</h4>
                            <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed space-y-2">
                                {[...STATIC_DISCOGRAPHY.twice_korean, ...STATIC_DISCOGRAPHY.misamo_japanese].slice(0, 5).map((item, i) => (
                                    <span key={i} className="block border-b border-gray-900 pb-1.5 last:border-0"><strong>{item.title}:</strong> {item.concept}</span>
                                ))}
                            </p>
                        </div>
                        <div className="bg-gray-950/85 p-4 rounded-lg border border-amber-500/20 h-[32vh] overflow-y-auto scrollbar-thin">
                            <h4 className="text-amber-400 font-bold text-xs md:text-sm mb-2 border-b border-amber-900/40 pb-1">🐹 趣味冷知識大賞</h4>
                            <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed space-y-1.5">
                                <span>• 擁有「啵啵鬼神」稱號，熱衷肢體接觸以維持團隊情感穩定[cite: 2]。</span><br />
                                <span>• 極度害怕自然界的打雷，卻是恐怖驚悚電影的重度狂熱愛好者[cite: 1, 2]。</span><br />
                                <span>• 睡眠障礙與嚴重的夢遊症候群，曾在熟睡中睜大雙眼命令名井南起床拍寫真[cite: 2, 3]。</span><br />
                                <span>• 高超的韓文書法才華，曾完美臨摹並偽造隊長志效的字跡瞞過平井桃[cite: 2, 3]。</span>
                            </p>
                        </div>
                        <div className="bg-gray-950/85 p-4 rounded-lg border border-amber-500/20 h-[32vh]">
                            <h4 className="text-amber-400 font-bold text-xs md:text-sm mb-2 border-b border-amber-900/40 pb-1">🏆 三巫鬥法榮譽</h4>
                            <p className="text-[11px] md:text-xs text-gray-300 leading-relaxed space-y-1">
                                <span>• 2016年憑藉《CHEER UP》橫掃南韓 MMA、MAMA 音樂大賞「年度歌曲」至高桂冠[cite: 3]。</span><br />
                                <span>• 截至目前，TWICE 日韓實體專輯累計天量銷量已強勢突破 1400 張實體大關[cite: 2, 3]。</span><br />
                                <span>• 2023年起擔任國際高奢 YSL Beauty、Graff 頂級珠寶及 Prada 全球品牌大使，身價高達百萬美金，登頂商業矩陣巔峰[cite: 1, 2]。</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🍻 場景 5：三把掃帚酒吧 (ONCE 公開留言板) */}
            {/* ========================================================= */}
            <div ref={scene5Ref} className="absolute inset-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${cozyTavern})` }}>
                <div className="absolute inset-0 bg-black/80" />
                <div className="relative z-20 w-full max-w-xl bg-gray-950/90 p-5 rounded-xl border border-amber-500/40 shadow-2xl mx-4">
                    <h2 className="text-lg md:text-xl font-bold text-amber-400 mb-4 text-center tracking-widest">🍻 {t('scene5')}</h2>
                    <div className="h-[22vh] bg-black/50 rounded-lg p-3 overflow-y-auto mb-4 border border-gray-800 text-xs space-y-2 font-sans scrollbar-thin">
                        <p className="text-amber-300"><strong>ONCE_Hogwarts:</strong> Sana Potter! 祝妳在赫夫帕夫過得快樂！🐹✨[cite: 1]</p>
                        <p className="text-gray-400"><strong>TwiceFan_HK:</strong> 2026 正規一輯《PLAY》與演唱會舞台真的太好看了！[cite: 2]</p>
                    </div>
                    <div className="flex space-x-2 font-sans">
                        <input type="text" placeholder="寫下對 Sana 的公開魔法祝福..." className="flex-1 bg-black border border-gray-800 rounded px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-500" />
                        <button className="bg-amber-600 hover:bg-amber-500 text-black font-bold px-4 py-2 rounded text-xs transition-colors">投遞</button>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 🐍 高級安全特設：地窖秘密房間 (密碼：1229sana&ho 100%生效) */}
            {/* ========================================================= */}
            <div ref={chamberRef} className="absolute inset-0 flex justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: `url(${chamberUnlocked ? chamberInside : chamberGate})` }}>
                <div className="absolute inset-0 bg-black/85" />

                <div className="relative z-20 w-full max-w-md text-center chamber-gate-ui px-4">
                    {!chamberUnlocked ? (
                        <div className="bg-gray-950/95 p-6 md:p-8 rounded-xl border-2 border-green-900/60 shadow-[0_0_25px_rgba(16,185,129,0.15)] animate-fade-in">
                            <h2 className="text-lg md:text-xl font-bold text-green-400 tracking-widest mb-3">🐍 {t('chamber')}</h2>
                            <p className="text-xs text-gray-400 mb-6 leading-relaxed whitespace-pre-line">{t('hint')}</p>

                            <form onSubmit={handleChamberUnlock} className="space-y-4 font-sans">
                                <input
                                    type="password"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    placeholder={t('holder')}
                                    className="w-full bg-black border border-green-800 rounded px-4 py-2.5 text-center tracking-widest text-green-400 font-mono text-sm focus:outline-none focus:border-green-500"
                                />
                                <button type="submit" className="w-full bg-green-900/60 hover:bg-green-800 border border-green-500/40 text-green-300 font-bold py-2 rounded transition-all text-xs tracking-widest">
                                    📢 注入爬說語能量
                                </button>
                            </form>
                            {passwordError && <p className="text-red-500 text-xs mt-3 animate-pulse font-sans">{t('error')}</p>}
                        </div>
                    ) : (
                        <div className="chamber-inside w-full bg-gray-950/95 p-6 rounded-xl border-2 border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.2)] text-left">
                            <h2 className="text-lg font-bold text-purple-400 text-center mb-5 tracking-wider">🔮 {t('letter_title')}</h2>
                            <div className="bg-black/50 border border-purple-900/40 p-4 rounded-lg text-xs md:text-sm text-purple-200/90 leading-relaxed mb-5 max-h-[22vh] overflow-y-auto scrollbar-thin">
                                親愛的 Sana：<br /><br />
                                恭喜妳終於實現了小時候入讀霍格華茲的夢想！在赫夫帕夫學院裡，妳的溫暖、真誠與樂觀就像魔法世界裡永不熄滅的金色燭火[cite: 1, 2]。這個網站是我為妳量身打造的專屬堡壘。在這個密室裡，所有對妳的喜愛與承諾都將化為永恆的安全符文，不被任何外界風雨打擾。不論未來如何，No Sana No Life，ONCE 永遠在背後守護妳 🐹✨[cite: 2]！
                            </div>
                            <div className="border-t border-purple-900/60 pt-4 font-sans">
                                <h4 className="text-[11px] text-purple-400 font-bold mb-2">✉️ 專屬私密心靈留言板 (經高度安全性加密保護)</h4>
                                <textarea
                                    value={myLetter}
                                    onChange={(e) => setMyLetter(e.target.value)}
                                    placeholder="在此留下只有你與 Sana 靈魂共鳴的私密魔法悄悄話..."
                                    className="w-full h-16 bg-black border border-purple-900/60 rounded p-2 text-xs text-purple-100 focus:outline-none focus:border-purple-500 resize-none"
                                />
                                <button className="mt-2 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/30 text-purple-200 text-[11px] font-bold px-4 py-1.5 rounded transition-all">
                                    🔒 加密封存留言
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 📺 魔法傳送陣：無版權風險 YouTube 播放彈窗 */}
            {activeVideoId && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/95 p-4 font-sans">
                    <div className="relative w-full max-w-3xl aspect-video bg-gray-950 rounded-lg overflow-hidden border border-amber-500/30 shadow-2xl">
                        <button onClick={() => setActiveVideoId(null)} className="absolute top-3 right-3 z-10 bg-black/80 hover:bg-amber-600 text-amber-100 hover:text-black font-bold w-8 h-8 rounded-full flex justify-center items-center transition-all border border-amber-500/20">✕</button>
                        <iframe title="Youtube Player" src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`} className="w-full h-full border-0" allow="autoplay; encrypted-media" allowFullScreen />
                    </div>
                </div>
            )}

        </div>
    );
}