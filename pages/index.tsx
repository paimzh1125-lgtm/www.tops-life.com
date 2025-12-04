import React, { useEffect, useState, Suspense, lazy, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import * as THREE from 'three'; // THREE.js 导入
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, ShieldCheck, Leaf, Settings, Beaker, CheckCircle2 } from 'lucide-react';

/* 保持引用路径不变 */
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

// Lazy component
const RevealText = lazy(() => import('@/components/RevealText'));

/* ----------------------------- PARTICLE BACKGROUND 组件 (已优化) ----------------------------- */
const ParticleBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- Config ---
        const isMobile = window.innerWidth < 768;
        const PARTICLE_COUNT = isMobile ? 1200 : 5000;
        const CANVAS_WIDTH = 200;
        const CANVAS_HEIGHT = 100;
        const CYCLE_DURATION = 20000; // 20s cycle
        const FORM_DURATION = 4000; // 4s hold
        
        // --- Scene Setup ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0f172a, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // --- Particle Logic ---
        const createTextCoordinates = (text: string) => {
            const canvas = document.createElement('canvas');
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            const ctx = canvas.getContext('2d');
            if (!ctx) return [];
            
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px "HarmonyOS Sans", sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

            const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            const data = imageData.data;
            const coords = [];

            for (let y = 0; y < CANVAS_HEIGHT; y += 2) {
                for (let x = 0; x < CANVAS_WIDTH; x += 2) {
                    const i = (y * CANVAS_WIDTH + x) * 4;
                    if (data[i] > 128) {
                        coords.push({
                            x: (x - CANVAS_WIDTH / 2) * 0.5,
                            y: -(y - CANVAS_HEIGHT / 2) * 0.5,
                            z: 0
                        });
                    }
                }
            }
            return coords;
        };

        const textCoords = createTextCoordinates("Tops Life");
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const targets = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        const randoms = new Float32Array(PARTICLE_COUNT * 3);

        const color1 = new THREE.Color('#0F172A');
        const color2 = new THREE.Color('#40C4FF');

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Initial Random Positions
            positions[i * 3] = (Math.random() - 0.5) * 150;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

            if (i < textCoords.length) {
                targets[i * 3] = textCoords[i].x;
                targets[i * 3 + 1] = textCoords[i].y;
                targets[i * 3 + 2] = textCoords[i].z;
            } else {
                targets[i * 3] = (Math.random() - 0.5) * 60;
                targets[i * 3 + 1] = (Math.random() - 0.5) * 40;
                targets[i * 3 + 2] = (Math.random() - 0.5) * 40;
            }

            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            sizes[i] = Math.random() * 2;
            
            randoms[i * 3] = Math.random();
            randoms[i * 3 + 1] = Math.random();
            randoms[i * 3 + 2] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.6,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // --- Interaction & Animation State (优化) ---
        let mouseX = 0;
        let mouseY = 0;
        let time = 0;
        
        // 💥 优化: 使用对象管理进度，避免 @ts-ignore
        const animState = { formProgress: 0 }; 

        const mouseVector = new THREE.Vector3();

        const onMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', onMouseMove);

        // Cycle Logic
        const startCycle = () => {
            setTimeout(() => {
                gsap.to(animState, { // 以 animState 为目标
                    formProgress: 1,
                    duration: 2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(animState, { // 以 animState 为目标
                                formProgress: 0,
                                duration: 2,
                                ease: "power2.inOut",
                            });
                        }, FORM_DURATION);
                    }
                })
            }, 3000);
        };

        const cycleInterval = setInterval(startCycle, CYCLE_DURATION);
        startCycle();

        // --- Animation Loop ---
        const animate = () => {
            time += 0.005;
            const currentFormProgress = animState.formProgress; // 读取当前进度

            const positions = particles.geometry.attributes.position.array as Float32Array;

            mouseVector.set(mouseX * 40, mouseY * 20, 0);

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                
                let px = positions[i3];
                let py = positions[i3 + 1];
                let pz = positions[i3 + 2];

                const tx = targets[i3];
                const ty = targets[i3 + 1];
                const tz = targets[i3 + 2];

                const nx = Math.sin(time + randoms[i3] * 10) * 1.5;
                const ny = Math.cos(time + randoms[i3 + 1] * 10) * 1.5;
                const nz = Math.sin(time + randoms[i3 + 2] * 10) * 1.5;

                const cx = (randoms[i3] - 0.5) * 120 + nx;
                const cy = (randoms[i3+1] - 0.5) * 80 + ny;
                const cz = (randoms[i3+2] - 0.5) * 50 + nz;

                // Interpolate between Cloud and Text
                const dx = cx + (tx - cx) * currentFormProgress;
                const dy = cy + (ty - cy) * currentFormProgress;
                const dz = cz + (tz - cz) * currentFormProgress;

                // Apply movement towards calculated destination
                px += (dx - px) * 0.03;
                py += (dy - py) * 0.03;
                pz += (dz - pz) * 0.03;

                // Mouse Interaction (Vortex/Repel)
                if (currentFormProgress < 0.8) {
                    const dist = Math.sqrt(Math.pow(px - mouseVector.x, 2) + Math.pow(py - mouseVector.y, 2));
                    if (dist < 30) {
                        const force = (30 - dist) / 30;
                        const angle = Math.atan2(py - mouseVector.y, px - mouseVector.x);
                        px += Math.cos(angle + Math.PI / 2) * force * 0.5;
                        py += Math.sin(angle + Math.PI / 2) * force * 0.5;
                        px -= (px - mouseVector.x) * 0.02;
                        py -= (py - mouseVector.y) * 0.02;
                    }
                }

                positions[i3] = px;
                positions[i3 + 1] = py;
                positions[i3 + 2] = pz;
            }

            particles.geometry.attributes.position.needsUpdate = true;
            
            particles.rotation.y = Math.sin(time * 0.1) * 0.1;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        // --- Resize ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            clearInterval(cycleInterval);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            id="particle-bg"
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-gradient-to-b from-[#0F172A] to-[#0d1b2a]"
            aria-hidden="true"
        />
    );
};

