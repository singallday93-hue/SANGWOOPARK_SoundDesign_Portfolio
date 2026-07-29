import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 36, // 0.5 inch margins
  });

  const outputPath = path.join(process.cwd(), 'public', 'resume.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  // Register fonts
  const fontRegular = '/tmp/NanumGothic.ttf';
  const fontBold = '/tmp/NanumGothic-Bold.ttf';

  doc.registerFont('NanumRegular', fontRegular);
  doc.registerFont('NanumBold', fontBold);

  const primaryColor = '#1e293b'; // Slate 800
  const accentColor = '#0284c7';  // Sky 600
  const textColor = '#334155';    // Slate 700
  const lightGray = '#cbd5e1';    // Slate 300
  const bgLight = '#f8fafc';

  // --- HEADER SECTION ---
  const leftMargin = 36;
  const topMargin = 36;
  const contentWidth = 523.28; // 595.28 - 72

  // Profile Image on Right
  const imagePath = path.join(process.cwd(), 'src', 'assets', 'images', 'sangwoo.jpg');
  const imgWidth = 120;
  const imgHeight = 150;
  const imgX = leftMargin + contentWidth - imgWidth;
  const imgY = topMargin;

  if (fs.existsSync(imagePath)) {
    doc.save();
    doc.roundedRect(imgX, imgY, imgWidth, imgHeight, 6).clip();
    doc.image(imagePath, imgX, imgY, { width: imgWidth, height: imgHeight });
    doc.restore();
    doc.roundedRect(imgX, imgY, imgWidth, imgHeight, 6).lineWidth(1).strokeColor(lightGray).stroke();
  }

  // Header Left Info
  doc.font('NanumBold').fontSize(26).fillColor(primaryColor).text('SANG WOO', leftMargin, topMargin);
  doc.font('NanumBold').fontSize(26).fillColor(primaryColor).text('PARK', leftMargin, topMargin + 32);

  doc.font('NanumBold').fontSize(11).fillColor(accentColor).text('SOUND DESIGNER', leftMargin, topMargin + 68);

  // Colored accent line
  doc.moveTo(leftMargin, topMargin + 84).lineTo(leftMargin + 100, topMargin + 84).lineWidth(2).strokeColor(accentColor).stroke();

  // Intro Paragraph
  const introY = topMargin + 95;
  const introWidth = contentWidth - imgWidth - 20;
  const introText = "과거 엔터테인먼트 회사의 글로벌 A&R 직무를 통해 다양한 프로젝트를 경험하며, 팀워크와 책임감을 길렀습니다. 이를 바탕으로 게임 사운드 디자이너로서 기획 의도에 맞는 사운드 제작과 몰입감을 높이는 사운드 활용 능력을 꾸준히 발전시키고 있습니다. 팀을 우선으로 생각하며, 완성도 높은 사운드를 만들기 위해 최선을 다하겠습니다.";
  
  doc.font('NanumRegular').fontSize(8.5).fillColor(textColor).text(introText, leftMargin, introY, {
    width: introWidth,
    lineGap: 4,
    align: 'left'
  });

  // Contact Info Bar
  const contactY = topMargin + 185;
  doc.moveTo(leftMargin, contactY).lineTo(leftMargin + contentWidth, contactY).lineWidth(0.5).strokeColor(lightGray).stroke();

  const contactTextY = contactY + 8;
  doc.font('NanumRegular').fontSize(8).fillColor(textColor);
  
  const col1 = leftMargin;
  const col2 = col1 + 120;
  const col3 = col2 + 160;
  const col4 = col3 + 110;

  doc.text('📞  +82-10-8184-1863', col1, contactTextY);
  doc.text('✉️  singallday93@gmail.com', col2, contactTextY);
  doc.text('📍  경기도 고양시', col3, contactTextY);
  doc.font('NanumBold').fillColor(accentColor).text('🌐  PORTFOLIO 바로가기', col4, contactTextY, {
    link: 'https://youtube.com/playlist?list=PLsyi2jOKf05vIq_wKUkvjia6v6LxTaBx0&si=4UwrfkLzm90cu3fw'
  });

  doc.moveTo(leftMargin, contactTextY + 16).lineTo(leftMargin + contentWidth, contactTextY + 16).lineWidth(0.5).strokeColor(lightGray).stroke();

  // --- TWO COLUMN LAYOUT ---
  const mainTopY = contactTextY + 30;
  const leftColWidth = 320;
  const rightColX = leftMargin + leftColWidth + 20;
  const rightColWidth = contentWidth - leftColWidth - 20;

  // Vertical Separator Line between Left and Right columns
  doc.moveTo(leftMargin + leftColWidth + 10, mainTopY)
     .lineTo(leftMargin + leftColWidth + 10, 800)
     .lineWidth(0.5)
     .strokeColor(lightGray)
     .stroke();

  // === LEFT COLUMN: EXPERIENCE ===
  doc.font('NanumBold').fontSize(12).fillColor(primaryColor).text('EXPERIENCE', leftMargin, mainTopY);
  
  let currentY = mainTopY + 20;

  const experiences = [
    {
      company: '(주)스프레드잇 - FREELANCE SOUND DESIGNER',
      period: '2026',
      desc: '멀티 캐주얼 소셜 퀴즈 게임의 사운드 디자인 파트에 프리랜서로 참여해 UI/UX, 환경음, 유저 피드백, 사운드 큐, 가챠 연출 등 인게임 오디오 전반을 제작. 게임 진행과 보상 구조에 맞춰 타이밍·톤·피드백 강도를 설계하고, 반복 재생용 바리에이션과 Unity 적용을 위한 에셋 네이밍·볼륨·피치·루프 가이드까지 제안.'
    },
    {
      company: 'AT AREA - GLOBAL A&R',
      period: '2024',
      desc: '아티스트 5팀의 음원·앨범 발매 프로젝트 및 뮤직비디오, 프로필 촬영 등 브랜딩 콘텐츠 제작에 참여했으며, 이 중 3개 아티스트 프로젝트를 리드해 발매 일정 관리와 모든 제작 협업을 총괄.'
    },
    {
      company: 'MAGIC STRAWBERRY SOUND - GLOBAL A&R',
      period: '2023 - 2024',
      desc: '음원·뮤직비디오 제작, 해외 레코딩, 29개 도시 월드 투어 등 주요 프로젝트 PM, 글로벌 페스티벌, 콘텐츠 로컬라이징, 국·영문 커뮤니케이션 수행.'
    },
    {
      company: 'BAND ACTIVITIES - 음악 비즈니스 및 팀 매니지먼트',
      period: '2018 - 2023',
      desc: '밴드 활동을 통한 100회 이상의 유료 공연 경험과 4차례 디지털 싱글 발매 경력 보유.'
    },
    {
      company: 'SMALL BUSINESS OWNER',
      period: '2013 - 2023',
      desc: '10년간 자영업 운영 경험을 통해 꾸준함과 책임감을 바탕으로 매장 관리 및 경영 전반 수행.'
    }
  ];

  experiences.forEach((exp) => {
    // Bullet Dot
    doc.circle(leftMargin + 4, currentY + 5, 2.5).fillColor(primaryColor).fill();

    // Company Title
    doc.font('NanumBold').fontSize(9).fillColor(primaryColor).text(exp.company, leftMargin + 14, currentY, {
      width: leftColWidth - 60
    });

    // Period on Right
    doc.font('NanumBold').fontSize(8.5).fillColor(textColor).text(exp.period, leftMargin + leftColWidth - 50, currentY, {
      align: 'right'
    });

    currentY += 16;

    // Description
    doc.font('NanumRegular').fontSize(8).fillColor(textColor).text(exp.desc, leftMargin + 14, currentY, {
      width: leftColWidth - 20,
      lineGap: 3,
      align: 'left'
    });

    const textHeight = doc.heightOfString(exp.desc, { width: leftColWidth - 20, lineGap: 3 });
    currentY += textHeight + 14;
  });

  // === RIGHT COLUMN: EDUCATION, SKILLS, CURRENT ACTIVITIES ===
  let rightY = mainTopY;

  // 1. EDUCATION
  doc.font('NanumBold').fontSize(12).fillColor(primaryColor).text('EDUCATION', rightColX, rightY);
  rightY += 18;
  doc.moveTo(rightColX, rightY).lineTo(rightColX + rightColWidth, rightY).lineWidth(0.5).strokeColor(lightGray).stroke();
  rightY += 10;

  doc.font('NanumBold').fontSize(8.5).fillColor(textColor).text('2013 - 2016', rightColX, rightY);
  rightY += 12;
  doc.font('NanumRegular').fontSize(8).fillColor(primaryColor).text('단국대학교 (천안) 중퇴', rightColX, rightY);
  rightY += 11;
  doc.font('NanumRegular').fontSize(7.5).fillColor(textColor).text('뉴뮤직과 (실용음악과)', rightColX, rightY);
  rightY += 18;

  doc.font('NanumBold').fontSize(8.5).fillColor(textColor).text('2008 - 2011', rightColX, rightY);
  rightY += 12;
  doc.font('NanumBold').fontSize(8).fillColor(primaryColor).text('NAPERVILLE NORTH', rightColX, rightY);
  rightY += 11;
  doc.font('NanumBold').fontSize(8).fillColor(primaryColor).text('HIGH SCHOOL', rightColX, rightY);
  rightY += 28;

  // 2. SKILLS
  doc.font('NanumBold').fontSize(12).fillColor(primaryColor).text('SKILLS', rightColX, rightY);
  rightY += 18;
  doc.moveTo(rightColX, rightY).lineTo(rightColX + rightColWidth, rightY).lineWidth(0.5).strokeColor(lightGray).stroke();
  rightY += 10;

  const skills = ['Logic', 'Cubase', 'Reaper', 'Wwise', 'Unreal', 'English (Native)', '10년 미국 거주'];
  skills.forEach((skill) => {
    doc.circle(rightColX + 3, rightY + 4, 1.5).fillColor(textColor).fill();
    doc.font('NanumRegular').fontSize(8).fillColor(textColor).text(skill, rightColX + 10, rightY);
    rightY += 13;
  });

  rightY += 15;

  // 3. CURRENT ACTIVITIES
  doc.font('NanumBold').fontSize(12).fillColor(primaryColor).text('CURRENT ACTIVITIES', rightColX, rightY);
  rightY += 18;
  doc.moveTo(rightColX, rightY).lineTo(rightColX + rightColWidth, rightY).lineWidth(0.5).strokeColor(lightGray).stroke();
  rightY += 10;

  doc.font('NanumBold').fontSize(8.5).fillColor(textColor).text('2024 - 2026', rightColX, rightY);
  rightY += 12;
  doc.font('NanumRegular').fontSize(8).fillColor(primaryColor).text('통번역 업무', rightColX, rightY);
  rightY += 18;

  doc.font('NanumBold').fontSize(8).fillColor(primaryColor).text('강서실용음악학원', rightColX, rightY);
  rightY += 12;
  doc.font('NanumRegular').fontSize(8).fillColor(textColor).text('출강', rightColX, rightY);

  doc.end();

  return new Promise((resolve) => {
    stream.on('finish', () => {
      console.log('PDF generation complete: public/resume.pdf');
      resolve(true);
    });
  });
}

generatePDF().catch(console.error);
