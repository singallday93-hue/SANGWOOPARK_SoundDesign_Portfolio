import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu, X, ShieldAlert, Globe, FileText } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(245, 239, 230, 0)', 'rgba(245, 239, 230, 0.95)']
  );

  const navLinks = [
    { name: t('nav.home'), path: 'hero' },
    { name: t('nav.portfolio'), path: 'portfolio' },
    { name: t('nav.about'), path: 'about' },
    { name: t('nav.skills'), path: 'skills' },
    { name: t('nav.education'), path: 'education' },
    { name: t('nav.projects'), path: 'projects' },
  ];

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(path);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav 
      style={{ backgroundColor: navBackground }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm transition-all border-b border-white/[0.03]"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center group-hover:bg-zinc-900 transition-all">
             <span className="text-white font-black text-lg">P</span>
          </div>
          <span className="text-zinc-900 font-bold tracking-tighter uppercase text-sm group-hover:text-sky-500 transition-colors">{t('brand.name')}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.button
              key={link.path}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLinkClick(link.path)}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-colors relative group ${
                location.pathname === link.path ? 'text-sky-500' : 'text-zinc-700 hover:text-zinc-900'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full" />
            </motion.button>
          ))}
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLocale(locale === 'ko' ? 'en' : 'ko')}
            className="flex items-center gap-1.5 px-3 py-1 bg-zinc-200 hover:bg-zinc-300 rounded-full transition-all text-[10px] font-bold uppercase tracking-widest text-zinc-700"
          >
            <Globe className="w-3.5 h-3.5" />
            {locale === 'ko' ? 'EN' : 'KR'}
          </motion.button>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 bg-zinc-900 text-white rounded-full transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-zinc-900/10"
          >
            <FileText className="w-3.5 h-3.5 text-sky-500" />
            {t('nav.resume')}
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/proposal.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 bg-sky-500 text-white rounded-full transition-all text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-sky-500/20"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            {t('nav.proposal')}
          </motion.a>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link 
              to="/admin" 
              className={`p-2 rounded-full transition-colors ${location.pathname === '/admin' ? 'text-sky-400 bg-sky-500/10' : 'text-zinc-500 hover:text-zinc-800'}`}
            >
              <ShieldAlert className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-600 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-[#faf6ee] border-b border-[#e2d7c0] shadow-xl p-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLinkClick(link.path)}
                className={`text-sm font-bold uppercase tracking-[0.2em] text-left border-l-2 pl-4 transition-all ${
                  location.pathname === link.path ? 'text-sky-500 border-sky-500' : 'text-zinc-600 border-transparent hover:text-zinc-900'
                }`}
              >
                {link.name}
              </motion.button>
            ))}

            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setLocale(locale === 'ko' ? 'en' : 'ko');
                setIsOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-4 bg-[#f2e9db] text-zinc-900 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#e2d7c0]"
            >
              <Globe className="w-4 h-4" />
              Switch to {locale === 'ko' ? 'English' : '한국어'}
            </motion.button>

            <div className="flex flex-col gap-2">
              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-4 bg-zinc-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md"
              >
                <FileText className="w-4 h-4 text-sky-500" />
                {t('nav.resume')} (PDF)
              </motion.a>

              <motion.a 
                whileTap={{ scale: 0.95 }}
                href="/proposal.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-4 bg-sky-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md"
              >
                <FileText className="w-4 h-4 text-white" />
                {t('nav.proposal')} (PDF)
              </motion.a>
            </div>

            <Link to="/admin" onClick={() => setIsOpen(false)} className="text-xs text-zinc-600 font-bold uppercase tracking-widest text-center py-4 border-t border-[#e2d7c0] mt-4">
              {t('admin.title')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
