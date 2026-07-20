import { motion } from 'motion/react';
import { Globe, Music, Store, Languages, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function QuickResume() {
  const { t } = useLanguage();
  
  const experiences = [
    { 
      title: t('resume.exp4.title'), 
      company: t('resume.exp4.company'), 
      year: "Global",
      icon: <Globe className="w-5 h-5 text-sky-500 group-hover:text-white" />,
      offset: 30
    },
    { 
      title: t('resume.exp2.title'), 
      company: t('resume.exp2.company'), 
      year: "2023 - 2024",
      icon: <Music className="w-5 h-5 text-sky-500 group-hover:text-white" />,
      offset: -30
    },
    { 
      title: t('resume.exp3.title'), 
      company: t('resume.exp3.company'), 
      year: "2013 - 2023",
      icon: <Store className="w-5 h-5 text-sky-500 group-hover:text-white" />,
      offset: 30
    },
    { 
      title: t('resume.exp1.title'), 
      company: t('resume.exp1.company'), 
      subdesc: t('resume.exp1.subdesc'),
      year: "2024 - 2026",
      icon: <Languages className="w-5 h-5 text-sky-500 group-hover:text-white" />,
      offset: -30
    },
    { 
      title: t('resume.exp5.title'), 
      company: t('resume.exp5.company'), 
      year: "2024 - 2026",
      icon: <GraduationCap className="w-5 h-5 text-sky-500 group-hover:text-white" />,
      offset: 30
    }
  ];

  return (
    <section className="py-24 border-y border-zinc-200 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-16 lg:gap-4 items-center">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: exp.offset }}
              viewport={{ once: true }}
              transition={{ 
                delay: idx * 0.1, 
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center text-center gap-4 group relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:scale-110 transition-all duration-500 relative z-10 shadow-sm">
                {exp.icon}
              </div>
              <div className="max-w-[200px]">
                <h4 className="text-zinc-900 font-black text-xs mb-2 uppercase tracking-tighter leading-tight">{exp.title}</h4>
                <p className="text-zinc-500 text-[9px] tracking-widest font-bold uppercase mb-1 opacity-80">{exp.company}</p>
                {exp.subdesc && (
                  <p className="text-zinc-400 text-[8px] font-semibold tracking-wide mb-1 opacity-90 leading-normal">
                    {exp.subdesc}
                  </p>
                )}
                <div className="inline-block px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[8px] font-black uppercase">
                  {exp.year}
                </div>
              </div>
              
              {/* Optional Connector line decoration could go here if wanted */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
