import React, { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'ko' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  ko: {
    'nav.home': '홈',
    'nav.portfolio': '포트폴리오',
    'nav.about': '경험',
    'nav.skills': '기술',
    'nav.contact': '문의',
    'hero.badge': '협업 가능',
    'hero.title1': '기대되는',
    'hero.title2': '사운드를 만듭니다.',
    'hero.subtitle': '상황마다 기대되는 사운드가 자연스럽게 전달될 수 있도록 디자인합니다.',
    'hero.btn.portfolio': '포트폴리오 보기',
    'hero.btn.about': '경험 개요',
    'hero.btn.contact': '문의하기',
    'hero.slide2.title': '박상우 | Noah Park',
    'hero.slide2.subtitle': '북미, 유럽, 아시아-퍼시픽 등 18개국 32개 도시 규모의 글로벌 프로젝트 경험을 바탕으로 다양한 국가의 파트너들과 협업해왔습니다. 복잡한 일정과 현장 운영 속에서도 원활한 커뮤니케이션과 빠른 조율 능력을 강점으로 가지고 있습니다.',
    'resume.exp1.title': '통번역 프리랜서',
    'resume.exp1.company': '비즈니스 및 기술 통번역',
    'resume.exp1.desc': '음악 및 기술 분야 비즈니스 통번역 프리랜서 활동.',
    'resume.exp2.title': '글로벌 A&R / 투어 매니지먼트',
    'resume.exp2.company': 'MAGIC STRAWBERRY SOUND, AT AREA',
    'resume.exp2.desc': '글로벌 아티스트 A&R 및 투어 매니지먼트, 18개국 32개 도시 프로젝트 수행.',
    'resume.exp3.title': '자영업 창업 및 운영, 밴드 및 작곡 팀 운영',
    'resume.exp3.company': '음악 비즈니스 및 팀 매니지먼트',
    'resume.exp3.desc': '음악 비즈니스 창업 및 운영, 밴드 및 작곡 팀 매니지먼트.',
    'resume.exp4.title': '미국 거주 경험 (원어민 수준)',
    'resume.exp4.company': '10년 거주',
    'resume.exp5.title': '실용음악 학원 출강',
    'resume.exp5.company': '강서 실용음악 학원',
    'portfolio.title': '포트폴리오',
    'portfolio.subtitle': 'Game Audio',
    'portfolio.watch': '영상 보기',
    'about.title': '경험 스토리',
    'about.subtitle': '음악 제작에서 인터랙티브 디자인으로',
    'about.p1': '음악 제작과 글로벌 프로젝트 경험을 통해 다양한 공간과 환경, 청취 조건에 따라 사운드가 다르게 전달되는 과정을 직접 경험하며, 플레이어가 상황 속에서 자연스럽게 기대하는 감각과 피드백을 설계하는 방식에 관심을 갖게 되었습니다.',
    'about.p2': '라이브 공연, 레코딩, 믹싱 피드백 과정에서 공간과 상황에 따라 소리가 다르게 인식되는 방식을 직접 경험하며, 사운드의 전달감과 몰입 구조에 대한 감각을 키웠습니다.',
    'about.p3': '현재는 DAW, Middleware, Engine 기반의 워크플로우를 통해 플레이 상황과 공간 변화에 반응하는 인터랙티브 사운드 디자인을 구현하고 있습니다.',
    'skills.title': '기술 역량',
    'skills.subtitle': '사운드 디자인과 구현 기술',
    'education.title': '학력',
    'education.subtitle': '성장과 배움의 과정',
    'education.school1': '단국대학교 (중퇴)',
    'education.major1': '뉴뮤직과 (실용음악)',
    'education.school2': 'Naperville North High School',
    'education.school3': 'Jefferson Junior High School',
    'nav.education': '교육',
    'nav.projects': '프로젝트',
    'projects.title': 'PREVIOUS PROJECTS',
    'projects.subtitle': '글로벌 프로젝트 및 활동 기록',
    'projects.item1.title': '밴드 새소년 월드투어 2023',
    'projects.item1.desc': '북미 & 유럽 투어 매니지먼트',
    'projects.item2.title': '밴드 새소년 월드투어 2023',
    'projects.item2.desc': '아시아 퍼시픽 투어 매니지먼트',
    'projects.item3.title': '10CM 2024 콘서트',
    'projects.item3.desc': '투어 운영 및 현장 조율',
    'projects.item4.title': "밴드 새소년 싱글 'Kidd' 발매",
    'projects.item4.desc': '글로벌 릴리즈 및 프로모션 계획',
    'projects.item5.title': '새소년 더현대 서울 팝업스토어',
    'projects.item5.desc': '공간 기획 및 운영 총괄',
    'projects.item6.title': 'NY/CA 레코딩 & 믹싱 현장',
    'projects.item6.desc': '현지 스튜디오 매니지먼트',
    'footer.title': '함께 몰입을 만들어가요.',
    'footer.desc': '게임 개발 협업 및 사운드 디자인 프로젝트 의뢰는 아래 연락처로 부탁드립니다.',
    'footer.btn.resume': '이력서 다운로드 (PDF)',
    'admin.title': '관리자 대시보드',
    'brand.name': '박상우 포트폴리오',
  },
  en: {
    'nav.home': 'Home',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'Experience',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'hero.badge': 'Available for Collaboration',
    'hero.title1': 'Creating the Sound',
    'hero.title2': 'You Expect',
    'hero.subtitle': 'design interactive sound that enhances gameplay through expected feedback and immersive detail.',
    'hero.btn.portfolio': 'Watch Portfolio',
    'hero.btn.about': 'Experience Overview',
    'hero.btn.contact': 'Get in Touch',
    'hero.slide2.title': 'Sangwoo Park | Noah Park',
    'hero.slide2.subtitle': 'Based on global project experience in 32 cities across 18 countries, including North America, Europe, and Asia-Pacific, I have collaborated with partners from various countries. My strengths include smooth communication and quick coordination even amidst complex schedules and on-site operations.',
    'resume.exp1.title': 'Translation Freelance',
    'resume.exp1.company': 'Business & Tech Translation',
    'resume.exp1.desc': 'Freelance business translation for music and tech industries.',
    'resume.exp2.title': 'Global A&R / Tour Management',
    'resume.exp2.company': 'MAGIC STRAWBERRY SOUND, AT AREA',
    'resume.exp2.desc': 'Global A&R and tour management across 32 cities in 18 countries.',
    'resume.exp3.title': 'Entrepreneurship & Band Management',
    'resume.exp3.company': 'Music Business & Team MGMT',
    'resume.exp3.desc': 'Founded music business, managed bands and songwriting teams.',
    'resume.exp4.title': 'Experience in the US (Native Level)',
    'resume.exp4.company': '10 Years Residency',
    'resume.exp5.title': 'Academy Instructor',
    'resume.exp5.company': 'Gangseo Practical Music Academy',
    'portfolio.title': 'Portfolio',
    'portfolio.subtitle': 'Game Audio',
    'portfolio.watch': 'Watch Video',
    'about.title': 'The Narrative',
    'about.subtitle': 'Music Production to Interaction',
    'about.p1': 'Through my experience in music production and global projects, I experienced how sound is delivered differently depending on various spaces, environments, and listening conditions. This sparked my interest in designing feedback and sensations that players naturally expect within a given context.',
    'about.p2': 'By directly experiencing how sound is perceived differently across spaces during live performances, recordings, and mixing feedback sessions, I developed a keen sense for sound delivery and immersive structures.',
    'about.p3': 'Currently, I am implementing interactive sound designs that react to player situations and spatial changes using workflows based on DAWs, Middleware, and Engines.',
    'skills.title': 'Capabilities',
    'skills.subtitle': 'Design Meets Implementation',
    'education.title': 'Education',
    'education.subtitle': 'Growth & Learning',
    'education.school1': 'Dankook University (Dropout)',
    'education.major1': 'New Music (Practical Music)',
    'education.school2': 'Naperville North High School',
    'education.school3': 'Jefferson Junior High School',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'projects.title': 'PREVIOUS PROJECTS',
    'projects.subtitle': 'Global Projects & Activity Records',
    'projects.item1.title': 'SE SO NEON World Tour 2023',
    'projects.item1.desc': 'NA & EU Tour Management',
    'projects.item2.title': 'SE SO NEON World Tour 2023',
    'projects.item2.desc': 'Asia-Pacific Tour Management',
    'projects.item3.title': '10CM 2024 Concert',
    'projects.item3.desc': 'Tour Ops & Coordination',
    'projects.item4.title': "SE SO NEON 'Kidd' Release",
    'projects.item4.desc': 'Global Release & Promo Planning',
    'projects.item5.title': 'SE SO NEON Pop-up Store',
    'projects.item5.desc': 'Space Planning & Management',
    'projects.item6.title': 'NY/CA Recording & Mixing',
    'projects.item6.desc': 'Local Studio Management',
    'footer.title': "Let's build immersion together.",
    'footer.desc': 'For collaboration or project inquiries, please reach out via the contacts below.',
    'footer.btn.resume': 'Download Resume (PDF)',
    'admin.title': 'Management Dashboard',
    'brand.name': 'SANG WOO PARK PORTFOLIO',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('ko');

  const t = (key: string) => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
