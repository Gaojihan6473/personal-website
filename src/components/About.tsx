import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Terminal, Cpu, Database } from 'lucide-react';
import { useStore } from '../store';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { activeSection } = useStore();

  useEffect(() => {
    // Only animate when this section is active
    if (activeSection !== 'about') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          delay: 0.1
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0,
          ease: 'power2.out',
          delay: 0.1
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeSection]);

  return (
    <section id="about" ref={sectionRef} className="h-full w-full flex flex-col justify-start lg:justify-center relative overflow-y-auto py-20 px-6 md:px-12 lg:px-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#38dcf0]/20 to-transparent" />
      
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div ref={contentRef} className="lg:w-1/2">
          <div className="font-mono text-[#38dcf0] tracking-widest text-sm mb-6 uppercase flex items-center gap-4">
            <div className="w-8 h-px bg-[#38dcf0]" />
            数据日志 02
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 uppercase text-white">
            教育与 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38dcf0] to-[#f0a838]">总结</span>
          </h2>
          
          <div className="space-y-6 text-white/70 font-light leading-relaxed text-sm md:text-base">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-[#38dcf0] font-bold mb-2">高等教育</h3>
                <p>
                  <strong>厦门大学 (985/211/双一流)</strong><br/>
                  人口、资源与环境经济学 硕士 (2024.09 - 2027.06)<br/>
                  新闻学 本科 (2020.09 - 2024.06)
                </p>
              </div>
              <div>
                <h3 className="text-[#38dcf0] font-bold mb-2">早期教育</h3>
                <p>
                  <strong>重庆市凤鸣山中学</strong><br/>
                  中学阶段<br/>
                  <strong>重庆市小龙坎小学</strong><br/>
                  小学阶段
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-[#38dcf0] font-bold mb-2">荣誉奖项</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>2019年全国竞技健美操冠军赛年龄二组冠军（国家健将级运动员）</li>
                <li>2023美国大学生数学建模竞赛国际二等奖（建模）</li>
                <li>2023福建省互联网＋创新创业大赛金奖（商业分析）</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 flex gap-4">
            <div className="flex flex-col">
              <span className="text-[#38dcf0] font-mono text-3xl font-bold">3</span>
              <span className="text-xs uppercase tracking-widest text-white/50 mt-1">大厂实习经历</span>
            </div>
            <div className="w-px h-12 bg-white/10 mx-4" />
            <div className="flex flex-col">
              <span className="text-[#38dcf0] font-mono text-3xl font-bold">AI</span>
              <span className="text-xs uppercase tracking-widest text-white/50 mt-1">Native 实践者</span>
            </div>
          </div>
        </div>
        
        <div ref={cardsRef} className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[
            { icon: Terminal, title: 'AI Native 实践者', desc: '熟悉LLM能力边界及RAG、Skills等技术。独立搭建"n8n+Notion"等自动化工作流，实现全网资讯抓取与聚合提效。' },
            { icon: Cpu, title: '核心业务实战', desc: '拥有滴滴、OPPO、美图三段产品实习经历，覆盖商业化、平台生态和O2O等多类业务，对产品设计有洞察与审美。' },
            { icon: Database, title: '复合学科背景', desc: '厦大本硕，新闻学+经济学背景。兼具人文社科的用户同理心与经济学的数据逻辑与商业分析能力。' },
            { icon: Terminal, title: '竞技体育精神', desc: '全国竞技健美操冠军赛冠军，国家健将级运动员。将竞技体育的坚韧、耐心与拼搏精神带入产品打磨中。' },
          ].map((card, i) => (
            <div 
              key={i}
              className="group relative p-6 bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/[0.05] hover:border-[#38dcf0]/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#38dcf0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#38dcf0] to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              
              <card.icon className="w-8 h-8 text-[#38dcf0] mb-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{card.title}</h3>
              <p className="text-sm text-white/50 font-light">{card.desc}</p>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-[#38dcf0] transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-[#38dcf0] transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-[#38dcf0] transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-[#38dcf0] transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
