import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { School, GraduationCap, Music } from 'lucide-react';

export function Education() {
  const { t, language } = useLanguage();

  const educationList = [
    {
      school: t('education.school3'),
      major: '',
      period: 'Junior High',
      icon: <School className="w-6 h-6 opacity-80" />
    },
    {
      school: t('education.school2'),
      major: '',
      period: 'High School',
      icon: <GraduationCap className="w-6 h-6 opacity-80" />
    },
    {
      school: t('education.school1'),
      major: t('education.major1'),
      period: 'University',
      icon: <Music className="w-6 h-6 opacity-80" />,
      status: language === 'ko' ? '(중퇴)' : '(Dropout)'
    }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter uppercase mb-2">
              {t('education.title')}
            </h2>
            <p className="text-zinc-500 font-bold tracking-widest uppercase text-xs opacity-70">
              {t('education.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationList.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ 
                opacity: 1, 
                y: idx === 1 ? 20 : 0 
              }}
              viewport={{ once: true }}
              transition={{ 
                delay: idx * 0.1,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="p-8 rounded-3xl border border-zinc-100 bg-white hover:border-sky-500/50 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-500 group flex flex-col items-center text-center relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                {edu.icon}
              </div>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <h4 className="text-zinc-900 font-black text-xl tracking-tighter group-hover:text-sky-600 transition-colors">
                  {edu.school.replace(' (중퇴)', '').replace(' (Dropout)', '')}
                </h4>
                {edu.status && (
                  <span className="text-[10px] text-zinc-400 font-bold">{edu.status}</span>
                )}
              </div>
              {edu.major ? (
                <p className="text-zinc-600 text-sm font-bold mb-4">{edu.major}</p>
              ) : (
                <div className="h-4 mb-4" /> // Spacer for alignment
              )}
              <div className="mt-auto">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 py-1.5 px-4 bg-zinc-50 rounded-full group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors">
                  {edu.period}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
