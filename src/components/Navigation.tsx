import { useStore } from '../store';
import { cn } from '../utils/cn';

const navItems = [
  { id: 'hero', label: '01. 起源' },
  { id: 'about', label: '02. 探索' },
  { id: 'projects', label: '03. 冒险日志' },
  { id: 'skills', label: '04. 符文能力' },
  { id: 'contact', label: '05. 建立联络' },
];

export function Navigation() {
  const { activeSection, setActiveSection } = useStore();

  const scrollTo = (id: string) => {
    setActiveSection(id);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-start">
      {/* Minimalist Spaceship HUD container - 线条风科技感 */}
      <div className="relative flex items-center bg-[#0a0a0a]/40 backdrop-blur-md border-b border-white/10 px-8 py-3">
        {/* 底部科技感线条 - 渐变发光效果 */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#38dcf0]/60 to-transparent" />
        {/* 线条左端发光点 */}
        <div className="absolute bottom-0 left-0 w-16 h-[1px] bg-gradient-to-r from-[#38dcf0]/80 to-transparent" />
        {/* 线条右端发光点 */}
        <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-gradient-to-l from-[#f0a838]/80 to-transparent" />
        {/* 底部中间装饰点 */}
        <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-1 h-[2px] bg-[#38dcf0] rounded-full shadow-[0_0_8px_#38dcf0]" />

        <div className="flex items-center gap-8 mx-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="group relative flex flex-col items-center gap-1 transition-all duration-300"
            >
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300",
                  activeSection === item.id ? "text-[#38dcf0] font-bold drop-shadow-[0_0_5px_rgba(56,220,240,0.5)]" : "text-white/40 hover:text-white/80"
                )}
              >
                {item.label}
              </span>
              
              {/* Active indicator */}
              <div
                className={cn(
                  "absolute -bottom-2 w-1 h-1 rounded-full transition-all duration-300",
                  activeSection === item.id ? "bg-[#38dcf0] shadow-[0_0_5px_#38dcf0] scale-100" : "bg-white/20 scale-0 group-hover:scale-100"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
