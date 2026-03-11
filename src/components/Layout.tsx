import { ReactNode } from 'react';
import { Scene } from './Scene';
import { HUD } from './HUD';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative w-screen bg-[#1e201e] text-[#f5f5f0] overflow-hidden font-sans selection:bg-[#38dcf0]/30 selection:text-white" style={{ height: '100dvh' }}>
      <Scene />
      <HUD />
      <Navigation />

      <main className="relative z-10 w-screen h-full">
        {children}
      </main>
    </div>
  );
}
