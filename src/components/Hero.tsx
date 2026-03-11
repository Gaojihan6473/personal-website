import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { setActiveSection, hasVisitedIntro, setHasVisitedIntro } = useStore();

  const handleExplore = () => {
    setHasVisitedIntro(true);
  };

  useEffect(() => {
    if (!hasVisitedIntro) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, delay: 0.3 }
    )
    .fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=1'
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.8'
    );

    const title = titleRef.current;
    if (title) {
      title.addEventListener('mouseenter', () => {
        gsap.to(title, {
          x: "random(-5, 5)",
          y: "random(-5, 5)",
          duration: 0.05,
          yoyo: true,
          repeat: 5,
          onComplete: () => {
            gsap.to(title, { x: 0, y: 0, duration: 0.1 });
          }
        });
      });
    }
  }, [hasVisitedIntro]);

  return (
    <section id="hero" className="h-screen w-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-12 lg:px-20">
      {/* 初始状态：开始探索按钮 */}
      <AnimatePresence>
        {!hasVisitedIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <button
              ref={buttonRef}
              onClick={handleExplore}
              className="group relative px-16 py-6 text-[#38dcf0] font-[family-name:var(--font-orbitron)] text-2xl tracking-[0.4em] uppercase transition-all duration-500 ease-out hover:text-white"
            >
              <span className="relative z-10">开始探索</span>
              {/* 悬浮光效 - 简洁版 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#38dcf0]/0 via-[#38dcf0]/10 to-[#38dcf0]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg scale-90" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 原有内容 - 点击后显示 */}
      <AnimatePresence>
        {hasVisitedIntro && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl z-10"
          >
            <div className="font-mono text-[#38dcf0] tracking-widest text-sm mb-6 uppercase flex items-center gap-4">
              <div className="w-8 h-px bg-[#38dcf0]" />
              系统已唤醒
            </div>

            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#f5f5f0] via-[#f5f5f0] to-[#f5f5f0]/50"
              style={{ textShadow: '0 0 40px rgba(56, 220, 240, 0.3)' }}
            >
              高季晗<br />
              <span className="text-[#38dcf0]">产品经理</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-12"
            >
              厦门大学本硕，新闻学与经济学复合背景。兼具人文社科的用户同理心与经济学的数据逻辑与商业分析能力。拥有滴滴、OPPO、美图等多段核心业务产品实战经验，同时也是一名 AI Native 实践者与国家健将级运动员。
            </p>

            <div ref={ctaRef} className="flex gap-6 items-center">
              <button
                onClick={() => setActiveSection('projects')}
                className="group relative px-8 py-4 bg-[#38dcf0]/10 border border-[#38dcf0]/30 text-[#38dcf0] font-mono uppercase tracking-widest text-sm transition-all hover:bg-[#38dcf0]/20 hover:border-[#38dcf0] hover:shadow-[0_0_20px_rgba(56,220,240,0.4)] overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                探索日志
              </button>

              <button
                onClick={() => setActiveSection('contact')}
                className="px-8 py-4 text-white/60 font-mono uppercase tracking-widest text-sm transition-all hover:text-white"
              >
                建立联络
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Indicator - 只在显示内容后显示 */}
      {hasVisitedIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#38dcf0]">滚动切换</span>
          <ChevronDown className="w-4 h-4 text-[#38dcf0]" />
        </motion.div>
      )}
    </section>
  );
}
