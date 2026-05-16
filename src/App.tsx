/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { PortfolioItem } from './data/portfolio';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { AboutMe } from './components/AboutMe';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { PreviousProjects } from './components/PreviousProjects';
import { QuickResume } from './components/QuickResume';
import { AdminArea } from './pages/AdminArea';

function HomePage({ onSelectItem }: { onSelectItem: (item: PortfolioItem) => void }) {
  return (
    <>
      <Hero />
      <QuickResume />
      <PortfolioGrid onSelectItem={onSelectItem} />
      <AboutMe />
      <Skills />
      <Education />
      <PreviousProjects />
    </>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-app-bg text-zinc-900 selection:bg-sky-500 selection:text-white">
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage onSelectItem={setSelectedItem} />} />
              <Route path="/admin" element={<AdminArea />} />
              {/* Redirect any other path to home to handle hash links */}
              <Route path="*" element={<HomePage onSelectItem={setSelectedItem} />} />
            </Routes>
          </main>

          <Footer />

          <VideoModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        </div>
      </Router>
    </LanguageProvider>
  );
}
