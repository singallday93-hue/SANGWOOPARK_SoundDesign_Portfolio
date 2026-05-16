export interface PortfolioItem {
  id: string;
  title: string;
  category: 'In-gameplay' | 'Skill' | 'Creature' | 'UI/GACHA' | 'Cinematic' | 'Voice' | 'Engine';
  gameInfo: string;
  tags: string[];
  description: string;
  videoUrl: string; // YouTube embed ID
  thumbnail: string;
  details: {
    overview: string;
    myRole: string[];
    designIntent: string;
    tools: string[];
  };
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'action-rpg-redesign',
    title: 'Action RPG Sound Redesign',
    category: 'In-gameplay',
    gameInfo: 'Soul-like RPG / PC & Console',
    tags: ['Combat', 'Weapon Impact', 'Magic FX'],
    description: 'Unreal Engine 기반으로 타격음, 발소리, 공간 리버브, 앰비언스를 재구성한 사운드 디자인 포트폴리오.',
    videoUrl: 'dQw4w9WgXcQ', // Placeholder
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '기존 게임 플레이 영상에 맞춰 전투, 발소리, 공간 앰비언스, 리버브를 재설계했습니다.',
      myRole: [
        '타격음 레이어링 (Impact Layering)',
        '금속/가죽/마법 계열 소스 조합',
        'Surface Type 기반 발소리 설계',
        '실내외 공간감 차이를 위한 리버브 구성'
      ],
      designIntent: '공격의 무게감과 공간의 밀도를 구분하기 위해 저역 임팩트, 중역 질감, 고역 트랜지언트를 분리해 설계했습니다.',
      tools: ['Cubase', 'Unreal Engine', 'MetaSound']
    }
  },
  {
    id: 'cyber-city-ambience',
    title: 'Night Tech-City Ambiance',
    category: 'UI/GACHA',
    gameInfo: 'Open World Sci-Fi',
    tags: ['Ambience', 'Dynamic Wind', 'Urban Scant'],
    description: '도시의 소음과 레이어드된 사운드스케이프를 통해 미래지향적인 도시의 생동감을 구현.',
    videoUrl: 'dQw4w9WgXcQ', // Placeholder
    thumbnail: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '사이버펑크 테마의 도시 환경에서 플레이어의 위치에 따라 반응하는 앰비언스 시스템을 구축했습니다.',
      myRole: [
        '기초 앰비언스 루프 제작',
        '랜덤 포인트 사운드 배치 시스템',
        '도시 소음 감쇠(Attenuation) 로직 설계'
      ],
      designIntent: '차갑고 기계적인 느낌과 동시에 살아있는 도시의 복잡성을 소리로 전달하고자 했습니다.',
      tools: ['Logic Pro', 'FMOD', 'Unreal Engine']
    }
  },
  {
    id: 'metasound-footstep-system',
    title: 'Metasound Footstep Implementation',
    category: 'Skill',
    gameInfo: 'Adventure / Technical Audio',
    tags: ['MetaSound', 'Blueprint', 'Implementation'],
    description: '재질별 발소리와 물리 반응을 MetaSound를 통해 하이브리드로 구현한 기술 포트폴리오.',
    videoUrl: 'dQw4w9WgXcQ', // Placeholder
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '단순한 샘플링을 넘어, MetaSound의 노드 로직을 활용해 자연스러운 사운드 변화를 유도했습니다.',
      myRole: [
        'Surface Type 감지 Blueprint 작성',
        'MetaSound 랜덤 피치/볼륨 로직 설계',
        '애니메이션 노티파이 연동'
      ],
      designIntent: '반복되는 발소리의 피로감을 줄이기 위해 매 걸음마다 미세하게 다른 질감을 생성하도록 했습니다.',
      tools: ['Unreal Engine', 'MetaSound', 'Blueprint']
    }
  },
  {
    id: 'cinematic-trailer-remix',
    title: 'Cinematic Story Trailer Redesign',
    category: 'Cinematic',
    gameInfo: 'Cinematic / Presentation',
    tags: ['Cinematic', 'Sound Design', 'Mixing'],
    description: '서사적인 연출과 감정선을 극대화하기 위한 시네마틱 사운드 재설계.',
    videoUrl: 'dQw4w9WgXcQ', // Placeholder
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '영상미에 어울리는 웅장한 사운드 디자인과 감정의 고조를 표현하는 믹싱 작업을 진행했습니다.',
      myRole: [
        '사운드 이펙트 디자인 (Foley & Synth)',
        '내레이션 및 대사 프로세싱',
        '전체적인 음압 및 밸런스 믹싱'
      ],
      designIntent: '시각적 연출이 주는 긴장감을 증폭시키고, 중요한 장면에서 사운드가 이야기를 주도하도록 설계했습니다.',
      tools: ['Cubase', 'Waves Plugins', 'iZotope RX']
    }
  },
  {
    id: 'creature-vocal-design',
    title: 'Creature Vocalization System',
    category: 'Creature',
    gameInfo: 'Horror / Survival',
    tags: ['Creature', 'Vocals', 'Dynamic'],
    description: '공포 게임을 위한 몬스터 음성 레이어링 및 상황별 반응 시스템 설계.',
    videoUrl: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '생물학적 구조를 반영한 괴기스러운 소리를 디자인하고, 거리와 상황에 따른 변화를 구현했습니다.',
      myRole: ['보컬 소스 레코딩 및 변조', '랜덤 피치 시스템 구현', '공간감 처리'],
      designIntent: '보컬 소스 레코딩 및 변조, 랜덤 피치 시스템 구현, 공간감 처리',
      tools: ['Logic Pro', 'Dehumaniser', 'Unreal']
    }
  },
  {
    id: 'ui-audio-kit',
    title: 'Minimalist UI Audio Kit',
    category: 'Skill',
    gameInfo: 'Menu & HUD',
    tags: ['UI', 'Feedback', 'UX'],
    description: '깔끔하고 세련된 사용자 경험을 위한 UI 사운드 세트.',
    videoUrl: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '메뉴 조작 시 피로감을 줄이면서도 확실한 피드백을 주는 사운드를 제작했습니다.',
      myRole: ['신디사이저 기반 소스 제작', '클릭/호버/성공/실패 사운드 설계'],
      designIntent: '심플한 톤으로 게임의 전체적인 무드를 해치지 않는 기능적인 사운드를 지향했습니다.',
      tools: ['Serum', 'Ableton Live']
    }
  },
  {
    id: 'forest-ambient-interactive',
    title: 'Interactive Forest Ecosystem',
    category: 'UI/GACHA',
    gameInfo: 'Adventure / Open World',
    tags: ['Ambient', 'Interactive', 'Dynamic'],
    description: '시간과 날씨에 따라 유동적으로 변화하는 숲의 앰비언스.',
    videoUrl: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '단순 루프가 아닌, 새소리, 바람소리 등이 살아있는 숲을 구현했습니다.',
      myRole: ['시간대별 레이어 믹싱', '파라미터 기반 사운드 모듈레이션'],
      designIntent: '정적인 배경이 아닌, 플레이어와 상호작용하는 살아있는 공간을 표현했습니다.',
      tools: ['Wwise', 'Unreal Engine']
    }
  },
  {
    id: 'boss-fight-dynamic-music',
    title: 'Boss Fight Adaptive Audio',
    category: 'Skill',
    gameInfo: 'Boss Battle',
    tags: ['Music', 'Adaptive', 'Combat'],
    description: '보스의 생명력과 페이즈에 따라 변화하는 다이내믹 오디오 시스템.',
    videoUrl: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '전투의 긴장감을 유지하기 위해 상황에 맞게 음악과 사운드가 변주되는 시스템을 구축했습니다.',
      myRole: ['페이즈 전환 로직 설계', '오디오 레이어 믹스 오토메이션'],
      designIntent: '플레이어의 성공과 위기 상황을 사운드로 즉각 전달해 몰입감을 높였습니다.',
      tools: ['FMOD', 'Unity']
    }
  },
  {
    id: 'sci-fi-weapon-redesign',
    title: 'Sci-Fi Weaponry Sound Kit',
    category: 'In-gameplay',
    gameInfo: 'FPS / Sci-Fi',
    tags: ['SFX', 'Weapons', 'Energy'],
    description: '강렬한 에너지 무기 발사 및 재장전 사운드 재설계.',
    videoUrl: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '기계적 질감과 물리 에너지가 결합된 차세대 무기 사운드를 제작했습니다.',
      myRole: ['레이어드 이펙트 디자인', '충전 및 피드백 사운드 제작'],
      designIntent: '무기의 파괴력을 소리만으로 체감할 수 있도록 저역의 서브 베이스를 강조했습니다.',
      tools: ['Cubase', 'Phase Plant']
    }
  },
  // New Slots
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `new-project-slot-${i + 1}`,
    title: `Project Slot ${i + 1}`,
    category: (i % 2 === 0 ? 'Voice' : 'Engine') as any,
    gameInfo: 'Upcoming Project',
    tags: ['Placeholder'],
    description: '새로운 프로젝트 영상을 업로드할 준비가 된 슬롯입니다.',
    videoUrl: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    details: {
      overview: '이 프로젝트에 대한 개요를 입력해주세요.',
      myRole: ['분야 선정을 기다리고 있습니다.'],
      designIntent: '의도를 입력해주세요.',
      tools: ['Tools']
    }
  }))
];
