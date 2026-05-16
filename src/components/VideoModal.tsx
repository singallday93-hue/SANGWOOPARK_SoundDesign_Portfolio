import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { PortfolioItem } from '../data/portfolio';

interface VideoModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function VideoModal({ item, onClose }: VideoModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          id="video-modal-content"
        >
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            {/* Video Section */}
            <div className="flex-1 bg-black aspect-video md:aspect-auto">
              <iframe
                title={item.title}
                src={`https://www.youtube.com/embed/${item.videoUrl}?autoplay=1`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Info Section */}
            <div className="w-full md:w-96 p-6 overflow-y-auto custom-scrollbar bg-zinc-950">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">{item.title}</h2>
                  <p className="text-sm text-zinc-400 mt-1">{item.gameInfo}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
                  id="close-modal-btn"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Project Overview</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">{item.details?.overview}</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">My Role</h3>
                  <ul className="space-y-1">
                    {item.details?.myRole.map((role, idx) => (
                      <li key={idx} className="text-sm text-zinc-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Design Intent</h3>
                  <p className="text-sm text-zinc-300 italic">"{item.details?.designIntent}"</p>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Tools Used</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                    {item.details?.tools.join(' / ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
