import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const skillCategories = [
  {
    title: '专业技能',
    skills: [
      { name: 'AI工作流设计 (n8n/Coze)', level: 95 },
      { name: 'MySQL 数据分析', level: 90 },
      { name: 'Python 数据分析', level: 80 },
      { name: 'Figma / Xmind', level: 85 },
    ]
  },
  {
    title: '语言与综合素质',
    skills: [
      { name: '英语 (雅思 6.5)', level: 80 },
      { name: '商业分析', level: 90 },
      { name: '用户洞察', level: 90 },
      { name: '策略设计', level: 85 },
    ]
  },
  {
    title: '兴趣与荣誉',
    skills: [
      { name: '竞技健美操 (国家健将级)', level: 95 },
      { name: '羽毛球 (校赛第三)', level: 85 },
      { name: '烹饪 (川菜小厨)', level: 85 },
      { name: '摄影', level: 80 },
    ]
  }
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = document.querySelectorAll('.skill-bar-fill');
      
      gsap.fromTo(
        bars,
        { width: 0 },
        {
          width: (i, target) => target.getAttribute('data-level') + '%',
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.3
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="h-full w-full relative flex flex-col justify-start lg:justify-center overflow-y-auto py-20 px-6 md:px-12 lg:px-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#38dcf0]/20 to-transparent" />
      
      <div className="font-mono text-[#38dcf0] tracking-widest text-sm mb-6 uppercase flex items-center gap-4">
        <div className="w-8 h-px bg-[#38dcf0]" />
        规格 04
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 uppercase text-white">
        技术 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38dcf0] to-[#f0a838]">武器库</span>
      </h2>

      <div ref={barsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="flex flex-col gap-8">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">
              {category.title}
            </h3>
            
            <div className="flex flex-col gap-6">
              {category.skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-sm uppercase tracking-wider text-white/80">{skill.name}</span>
                    <span className="font-mono text-xs text-[#38dcf0]">{skill.level}%</span>
                  </div>
                  
                  <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                    <div 
                      className="skill-bar-fill absolute top-0 left-0 h-full bg-gradient-to-r from-[#38dcf0]/50 to-[#38dcf0] shadow-[0_0_10px_rgba(56,220,240,0.5)]"
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    />
                    {/* Grid overlay for tech feel */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cGF0aCBkPSJNMCAwTDAgNE0yIDBMMiA0IiBzdHJva2U9InJnYmEoMCwwLDAsMC4zKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-50 mix-blend-overlay" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
