/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { useStore } from './store';
import { AnimatePresence, motion } from 'framer-motion';

const sections = ['hero', 'about', 'projects', 'skills', 'contact'];

export default function App() {
  const { activeSection, setActiveSection } = useStore();
  const isScrolling = useRef(false);
  const prevSectionRef = useRef(activeSection);

  // 移动端：切换页面时滚动到内容开始位置
  useEffect(() => {
    const scrollToContentStart = () => {
      // 获取当前页面的 section 元素并滚动到其开始位置
      const section = document.querySelector(`#${activeSection}`);
      if (section) {
        section.scrollTop = 0;
      }
      // 同时确保 window 也在顶部
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const isMobile = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (isMobile()) {
      // 延迟执行，确保DOM渲染完成
      setTimeout(() => {
        scrollToContentStart();
      }, 50);

      // 再次延迟确保动画完成后滚动
      setTimeout(() => {
        scrollToContentStart();
      }, 100);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      let target = e.target as HTMLElement | null;
      let canScroll = false;
      let isAtTop = true;
      let isAtBottom = true;

      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        if (
          target.scrollHeight > target.clientHeight &&
          (style.overflowY === 'auto' || style.overflowY === 'scroll')
        ) {
          canScroll = true;
          isAtTop = target.scrollTop <= 0;
          isAtBottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) <= 1;
          break;
        }
        target = target.parentElement;
      }

      const direction = e.deltaY > 0 ? 1 : -1;

      if (canScroll) {
        if ((direction === -1 && !isAtTop) || (direction === 1 && !isAtBottom)) {
          return; // Allow normal scrolling
        }
      }

      const currentIndex = sections.indexOf(activeSection);
      let nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        isScrolling.current = true;
        setActiveSection(sections[nextIndex]);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1200); // Debounce scroll
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    // 检测是否为移动端（触摸设备且屏幕宽度小于1024px）
    const isMobile = () => {
      return 'ontouchstart' in window && window.innerWidth < 1024;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling.current) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // 移动端：左右滑动切换页面，上下滑动允许页面内滚动
      if (isMobile()) {
        // 水平滑动距离大于垂直滑动距离时，视为左右滑动切换页面
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          const direction = deltaX > 0 ? 1 : -1; // 向左滑 = 下一页，向右滑 = 上一页
          const currentIndex = sections.indexOf(activeSection);
          let nextIndex = currentIndex + direction;

          if (nextIndex >= 0 && nextIndex < sections.length) {
            isScrolling.current = true;
            prevSectionRef.current = activeSection;
            setActiveSection(sections[nextIndex]);
            // 移动端切换页面时立即滚动到顶部
            if (isMobile()) {
              requestAnimationFrame(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              });
            }
            setTimeout(() => {
              isScrolling.current = false;
            }, 1200);
          }

          // 重置起始位置，防止连续触发
          touchStartX = touchEndX;
          touchStartY = touchEndY;
        }
        // 上下滑动时允许自然滚动，不做处理
        return;
      }

      // 桌面端：上下滑动切换页面（原有逻辑）
      if (Math.abs(deltaY) < 50) return; // Ignore small swipes

      let target = e.target as HTMLElement | null;
      let canScroll = false;
      let isAtTop = true;
      let isAtBottom = true;

      while (target && target !== document.body) {
        const style = window.getComputedStyle(target);
        if (
          target.scrollHeight > target.clientHeight &&
          (style.overflowY === 'auto' || style.overflowY === 'scroll')
        ) {
          canScroll = true;
          isAtTop = target.scrollTop <= 0;
          isAtBottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) <= 1;
          break;
        }
        target = target.parentElement;
      }

      const direction = deltaY > 0 ? 1 : -1;

      if (canScroll) {
        if ((direction === -1 && !isAtTop) || (direction === 1 && !isAtBottom)) {
          return; // Allow normal scrolling
        }
      }

      const currentIndex = sections.indexOf(activeSection);
      let nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < sections.length) {
        isScrolling.current = true;
        prevSectionRef.current = activeSection;
        setActiveSection(sections[nextIndex]);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1200); // Debounce scroll
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeSection, setActiveSection]);

  const renderSection = () => {
    switch (activeSection) {
      case 'hero': return <Hero key="hero" />;
      case 'about': return <About key="about" />;
      case 'projects': return <Projects key="projects" />;
      case 'skills': return <Skills key="skills" />;
      case 'contact': return <Contact key="contact" />;
      default: return <Hero key="hero" />;
    }
  };

  return (
    <Layout>
      <div className="w-screen overflow-hidden relative" style={{ height: '100dvh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, scale: activeSection === 'hero' ? 0.95 : 0.9, y: activeSection === 'hero' ? 50 : 0 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -50 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              opacity: { duration: 0.6 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  );
}
