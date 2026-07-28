import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function AboutMe() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 overflow-hidden relative bg-[#faf6ee]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500 mb-2">{t('about.title')}</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 leading-tight font-futura selection:text-white uppercase">
            {t('about.subtitle')}
          </h3>
          
          <div className="space-y-6 text-zinc-700 text-lg leading-relaxed max-w-xl font-medium">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
        </motion.div>

        <div className="space-y-12">
          {[
            {
              title: t('resume.exp2.title'),
              period: "2023 - 2024",
              desc: t('resume.exp2.desc')
            },
            {
              title: t('resume.exp1.title'),
              period: "2024 - 2026",
              desc: t('resume.exp1.desc')
            },
            {
              title: t('resume.exp3.title'),
              period: "2013 - 2023",
              desc: t('resume.exp3.desc')
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group border-l-2 border-[#d8cdbe] pl-8 relative"
            >
              <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-[#d8cdbe] group-hover:bg-sky-500 transition-colors" />
              <span className="text-xs font-mono text-zinc-600 mb-2 block font-bold">{item.period}</span>
              <h4 className="text-xl font-bold text-zinc-900 mb-2 uppercase tracking-wide group-hover:text-sky-500 transition-colors">
                {item.title}
              </h4>
              <p className="text-zinc-700 text-sm leading-relaxed font-normal">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
