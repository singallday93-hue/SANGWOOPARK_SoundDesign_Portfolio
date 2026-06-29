import { motion, AnimatePresence } from 'motion/react';
import { Play, Grid, List as ListIcon, Youtube } from 'lucide-react';
import { PortfolioItem, portfolioItems as defaultItems } from '../data/portfolio';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioService } from '../services/portfolioService';
import bookshelfImg from '../assets/images/regenerated_image_1782703677108.png';

interface PortfolioGridProps {
  onSelectItem: (item: PortfolioItem) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  'In-gameplay': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', accent: 'bg-blue-600' },
  'Skill': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', accent: 'bg-emerald-600' },
  'Creature': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', accent: 'bg-violet-600' },
  'UI/GACHA': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', accent: 'bg-amber-600' },
  'Voice': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', accent: 'bg-rose-600' },
  'Engine': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', accent: 'bg-sky-600' },
  'Cinematic': { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200', accent: 'bg-fuchsia-600' },
};

export function PortfolioGrid({ onSelectItem }: PortfolioGridProps) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'All' | PortfolioItem['category']>('All');
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = portfolioService.subscribe((data) => {
      setItems(data.length > 0 ? data : defaultItems);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  const filteredItems = filter === 'All' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500 mb-2">{t('portfolio.subtitle')}</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight font-futura selection:text-white uppercase">{t('portfolio.title')}</h3>
          <p className="text-[11px] text-zinc-500 font-medium mt-3 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500/80 animate-pulse" />
            {t('portfolio.info')}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-zinc-200 border border-zinc-300 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-white text-sky-500 shadow-sm' : 'text-zinc-500'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('compact')}
              className={`p-1.5 rounded transition-all ${viewMode === 'compact' ? 'bg-white text-sky-500 shadow-sm' : 'text-zinc-500'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'In-gameplay', 'Skill', 'Creature', 'UI/GACHA', 'Voice', 'Engine', 'Cinematic'].map((f) => {
              const colors = f === 'All' ? null : CATEGORY_COLORS[f as keyof typeof CATEGORY_COLORS];
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border
                    ${filter === f 
                      ? f === 'All' 
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg' 
                        : `${colors?.accent} text-white border-transparent shadow-lg`
                      : f === 'All'
                        ? 'bg-zinc-100 text-zinc-500 border-zinc-200 hover:border-zinc-400'
                        : `${colors?.bg} ${colors?.text} ${colors?.border} hover:opacity-80`}`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div 
        layout
        className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const catColors = CATEGORY_COLORS[item.category as keyof typeof CATEGORY_COLORS] || { bg: 'bg-zinc-50', text: 'text-zinc-600', border: 'border-zinc-100', accent: 'bg-zinc-500' };
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`group relative ${catColors.bg} border ${catColors.border} rounded-2xl overflow-hidden hover:border-zinc-400 transition-all cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.02)]
                  ${viewMode === 'compact' ? 'flex flex-row items-center h-32' : 'flex flex-col'}`}
                onClick={() => onSelectItem(item)}
              >
                <div className={`${viewMode === 'compact' ? 'w-48 h-full shrink-0' : 'aspect-video'} relative overflow-hidden bg-zinc-200/50`}>
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100"
                  />
                  <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-zinc-900/5 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className={`w-12 h-12 rounded-full ${catColors.accent} flex items-center justify-center shadow-2xl transition-transform group-active:scale-90`}>
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className={`${viewMode === 'compact' ? 'px-8 py-4 flex-1 flex justify-between items-center' : 'p-6'}`}>
                  <div className="text-left">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[9px] font-black uppercase tracking-widest ${catColors.text} ${catColors.bg} px-2 py-0.5 rounded border ${catColors.border}`}>
                        {item.category}
                      </span>
                      <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">{item.gameInfo}</p>
                    </div>
                    <h4 className={`text-lg font-bold text-zinc-900 group-hover:${catColors.text} transition-colors uppercase tracking-tight`}>
                      {item.title}
                    </h4>
                    {viewMode === 'grid' && (
                      <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    )}
                  </div>
                  
                  {viewMode === 'compact' && (
                     <button className={`text-[10px] font-bold uppercase tracking-widest ${catColors.text} px-4 py-2 ${catColors.bg} rounded-full border ${catColors.border} group-hover:${catColors.accent} group-hover:text-white transition-all`}>
                       {t('portfolio.watch')}
                     </button>
                  )}

                  {viewMode === 'grid' && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className={`text-[8px] font-bold ${catColors.text} ${catColors.bg} px-1.5 py-0.5 rounded border ${catColors.border} uppercase tracking-widest`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lifelong Gamer Showcase Section */}
      <div className="mt-20 border-t border-zinc-100 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center bg-zinc-50/55 p-6 md:p-10 rounded-3xl border border-zinc-100">
          <div className="md:col-span-5 aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-zinc-950 flex items-center justify-center">
            <img 
              src={bookshelfImg} 
              alt="Lifelong Gamer Console & Game Collection" 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <span className="text-sky-500 text-[10px] font-black uppercase tracking-[0.25em] mb-3 inline-block">
              Lifelong Gaming Journey
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight uppercase mb-4">
              Gamer & Player Perspective
            </h3>
            <p className="text-sm md:text-base text-zinc-600 font-semibold leading-relaxed mb-6 whitespace-pre-line">
              {t('portfolio.gamer_desc')}
            </p>
            <div className="flex flex-wrap gap-2">
              {['Super Famicom', 'PS1', 'Nintendo', 'PS2', 'PS3', 'PS5', 'Xbox'].map((consoleName) => (
                <span 
                  key={consoleName}
                  className="text-[9px] font-black uppercase tracking-widest text-zinc-500 bg-white border border-zinc-200 px-2.5 py-1 rounded-md shadow-sm"
                >
                  {consoleName}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex justify-start">
        <a 
          href="https://youtube.com/playlist?list=PLsyi2jOKf05vIq_wKUkvjia6v6LxTaBx0&si=4UwrfkLzm90cu3fw" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex items-center gap-3 text-zinc-600 hover:text-red-500 transition-all duration-300"
          title="Youtube Portfolio"
        >
          <div className="p-3 rounded-xl bg-zinc-100 group-hover:bg-red-50 transition-colors">
            <Youtube className="w-6 h-6 opacity-100" />
          </div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Watch Youtube Portfolio
          </span>
        </a>
      </div>
    </section>
  );
}
