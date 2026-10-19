import { useState } from 'react';
import { 
  Zap, 
  Target, 
  Layers, 
  SlidersHorizontal, 
  Headphones, 
  ShieldCheck, 
  Sliders, 
  Terminal, 
  Package, 
  Activity, 
  Volume2, 
  Scissors, 
  FileCheck, 
  GitMerge, 
  FlaskConical, 
  Sparkles, 
  Search, 
  Workflow, 
  MessageSquare, 
  Send, 
  Check
} from 'lucide-react';

export function ReaperProductionWorkflowSection() {
  const [activeApproach, setActiveApproach] = useState<'hybrid' | 'topDown' | 'bottomUp'>('hybrid');

  return (
    <section 
      id="workflow" 
      aria-label="REAPER 실무 워크플로"
      className="relative py-14 px-4 sm:px-6 lg:px-8 bg-[#0b140e] text-[#f0f8f3] border-t border-[#1a2e20]"
    >
      <div className="max-w-5xl mx-auto">

        {/* 섹션 헤더 (간결한 타이틀) */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#132317] border border-[#223d29] mb-2.5">
            <span className="w-2 h-2 rounded-full bg-[#48a770] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#74c995] font-semibold">
              REAPER PRODUCTION WORKFLOW
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-futura tracking-tight">
            실무 사운드 제작 워크플로
          </h2>
          <p className="text-xs sm:text-sm text-[#9cb1a3] mt-1 max-w-lg mx-auto">
            대량 사운드 제작이 필요한 상황에서 스크립트 자동화를 활용한 작업 효율 최적화
          </p>
        </div>

        {/* 2x2 반응형 아이콘 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

          {/* ========================================================= */}
          {/* 01. 빠른 제작과 대량 바리에이션 */}
          {/* ========================================================= */}
          <div className="p-5 rounded-2xl bg-[#0f1a12] border border-[#203626] flex flex-col justify-between hover:border-[#2f5339] transition-colors">
            <div>
              {/* 카드 상단 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#182c1e] border border-[#2a4d34] flex items-center justify-center text-[#48a770]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5f7a68] uppercase font-bold tracking-wider">01</span>
                    <h3 className="text-sm sm:text-base font-bold text-white font-futura">
                      빠른 제작 &amp; 대량 바리에이션
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#74c995] bg-[#142619] px-2 py-0.5 rounded border border-[#22402a]">
                  반복감 최소화
                </span>
              </div>

              {/* 4단계 아이콘 파이프라인 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  {
                    step: '1',
                    icon: <Target className="w-4 h-4 text-[#48a770]" />,
                    title: '방향 설정',
                    sub: '레퍼런스·기획 분석'
                  },
                  {
                    step: '2',
                    icon: <Layers className="w-4 h-4 text-[#74c995]" />,
                    title: 'nvk_CREATE',
                    sub: '고속 레이어링'
                  },
                  {
                    step: '3',
                    icon: <SlidersHorizontal className="w-4 h-4 text-emerald-300" />,
                    title: 'nvk_VARIATIONS',
                    sub: '피치·타이밍 변주'
                  },
                  {
                    step: '4',
                    icon: <Headphones className="w-4 h-4 text-amber-400" />,
                    title: '수동 검수',
                    sub: '핵심 바디 보존'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#0b130e] border border-[#1b2e21] flex flex-col items-center text-center relative group"
                  >
                    <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#4e6856] font-semibold">
                      #{item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#142418] border border-[#233d2a] flex items-center justify-center my-1">
                      {item.icon}
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight mt-0.5">{item.title}</div>
                    <div className="text-[9px] text-[#8ea395] mt-0.5 leading-tight">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 강조 문구 */}
            <div className="pt-2.5 border-t border-[#1a2d1f] flex items-center gap-1.5 text-[11px] text-[#a3e2bb]">
              <Check className="w-3.5 h-3.5 text-[#48a770] shrink-0" />
              <span>&ldquo;자동화로 제작 속도를 높이고, 최종 사운드의 완성도는 직접 판단합니다.&rdquo;</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 02. 효율적인 편집과 품질 관리 */}
          {/* ========================================================= */}
          <div className="p-5 rounded-2xl bg-[#0f1a12] border border-[#203626] flex flex-col justify-between hover:border-[#2f5339] transition-colors">
            <div>
              {/* 카드 상단 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#182c1e] border border-[#2a4d34] flex items-center justify-center text-[#48a770]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5f7a68] uppercase font-bold tracking-wider">02</span>
                    <h3 className="text-sm sm:text-base font-bold text-white font-futura">
                      효율적인 편집 &amp; 품질 관리
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#74c995] bg-[#142619] px-2 py-0.5 rounded border border-[#22402a]">
                  일관된 품질
                </span>
              </div>

              {/* 툴킷 & QC 아이콘 블록 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {/* 툴킷 (4개 아이콘 리스트) */}
                <div className="p-2.5 rounded-xl bg-[#0b130e] border border-[#1b2e21] flex flex-col justify-between gap-1.5">
                  <span className="text-[9px] font-mono uppercase text-[#5f7a68] font-bold">문제 해결 툴킷</span>
                  <div className="space-y-1.5">
                    {[
                      { icon: <Sliders className="w-3 h-3 text-[#48a770]" />, name: 'nvk_WORKFLOW', desc: '아이템 정렬·간격 정리' },
                      { icon: <Terminal className="w-3 h-3 text-[#74c995]" />, name: 'ReaScript', desc: '규칙 기반 자동 네이밍' },
                      { icon: <Package className="w-3 h-3 text-emerald-300" />, name: 'Batch Render', desc: 'Region 일괄 출력 (48k/24b)' },
                      { icon: <Activity className="w-3 h-3 text-amber-400" />, name: 'iZotope RX', desc: '잡음·아티팩트 무결점 제거' }
                    ].map((tool, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px]">
                        <div className="w-5 h-5 rounded bg-[#142318] flex items-center justify-center shrink-0">
                          {tool.icon}
                        </div>
                        <span className="font-mono font-bold text-white">{tool.name}</span>
                        <span className="text-[#8ea395] truncate">{tool.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5가지 QC 체크포인트 아이콘 */}
                <div className="p-2.5 rounded-xl bg-[#0b130e] border border-[#1b2e21] flex flex-col justify-between">
                  <span className="text-[9px] font-mono uppercase text-[#5f7a68] font-bold">5대 QC 체크</span>
                  <div className="grid grid-cols-1 gap-1.5 mt-1">
                    {[
                      { icon: <Volume2 className="w-3 h-3 text-[#48a770]" />, label: '음색 & 주파수 밸런스' },
                      { icon: <ShieldCheck className="w-3 h-3 text-[#74c995]" />, label: '바리에이션 간 일관된 임팩트' },
                      { icon: <SlidersHorizontal className="w-3 h-3 text-emerald-300" />, label: '피치 변형 아티팩트 청음' },
                      { icon: <Scissors className="w-3 h-3 text-amber-400" />, label: '클리핑·잡음 제거 & 테일 페이드' },
                      { icon: <FileCheck className="w-3 h-3 text-sky-400" />, label: '네이밍 & 엔진 렌더 규격 준수' }
                    ].map((qc, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-[#c2dcce]">
                        {qc.icon}
                        <span className="truncate">{qc.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 한 줄 요약 */}
            <div className="pt-2.5 border-t border-[#1a2d1f] text-[10px] font-mono text-[#6f8b78]">
              * 대량 작업 시에도 음질 결함과 규격 오류를 사전에 100% 차단
            </div>
          </div>

          {/* ========================================================= */}
          {/* 03. 유연한 사운드 디자인 접근 */}
          {/* ========================================================= */}
          <div className="p-5 rounded-2xl bg-[#0f1a12] border border-[#203626] flex flex-col justify-between hover:border-[#2f5339] transition-colors">
            <div>
              {/* 카드 상단 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#182c1e] border border-[#2a4d34] flex items-center justify-center text-[#48a770]">
                    <GitMerge className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5f7a68] uppercase font-bold tracking-wider">03</span>
                    <h3 className="text-sm sm:text-base font-bold text-white font-futura">
                      유연한 사운드 디자인 접근
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#74c995] bg-[#142619] px-2 py-0.5 rounded border border-[#22402a]">
                  상황별 전환
                </span>
              </div>

              {/* 3가지 방식 아이콘 카드 (클릭으로 확인 가능) */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  {
                    id: 'hybrid',
                    icon: <Sparkles className="w-4 h-4" />,
                    title: 'Hybrid',
                    desc: '창의성과 작업 효율 통합',
                    color: 'text-[#74c995]'
                  },
                  {
                    id: 'topDown',
                    icon: <Target className="w-4 h-4" />,
                    title: 'Top-Down',
                    desc: '게임 기획·구조 선설계',
                    color: 'text-[#48a770]'
                  },
                  {
                    id: 'bottomUp',
                    icon: <FlaskConical className="w-4 h-4" />,
                    title: 'Bottom-Up',
                    desc: '폴리·신스 실험 소스 탐색',
                    color: 'text-emerald-300'
                  }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveApproach(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center ${
                      activeApproach === item.id
                        ? 'bg-[#15271a] border-[#48a770] shadow-sm'
                        : 'bg-[#0b130e] border-[#1b2e21] hover:border-[#284630]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${
                      activeApproach === item.id 
                        ? 'bg-[#48a770] text-white' 
                        : 'bg-[#142418] ' + item.color
                    }`}>
                      {item.icon}
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight">{item.title}</div>
                    <div className="text-[9px] text-[#8ea395] mt-0.5 leading-tight">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 디자인 철학 바 */}
            <div className="pt-2.5 border-t border-[#1a2d1f] text-[11px] text-[#c2dcce] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#48a770] shrink-0" />
              <span>레퍼런스 기준 톤 분석과 다이내믹·질감·공간감 대비를 통한 임팩트 설계</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 04. 빠른 실무 적응과 협업 */}
          {/* ========================================================= */}
          <div className="p-5 rounded-2xl bg-[#0f1a12] border border-[#203626] flex flex-col justify-between hover:border-[#2f5339] transition-colors">
            <div>
              {/* 카드 상단 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#182c1e] border border-[#2a4d34] flex items-center justify-center text-[#48a770]">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#5f7a68] uppercase font-bold tracking-wider">04</span>
                    <h3 className="text-sm sm:text-base font-bold text-white font-futura">
                      빠른 실무 적응 &amp; 협업
                    </h3>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#74c995] bg-[#142619] px-2 py-0.5 rounded border border-[#22402a]">
                  팀 파이프라인
                </span>
              </div>

              {/* 4단계 협업 파이프라인 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {[
                  {
                    step: '1',
                    icon: <Search className="w-4 h-4 text-[#48a770]" />,
                    title: '프로젝트 파악',
                    sub: '세션·네이밍 규격 흡수'
                  },
                  {
                    step: '2',
                    icon: <Workflow className="w-4 h-4 text-[#74c995]" />,
                    title: '워크플로 적용',
                    sub: '팀 룰 준수 속 자동화'
                  },
                  {
                    step: '3',
                    icon: <MessageSquare className="w-4 h-4 text-emerald-300" />,
                    title: '빠른 피드백',
                    sub: '핵심 사운드 선컨펌'
                  },
                  {
                    step: '4',
                    icon: <Send className="w-4 h-4 text-amber-400" />,
                    title: '정확한 전달',
                    sub: '즉시 엔진 탑재 세팅'
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#0b130e] border border-[#1b2e21] flex flex-col items-center text-center relative"
                  >
                    <span className="absolute top-1.5 left-2 text-[9px] font-mono text-[#4e6856] font-semibold">
                      STEP {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#142418] border border-[#233d2a] flex items-center justify-center my-1">
                      {item.icon}
                    </div>
                    <div className="text-[11px] font-bold text-white leading-tight mt-0.5">{item.title}</div>
                    <div className="text-[9px] text-[#8ea395] mt-0.5 leading-tight">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 하단 한 줄 요약 */}
            <div className="pt-2.5 border-t border-[#1a2d1f] text-[10px] font-mono text-[#6f8b78]">
              * 재작업 최소화 및 다른 작업자가 즉시 사용 가능한 상태로 패키징
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 하단 핵심 요약 배너 */}
        {/* ========================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0f1a12] border border-[#203626] flex items-center justify-center text-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#182c1e] border border-[#2a4d34] flex items-center justify-center text-[#48a770] shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                &ldquo;빠르게 제작하고, 정확하게 전달하며, 프로젝트에 유연하게 적응합니다.&rdquo;
              </p>
              <p className="text-[11px] text-[#8ea395] mt-0.5">
                REAPER에서 가공된 모든 사운드는 Wwise 및 Unreal 파이프라인과 호환됩니다.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
