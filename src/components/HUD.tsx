import { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

export function HUD() {
  const [time, setTime] = useState(new Date());
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    // Fake FPS counter for effect
    const fpsTimer = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 5));
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(fpsTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 opacity-70 mix-blend-screen text-[#38dcf0] font-mono text-xs tracking-widest uppercase">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span>希卡终端 v1.0.4</span>
          <span>{time.toLocaleTimeString()}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span>环境温度: 22°C</span>
          <span>神庙感应器: 开启</span>
        </div>
      </div>

      {/* Crosshair / Center Reticle (Optional, maybe too intrusive, let's keep it subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] border border-[#38dcf0]/10 rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-[#38dcf0]/40 rounded-full" />
        <div className="absolute top-0 w-px h-4 bg-[#38dcf0]/30" />
        <div className="absolute bottom-0 w-px h-4 bg-[#38dcf0]/30" />
        <div className="absolute left-0 h-px w-4 bg-[#38dcf0]/30" />
        <div className="absolute right-0 h-px w-4 bg-[#38dcf0]/30" />
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
          <div className="w-8 h-1 bg-[#38dcf0]/50" />
          <div className="w-4 h-1 bg-[#38dcf0]/30" />
          <div className="w-2 h-1 bg-[#38dcf0]/10" />
        </div>
        <div className="text-right">
          <span>安全连接已建立</span>
          <div className="w-full h-px bg-gradient-to-r from-transparent to-[#38dcf0]/60 mt-1" />
        </div>
      </div>
    </div>
  );
}