/* ----------------------------- 配置 ----------------------------- */
// 确保这里的路径对应 public 文件夹下的真实文件
// 路径已根据您的截图确认: /public/banner/
const rawSlides = [
  { id: 1, image: '/banner/1.jpg' },
  { id: 2, image: '/banner/2.jpg' },
  { id: 3, image: '/banner/3.jpg' },
  { id: 4, image: '/banner/4.jpg' },
  { id: 5, image: '/banner/5.jpg' },
];

const labImage = '/banner/5.jpg';

/* ----------------------------- 文案 ----------------------------- */
const LANG = {
  zh: {
    who: "Who We Are",
    company: "苏州永爱生物科技有限公司",
    intro: "我们是一家以技术为驱动的国家高新技术企业，致力于为全球医疗行业提供安全、可靠的包装解决方案。",
    more: "了解更多",
    values: "核心优势",
    safety: "医疗级安全",
    safetyDesc: "符合最高医疗器械法规要求 (ISO/ASTM)。",
    sustainable: "可持续创新",
    sustainableDesc: "自主研发大豆蛋白生物基材料，引领绿色未来。",
    quality: "极致品质",
    qualityDesc: "ISO 13485 认证 + 万级洁净室 + 全流程可追溯。",
    tech: "卓越的技术实力",
    techDesc: "依托顶级研发团队和先进实验设备，确保每一份产品的品质。",
    lab1: "10万级洁净室生产环境",
    lab2: "高精度全电动注塑设备",
    lab3: "完备的理化、微生物、生物相容性实验室",
    slides: [
      { title: "无菌 • 可靠 • 医疗安全", subtitle: "高性能软包装，为医疗安全提供保障。" },
      { title: "先进注塑成型技术", subtitle: "关键医用部件的精密制造。" },
      { title: "可持续生物材料", subtitle: "环保未来的材料解决方案。" },
      { title: "医疗软包装解决方案", subtitle: "满足全球法规要求的一站式方案。" },
      { title: "绿色生物材料新方向", subtitle: "可降解、可再生、性能优越。" },
    ],
  },
  en: {
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    intro: "A high-tech enterprise focusing on medical packaging, dedicated to providing safe and reliable solutions globally.",
    more: "Learn More",
    values: "Core Strengths",
    safety: "Medical-Grade Safety",
    safetyDesc: "Fully compliant with global medical regulations.",
    sustainable: "Sustainable Innovation",
    sustainableDesc: "Pioneering soy protein materials for a green future.",
    quality: "Ultimate Quality",
    qualityDesc: "ISO 13485 + Cleanroom + Full Traceability.",
    tech: "Technical Excellence",
    techDesc: "Top-level QA and R&D capacity ensuring product quality.",
    lab1: "Class 100,000 Cleanroom",
    lab2: "High-precision electric molding",
    lab3: "Complete laboratory testing system",
    slides: [
      { title: "Sterile • Reliable", subtitle: "High-performance packaging for healthcare." },
      { title: "Injection Molding", subtitle: "Precision for medical components." },
      { title: "Bio Materials", subtitle: "Green future solutions." },
      { title: "Packaging Solutions", subtitle: "Full-service global compliance." },
      { title: "Next-gen Biomaterials", subtitle: "Renewable, biodegradable." },
    ],
  },
};

