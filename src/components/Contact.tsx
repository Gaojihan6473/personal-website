import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="h-full w-full relative flex flex-col justify-center overflow-y-auto py-20 px-6 md:px-12 lg:px-20">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#38dcf0]/20 to-transparent" />
      
      <div className="font-mono text-[#38dcf0] tracking-widest text-sm mb-6 uppercase flex items-center gap-4">
        <div className="w-8 h-px bg-[#38dcf0]" />
        通讯 05
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 uppercase text-white">
        建立 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38dcf0] to-[#f0a838]">联络</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col gap-12">
          <p className="text-white/60 font-light leading-relaxed">
            准备好在下一个数字体验中合作了吗？启动安全连接，讨论项目参数、时间表和技术要求。
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white/[0.02] border border-white/10 group-hover:border-[#38dcf0]/50 transition-colors">
                <Mail className="w-5 h-5 text-[#38dcf0] opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">加密信箱</span>
                <span className="text-white group-hover:text-[#38dcf0] transition-colors">941422581@qq.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white/[0.02] border border-white/10 group-hover:border-[#38dcf0]/50 transition-colors">
                <MapPin className="w-5 h-5 text-[#38dcf0] opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">当前坐标</span>
                <span className="text-white group-hover:text-[#38dcf0] transition-colors">厦门 / 深圳</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 flex items-center justify-center bg-white/[0.02] border border-white/10 group-hover:border-[#38dcf0]/50 transition-colors">
                <Phone className="w-5 h-5 text-[#38dcf0] opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">通讯频率</span>
                <span className="text-white group-hover:text-[#38dcf0] transition-colors">13320206473</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={formRef} className="flex flex-col justify-center items-center relative min-h-[400px] opacity-60 hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-[0.5px] border-[#38dcf0]/20 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 border-[0.5px] border-dashed border-[#f0a838]/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
            <div className="absolute inset-12 border-[0.5px] border-[#38dcf0]/10 rounded-full animate-[spin_15s_linear_infinite]" />
            
            {/* Inner pulsing core */}
            <div className="w-32 h-32 bg-[#38dcf0]/5 rounded-full flex items-center justify-center blur-sm animate-pulse">
              <div className="w-16 h-16 bg-gradient-to-br from-[#38dcf0] to-[#f0a838] rounded-full opacity-20 blur-md" />
            </div>
            
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[#38dcf0] rounded-full shadow-[0_0_10px_#38dcf0] animate-ping" />
            <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-[#f0a838] rounded-full shadow-[0_0_10px_#f0a838] animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 left-[12%] w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_5px_white] animate-ping" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
