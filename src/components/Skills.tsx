import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export function Skills() {
  const { t } = useLanguage();
  
  const skillCategories = [
    {
      title: "Sound Design",
      skills: [
        "Gameplay-Oriented Sound Design",
        "Impact & Combat Audio Design",
        "Environmental Ambience Design",
        "Genre-Specific Audio Design",
        "Synth & Texture Sound Design",
        "Cinematic & Realistic Audio Production"
      ]
    },
    {
      title: "Audio Implementation",
      skills: [
        "Unreal Engine Audio",
        "MetaSound & BP",
        "Animation Notify",
        "Surface-based Footstep",
        "Audio Volume / Reverb Zone",
        "Spatialization & HRTF"
      ]
    },
    {
      title: "DAW & Middleware",
      skills: [
        "Cubase / Logic / Reaper",
        "iZotope RX / Waves",
        "Wwise (Intermediate)",
        "FMOD (In-Learning)",
        "Unity (Basic)",
        "VSTi / Synthesis"
      ]
    },
    {
      title: "Production",
      skills: [
        "Global Communication",
        "Project Management",
        "Recording & Mix",
        "Schedule & Asset Management",
        "A&R Strategy",
        "Technical Documentation"
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-sky-500 mb-2">{t('skills.title')}</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 tracking-tight uppercase font-futura selection:text-white">
            {t('skills.subtitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-zinc-200 group hover:border-sky-500 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.02)]"
            >
              <h4 className="text-zinc-900 font-bold mb-8 flex items-center gap-3 text-lg uppercase">
                <span className="w-2 h-2 rounded-full bg-zinc-200 group-hover:bg-sky-500 transition-colors" />
                {cat.title}
              </h4>
              <ul className="space-y-4">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-sm text-zinc-700 hover:text-sky-500 transition-colors flex items-center justify-between border-b border-zinc-100 pb-2 font-medium tracking-tight">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
