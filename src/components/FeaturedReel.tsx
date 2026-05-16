import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export function FeaturedReel() {
  return (
    <section id="featured" className="py-24 px-6 bg-zinc-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">Main Showreel</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Sound Design Reel 2024</h3>
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-zinc-800"
        >
          <iframe
            title="Main Showreel"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </motion.div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-zinc-400">
          <div>
             <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Sound Design</h4>
             <p className="text-sm">Synthesized textures and foley layering for ultimate immersion.</p>
          </div>
          <div>
             <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Technical Audio</h4>
             <p className="text-sm">Seamless implementation using MetaSounds and Blueprint audio logic.</p>
          </div>
          <div>
             <h4 className="text-white font-bold mb-2 uppercase tracking-wide">Dynamic Systems</h4>
             <p className="text-sm">Interactive audio behavior that responds to every player action.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
