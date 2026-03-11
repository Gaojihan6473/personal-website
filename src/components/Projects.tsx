import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink } from 'lucide-react';
import { useStore } from '../store';

const projects = [
  {
    title: 'AI财务管家 - 独立开发',
    description: '个人项目 (2025.12 - 2026.03)。针对记账软件功能臃肿痛点，采用 AI Studio+Claude 协同开发全流程。设计基础架构并引入AI语音记账、财报生成功能。邀请30+用户内测，Prompt调优后语音识别准确率达95%。',
    tech: ['AI Native', 'Prompt调优', '全栈开发', '产品设计'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: '#',
  },
  {
    title: '滴滴出行 - 产品经理',
    description: '平台产品部 (2026.01 - 至今)。负责车主服务洗车列表页改版&评分修正。设计基于评价意愿与字数的加权评分机制，重构门店卡片信息结构。通过AB实验验证，上线后进店CTR提升8%，整体GMV提升4.5%。',
    tech: ['AB实验', 'SQL分析', '策略设计', 'O2O'],
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: '#',
  },
  {
    title: 'OPPO - 产品经理',
    description: '服务生态部 (2025.06 - 2025.09)。负责快应用引擎 menubar 推荐位优化。通过竞品调研和数据分析，设计“历史记录+推荐应用”方案，一期上线后渗透率提升至8.7%，次日留存提升至10.2%。',
    tech: ['竞品调研', 'SQL数据分析', 'MVP策略', '推荐策略'],
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: '#',
  },
  {
    title: '美图 - 商业产品经理',
    description: '影像与设计产品事业群 (2023.10 - 2024.02)。负责美颜相机AI写真商业策略优化及开拍AI数字人收费策略。开启AB实验提升订阅人数15%，制定会员赠送+美豆单购收费模式，海外日均会员新增上涨约25%。',
    tech: ['商业策略', 'AB实验', '原型设计', '用户留存'],
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: '#',
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const { activeSection } = useStore();

  useEffect(() => {
    if (activeSection !== 'projects') return;

    const ctx = gsap.context(() => {
      const cards = projectsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeSection]);

  return (
    <section id="projects" ref={sectionRef} className="h-full w-full flex flex-col justify-start lg:justify-center relative overflow-y-auto py-20 px-6 md:px-12 lg:px-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#38dcf0]/20 to-transparent" />
      
      <div className="font-mono text-[#38dcf0] tracking-widest text-sm mb-6 uppercase flex items-center gap-4">
        <div className="w-8 h-px bg-[#38dcf0]" />
        档案 03
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 uppercase text-white">
        实习 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38dcf0] to-[#f0a838]">经历</span>
      </h2>

      <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 pb-8">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="group relative flex flex-col bg-[#1e201e]/80 backdrop-blur-md border border-white/10 overflow-hidden transition-all duration-500 hover:border-[#38dcf0]/50 hover:shadow-[0_0_30px_rgba(56,220,240,0.15)] flex-1"
          >
            {/* Image Container */}
            <div className="relative h-32 overflow-hidden">
              <div className="absolute inset-0 bg-[#38dcf0]/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#1e201e] to-transparent z-20" />
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col relative z-30">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-[#38dcf0] transition-colors line-clamp-1">{project.title}</h3>
              <p className="text-white/60 font-light text-xs mb-4 flex-1 line-clamp-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[9px] uppercase tracking-widest font-mono text-[#38dcf0] bg-[#38dcf0]/10 border border-[#38dcf0]/20">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 items-center border-t border-white/10 pt-3 mt-auto">
                <span className="text-white/50 flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest">
                  <ExternalLink className="w-3.5 h-3.5" />
                  详细案例
                </span>
              </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-[#38dcf0] transition-colors z-40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-[#38dcf0] transition-colors z-40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-[#38dcf0] transition-colors z-40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-[#38dcf0] transition-colors z-40" />
          </div>
        ))}
      </div>
    </section>
  );
}
