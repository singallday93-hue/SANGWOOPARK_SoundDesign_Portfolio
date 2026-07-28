import { motion, AnimatePresence } from 'motion/react';
import { Play, Mail, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { useLanguage } from '../context/LanguageContext';
import sangwooImg from '../assets/images/sangwoo.jpg';

export function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 8000); // Slower interval
    return () => clearInterval(timer);
  }, [currentSlide]); // Reset timer when currentSlide changes manualy

  const variants = {
    enter: {
      opacity: 0
    },
    center: {
      zIndex: 1,
      opacity: 1
    },
    exit: {
      zIndex: 0,
      opacity: 0
    }
  };

  return (
    <>
      <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-app-bg">
        <AnimatePresence initial={false} mode="wait">
          {currentSlide === 0 ? (
            <motion.div
              key="slide1"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.2 }}
              className="max-w-6xl w-full flex flex-col items-center text-center z-10"
            >
              <h1 className="text-5xl md:text-[6.5rem] font-bold tracking-tighter text-zinc-900 mb-6 leading-[1.2] uppercase font-futura selection:text-white">
                {t('hero.title1')} <br />
                <span className="text-sky-500">{t('hero.title2')}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-700 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                {t('hero.subtitle')}
              </p>


              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button onClick={() => scrollTo('portfolio')} className="bg-[#fbf6ee] text-sky-500 border-2 border-sky-500 hover:bg-[#f2e9db] shadow-[0_10px_30px_rgba(184,115,51,0.12)] font-bold">
                  {t('hero.btn.portfolio')}
                </Button>
                <Button variant="secondary" onClick={() => scrollTo('about')} className="bg-zinc-900 text-white border-none transition-colors">
                  {t('hero.btn.about')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="slide2"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.2 }}
              className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12 z-10"
            >
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6 leading-[1.2] uppercase font-futura">
                   {t('hero.slide2.title')}
                </h2>
                <p className="text-lg text-zinc-700 mb-8 max-w-md font-medium">
                   {t('hero.slide2.subtitle')}
                </p>
                <Button onClick={() => scrollTo('contact')} className="bg-[#fbf6ee] text-sky-500 border-2 border-sky-500 hover:bg-[#f2e9db] shadow-[0_10px_30px_rgba(184,115,51,0.12)] font-bold">
                  <Mail className="w-4 h-4" />
                  {t('hero.btn.contact')}
                </Button>
              </div>
              <div className="relative aspect-square md:h-[450px] bg-[#f2e9db] rounded-3xl overflow-hidden shadow-2xl group mx-auto lg:mx-0 border-4 border-[#fbf6ee]">
                <img 
                  src={sangwooImg} 
                  alt="Sangwoo Park" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-10 pointer-events-none z-30">
          <button 
            onClick={() => setCurrentSlide(prev => (prev === 0 ? 1 : 0))}
            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-sky-500 transition-colors pointer-events-auto"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setCurrentSlide(prev => (prev === 0 ? 1 : 0))}
            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-sky-500 transition-colors pointer-events-auto"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'bg-sky-500 w-8' : 'bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>

      </section>
    </>
  );
}