/* ----------------------------- 辅助组件: 图片加载器 ----------------------------- */
const ImageLoader = ({ src, alt, className, style }: any) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 占位图 / 加载骨架 */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse z-0" />
      )}
      
      {/* 错误回退 */}
      {error && (
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-500 z-0">
          <span>Image Not Found</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={style}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

/* ----------------------------- Slide 组件 ----------------------------- */
const Slide = ({ src, text, idx }: any) => {
  // 不同的缩放时间，增加视觉丰富度
  const animDur = 20 + idx * 2;

  return (
    <SwiperSlide>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        
        {/* 使用 ImageLoader 替换原生 img */}
        <ImageLoader
          src={src}
          alt={text.title}
          className="absolute inset-0 w-full h-full"
          style={{
            animation: `kenZoom ${animDur}s ease-in-out infinite alternate`, // 增加 alternate 让动画更自然
          }}
        />

        {/* 遮罩优化：增加底部渐变，让文字更易读 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 z-10" />

        {/* 文案 */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 md:px-6">
          <div className="max-w-5xl">
            <Suspense fallback={<h1 className="text-white text-4xl md:text-6xl font-bold opacity-0 animate-fade-in">{text.title}</h1>}>
              <div className="overflow-hidden mb-4 md:mb-6">
                <RevealText
                  tag="h1"
                  text={text.title}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg tracking-tight"
                />
              </div>
              <div className="overflow-hidden">
                <RevealText
                  tag="p"
                  text={text.subtitle}
                  delay={0.4}
                  className="text-lg md:text-2xl text-slate-200 font-light max-w-2xl mx-auto"
                />
              </div>
            </Suspense>

            <a 
              href="/about" 
              className="group inline-flex items-center gap-3 mt-10 md:mt-12 text-white bg-white/10 border border-white/20 px-8 py-3 rounded-full backdrop-blur-md hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <span className="font-medium tracking-wide">{text.cta}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

/* ----------------------------- 主页面组件 ----------------------------- */
export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [slides] = useState(rawSlides);
  const containerRef = useRef<HTMLDivElement>(null);

  // 初始化语言
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const l = navigator.language.startsWith('zh') ? 'zh' : 'en';
      setLang(l);
    }
  }, []);

  // 使用 useMemo 获取当前语言包
  const t = useMemo(() => LANG[lang], [lang]);

  /* GSAP 动画 (React 18 Safe) */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 通用淡入上浮动画
      gsap.fromTo(
        '.animate-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.animate-item', // 触发点
            start: 'top 85%',
          },
        }
      );

      // SVG 旋转动画微调
      gsap.to('.animate-spin-slow', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'linear'
      });
      
    }, containerRef);

    return () => ctx.revert(); // 清理动画
  }, [lang]); // 语言切换时重置动画上下文

  return (
    <div ref={containerRef} className="bg-white text-slate-900 overflow-x-hidden">
      
      {/* 💥 解决方案 1: 渲染 ParticleBackground 组件 */}
      <ParticleBackground />

      {/* 注入全局动画样式 (Ken Burns) */}
      <style>{`
        @keyframes kenZoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.15); }
        }
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #40C4FF !important; opacity: 1; scale: 1.2; }
      `}</style>

      {/* 切换语言按钮 (悬浮) */}
      <button
        onClick={() => setLang(prev => prev === 'zh' ? 'en' : 'zh')}
        className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-white/90 text-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm border border-slate-100 flex items-center gap-2 font-medium text-sm"
      >
        <Globe size={18} className="text-[#40C4FF]" />
        <span>{lang === 'zh' ? 'English' : '中文'}</span>
      </button>

      {/* Hero Banner Section */}
      <section className="h-screen w-full relative">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-full w-full"
        >
          {slides.map((s, i) => (
            <Slide 
              key={s.id} 
              // 💥 路径已确认: /banner/1.jpg 等 (在 public 目录下是正确的)
              src={s.image} 
              text={{ ...t.slides[i] || t.slides[0], cta: t.more }} 
              idx={i} 
            />
          ))}
        </Swiper>
      </section>

      {/* Who we are Section */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-item">
          <div className="inline-block px-3 py-1 bg-blue-50 text-[#40C4FF] text-sm font-bold rounded-full tracking-wider uppercase mb-2">
            {t.who}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">{t.company}</h2>
          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#40C4FF] pl-6">
            {t.intro}
          </p>
          <div className="pt-4">
            <a href="/about" className="inline-flex items-center gap-2 text-[#40C4FF] font-bold hover:gap-4 transition-all">
              {t.more} <ArrowRight size={20} />
            </a>
          </div>
        </div>

        <div className="animate-item flex justify-center relative">
          {/* 装饰背景圆 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl -z-10" />
          
          <svg width="100%" height="100%" viewBox="0 0 420 420" className="max-w-[360px] text-[#40C4FF] overflow-visible">
            {/* 静态外圈 */}
            <circle cx="210" cy="210" r="200" strokeWidth="1" stroke="currentColor" opacity=".1" />
            {/* 动态虚线圈 */}
            <circle cx="210" cy="210" r="170" strokeWidth="2" stroke="currentColor" strokeDasharray="10 30" className="animate-spin-slow origin-center" opacity=".6" />
            <circle cx="210" cy="210" r="140" strokeWidth="1" stroke="currentColor" opacity=".2" />
            {/* 中心图标 */}
            <g transform="translate(160, 160)">
              <foreignObject width="100" height="100">
                <div className="w-full h-full flex items-center justify-center text-[#40C4FF]">
                  <Beaker size={80} strokeWidth={1.5} />
                </div>
              </foreignObject>
            </g>
            {/* 漂浮的小圆点装饰 */}
            <circle cx="210" cy="40" r="6" fill="currentColor" className="animate-pulse" />
            <circle cx="380" cy="210" r="4" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
          </svg>
        </div>
      </section>

      {/* Core Strengths Section */}
      <section className="py-24 bg-slate-50">
        <div className="text-center mb-16 animate-item px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.values}</h2>
          <div className="w-20 h-1 bg-[#40C4FF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {[ 
            { Icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
            { Icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
            { Icon: Settings, title: t.quality, desc: t.qualityDesc }
          ].map((item, i) => (
            <div 
              key={i} 
              className="animate-item bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#40C4FF] transition-colors duration-300">
                <item.Icon className="text-[#40C4FF] group-hover:text-white transition-colors duration-300" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Strength Section */}
      <section className="py-24 md:py-32 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-item space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.tech}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{t.techDesc}</p>
            
            <ul className="space-y-5 mt-6">
              {[t.lab1, t.lab2, t.lab3].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-[#40C4FF]/30 transition-colors">
                  <CheckCircle2 className="text-[#40C4FF] shrink-0 mt-0.5" size={24} />
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-item relative order-1 lg:order-2 group">
            <div className="absolute -inset-4 bg-[#40C4FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative shadow-2xl rounded-2xl overflow-hidden aspect-[4/3]">
              <ImageLoader 
                src={labImage} 
                alt="Laboratory" 
                className="w-full h-full hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#40C4FF]/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer Callout (Optional addition) */}
      <section className="py-20 bg-[#0B1120] text-white text-center">
        <div className="max-w-4xl mx-auto px-6 animate-item">
          <h2 className="text-3xl font-bold mb-6">{t.company}</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            {lang === 'zh' ? '致力于生命科学领域的创新与发展' : 'Dedicated to innovation and development in life sciences'}
          </p>
          <a href="/contact" className="inline-block bg-[#40C4FF] text-white px-8 py-3 rounded-full font-bold hover:bg-[#33b1e8] transition-colors">
            {lang === 'zh' ? '联系我们要' : 'Contact Us'}
          </a>
        </div>
      </section>
    </div>
  );
}
```
