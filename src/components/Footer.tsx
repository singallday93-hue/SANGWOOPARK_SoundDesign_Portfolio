import { Mail, Youtube, Linkedin, FileText, ChevronUp } from 'lucide-react';
import { Button } from './ui/Button';
import { useLanguage } from '../context/LanguageContext';
import sangwooImg from '../assets/images/sangwoo.jpg';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-24 px-6 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-12 md:gap-20">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 mb-6 uppercase tracking-tight font-futura">
            {t('footer.title').split('.')[0]}.<br />
            <span className="text-sky-500">{t('footer.title').split('.')[1]}</span>
          </h2>
          <p className="text-zinc-600 mb-8 max-w-sm font-medium">
            {t('footer.desc')}
          </p>
          <div className="space-y-4">
            <a href="mailto:yacheaudio@gmail.com" className="text-xl font-bold text-zinc-900 hover:text-sky-500 transition-colors flex items-center gap-3 group">
              <Mail className="w-6 h-6 text-zinc-400 group-hover:text-sky-500 transition-colors" />
              yacheaudio@gmail.com
            </a>
            <div className="flex items-center gap-6 mt-4">
              <a href="#" className="p-3 bg-zinc-100 border border-zinc-200 rounded-full hover:bg-sky-500/10 hover:border-sky-500 transition-all text-zinc-400 hover:text-sky-500">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-zinc-100 border border-zinc-200 rounded-full hover:bg-sky-500/10 hover:border-sky-500 transition-all text-zinc-400 hover:text-sky-500">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Small footer photo centered between columns */}
        <div className="flex justify-center py-8 md:py-0">
          <div className="relative w-32 h-32 rounded-4xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-105 hover:rotate-3 transition-all duration-500 z-20 group">
            <img 
              src={sangwooImg} 
              alt="Sangwoo Park" 
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="bg-zinc-50 p-10 rounded-4xl border border-zinc-200 hover:border-sky-500/30 transition-all duration-500 shadow-sm relative overflow-hidden group flex flex-col items-center text-center">
             <div className="relative z-20 flex flex-col items-center">
               <h4 className="text-sky-500 font-bold mb-4 uppercase tracking-[0.2em] text-[10px]">Collaboration & Recruitment</h4>
               <p className="text-zinc-600 text-sm mb-8 font-medium max-w-[280px]">최신 이력서와 포트폴리오 기획안을 다운로드하여 확인하실 수 있습니다.</p>
               <Button variant="outline" className="w-full md:w-auto px-8 border-zinc-200 hover:border-sky-500 hover:text-sky-600 bg-white shadow-sm font-bold text-zinc-900">
                 <FileText className="w-4 h-4" />
                 {t('footer.btn.resume')}
               </Button>
             </div>
             
             {/* Decorative background element */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-500/5 rounded-full blur-3xl group-hover:bg-sky-500/10 transition-colors duration-700" />
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-800">
            <span>© 2026 SANG WOO PARK PORTFOLIO</span>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button 
                onClick={scrollToTop}
                className="hover:text-sky-500 transition-colors flex items-center gap-2"
              >
                Back to Top
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
