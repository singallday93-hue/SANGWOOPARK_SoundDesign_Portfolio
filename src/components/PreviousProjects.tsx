import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import projectsImg from '../assets/images/regenerated_image_1778946235674.png';

export function PreviousProjects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 bg-[#f5efe6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter uppercase mb-2">
            {t('projects.title')}
          </h2>
          <p className="text-zinc-600 font-bold tracking-widest uppercase text-xs">
            {t('projects.subtitle')}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl group shadow-2xl border border-[#e2d7c0]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500 z-10" />
          <img 
            src={projectsImg} 
            alt="Previous Projects Overview"
            className="w-full h-auto min-h-[500px] object-cover transition-all duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20">
             <div className="bg-sky-500 h-0.5 w-8 mb-4" />
             <p className="text-white/70 text-[9px] font-black uppercase tracking-[0.25em] mb-1">Portfolio Milestone</p>
             <h3 className="text-white text-xl md:text-2xl font-black tracking-tighter uppercase max-w-xl opacity-90">
               {t('projects.subtitle')}
             </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
