'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  ShieldCheck, 
  Users2, 
  Globe2, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  FileCheck,
  ChevronRight,
  Briefcase,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const companyMilestones = [
    { year: '2024 ~ 현재', title: '글로벌 인력 매칭 플랫폼 전면 리뉴얼', desc: '16개국 취업 송출 네트워크 확대 및 외국인 비자(E7·E9·D2·F4) 행정 지원 체계 고도화' },
    { year: '2022', title: '제주 특급 호텔 & 리조트 인력 공급 협약 체결', desc: '도내 주요 호텔 객실 정비, 룸메이드, 시설관리 상시 인력 파견 체계 구축' },
    { year: '2020', title: '외국인 유학생(D-2) 시간제 취업 지원 사업 개시', desc: '합법적 체류 자격 연계 및 출입국관리사무소 행정 대행 서비스 런칭' },
    { year: '설립', title: '록산에버그린 주식회사 법인 설립', desc: '고용노동부 정식 직업소개사업 및 자산관리·아웃소싱 전문기업 출범' }
  ];

  const coreStrengths = [
    {
      icon: ShieldCheck,
      color: 'emerald',
      title: '100% 합법 체류 & 신원 보증',
      desc: '출입국관리법을 철저히 준수하여 비자 체류 자격(E7, E9, D2, F4 등)을 면밀히 검증하고, 기업과 근로자 모두에게 안전한 고용 환경을 보장합니다.'
    },
    {
      icon: Building2,
      color: 'blue',
      title: '호텔·제조·조선 특화 인력망',
      desc: '제주 및 전국 특급 호텔 룸메이드, 하우스키핑, 생산제조, 조선소 TIG 용접사 등 각 산업 현장에 최적화된 숙련된 맞춤 인재를 적시 공급합니다.'
    },
    {
      icon: Globe2,
      color: 'teal',
      title: '16개국 글로벌 협력 네트워크',
      desc: '베트남, 필리핀, 몽골, 우즈베키스탄 등 16개 송출국 파트너십을 바탕으로 성실하고 우수한 어학·기술 인력을 체계적으로 선발합니다.'
    },
    {
      icon: FileCheck,
      color: 'amber',
      title: '비자 발급·행정 원스톱 대행',
      desc: '복잡한 외국인 채용 서류, 비자 발급 및 연장, 체류자격 변경 행정 업무를 전문 상담원이 대행하여 기업의 행정 부담을 최소화합니다.'
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-20">
      
      {/* 1. 상단 히어로 배너 */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs sm:text-sm font-bold mb-4">
            <Building2 className="w-4 h-4" />
            <span>Company Introduction</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            기업과 인재를 잇는 신뢰의 가교,<br />
            <span className="text-emerald-400">록산에버그린(주)</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            록산에버그린은 내·외국인 전문 인력 공급, 자산관리 및 비자 행정 대행 분야에서 축적된 신뢰와 전문성을 바탕으로 건강한 고용 생태계를 만들어갑니다.
          </p>
        </div>
      </section>

      {/* 2. 대표 인사말 & 40년 전통의 비전 (1983년 출범 역사 계승) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          
          {/* 상단 핵심 슬로건 배너 (구 홈페이지 정통 문구 복원) */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden shadow-md">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 font-black text-xs rounded-full mb-3 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SINCE 1983 &middot; 40여 년의 신뢰와 역사</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-snug">
                <span className="text-emerald-400">록산에버그린(주)은 1983년 출범</span>한 이래,<br />
                국내 정상급의 자산관리 및 인재 아웃소싱 전문기업으로 성장하였습니다.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                지속적인 기술개발과 서비스 업무의 시스템화를 통해 고객사에는 최고의 생산성을, 근로자에게는 안정된 고용 환경을 보장하며 사회적 책임을 다하고 있습니다.
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 좌측 심볼 & 기업 신뢰 카드 */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-16 rounded-xl bg-[#8ab9ff] p-2 shadow-md mb-3 border border-sky-300 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/roksan_original_symbol.png" 
                    alt="록산에버그린 로고" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="text-xl font-black text-slate-900 mb-0.5">록산에버그린 주식회사</div>
                <div className="text-xs text-emerald-700 font-bold mb-3">ROKSAN EVERGREEN CO., LTD.</div>
                <div className="w-12 h-1 bg-emerald-500 rounded-full mb-3"></div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  “신뢰와 성실을 원칙으로 고객사의 파트너가 되어 높은 브랜드 가치를 유지하는 데 기여하겠습니다.”
                </p>
              </div>

              {/* 4대 핵심 인증 마크 요약 뱃지 카드 */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-slate-400 font-bold">경영혁신형 인증</div>
                  <div className="text-xs font-black text-emerald-700 mt-0.5">Main-Biz 인증기업</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-slate-400 font-bold">국제표준 품질경영</div>
                  <div className="text-xs font-black text-emerald-700 mt-0.5">ISO 9001 / 14001</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-slate-400 font-bold">식품안전경영</div>
                  <div className="text-xs font-black text-emerald-700 mt-0.5">ISO 22000 인증</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-[10px] text-slate-400 font-bold">인재 규모 (2023)</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5">임직원 610명 / 20억</div>
                </div>
              </div>
            </div>

            {/* 우측 대표 인사말 본문 (원본 철학 계승) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>CEO Greeting &middot; 대표 인사말</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                고객사의 성공 파트너이자,<br />
                근로자의 든든한 평생 길잡이가 되겠습니다.
              </h3>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 pt-1">
                <p>
                  안녕하십니까? 록산에버그린(주) 대표 김찬식입니다.
                </p>
                <p>
                  록산에버그린(주)은 <strong>1983년 10월 출범</strong>한 이래, 끊임없는 기술개발과 체계적인 서비스 시스템화를 바탕으로 국내 정상급의 자산관리 및 인재 아웃소싱 전문기업으로 쉼 없이 성장해 왔습니다.
                </p>
                <p>
                  또한 모든 임직원의 능력개발과 보편적 복지제도의 시행을 통해 안정적이고 성숙한 노사관계를 구축함으로써 고객사의 생산성 향상과 만족에 기여하고 있습니다.
                </p>
                <p>
                  특히 오늘날 심화되는 산업 현장의 구인난 속에서, <strong>합법 체류 비자 검증(E-7, E-9, F-4, D-2 등)과 전문 행정 지원</strong>을 아우르는 글로벌 인재 네트워크를 통해 기업에는 최고의 인재를, 근로자에게는 안전하고 보람찬 일터를 제공하고 있습니다.
                </p>
                <p>
                  축적된 40여 년의 역량과 신뢰를 바탕으로 귀사의 가장 든든한 비즈니스 파트너가 되어 높은 브랜드 가치를 유지하는 데 기여하겠습니다. 감사합니다.
                </p>
              </div>

              {/* 대표이사 서명 및 직인 영역 */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  국외유료직업소개사업 정식등록 &middot; 시설물종합관리업
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">록산에버그린(주) 대표이사</span>
                  <span className="text-lg font-black text-slate-900 tracking-wider">김 찬 식</span>
                  <div className="w-8 h-8 rounded-full border-2 border-red-600 text-red-600 font-bold text-[10px] flex items-center justify-center font-serif rotate-[-12deg] shadow-2xs">
                    印
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 록산에버그린 4대 핵심 역량 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-emerald-600 mb-1">Our Strengths</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">왜 록산에버그린인가?</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            체계화된 인력 선발 시스템과 비자 전문 행정 노하우로 업계 최고의 만족도를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreStrengths.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. 사업 영역 요약 (고화질 산업별 포토 카드 적용) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold text-emerald-600 mb-1">Our Core Business</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">록산에버그린 주요 사업 분야</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            호텔·제조·비자 행정 등 산업 현장과 고객사의 니즈에 최적화된 맞춤 인력 솔루션을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Business 01: 호텔·리조트 객실정비 */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-48 sm:h-52 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/business_hotel.jpg" 
                alt="특급호텔 및 리조트 객실정비 인력" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 bg-emerald-600/90 text-white font-black text-[11px] rounded-full backdrop-blur-xs shadow-xs">
                  Business 01
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-black text-white leading-snug drop-shadow-sm">
                  호텔 &middot; 리조트 객실정비
                </h3>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                제주 및 전국 특급호텔 룸메이드, 하우스키핑, 린넨실 정비, 세탁 및 공공구역 클리닝 상시 위탁 및 숙련 인력을 공급합니다.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold">#룸메이드 #하우스키핑 #제주호텔</span>
                <Link href="/jobs" className="text-slate-400 group-hover:text-emerald-600 font-bold transition flex items-center gap-0.5">
                  구인보기 &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Business 02: 조선소 용접·제조업 생산 */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-48 sm:h-52 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/business_manufacturing.jpg" 
                alt="조선소 용접 및 제조공장 생산 인력" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 bg-emerald-600/90 text-white font-black text-[11px] rounded-full backdrop-blur-xs shadow-xs">
                  Business 02
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-black text-white leading-snug drop-shadow-sm">
                  조선소 용접 &middot; 제조업 생산
                </h3>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                E-7 선박 배관 용접사(TIG), 자동차 부품가공, CNC 머시닝 센터 오퍼레이터, 물류패킹 및 제조 현장 숙련 인력을 공급합니다.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold">#E-7용접 #제조업생산 #스마트팩토리</span>
                <Link href="/jobs" className="text-slate-400 group-hover:text-emerald-600 font-bold transition flex items-center gap-0.5">
                  구인보기 &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* Business 03: 비자 행정·유학생 취업 */}
          <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="relative h-48 sm:h-52 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/business_visa.jpg" 
                alt="외국인 비자 행정 및 유학생 취업 컨설팅" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 bg-emerald-600/90 text-white font-black text-[11px] rounded-full backdrop-blur-xs shadow-xs">
                  Business 03
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-lg font-black text-white leading-snug drop-shadow-sm">
                  비자 행정 &middot; 유학생 취업
                </h3>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                D-2 시간제 취업허가 대행, E-7 / E-9 / F-4 비자 발급 및 체류자격 변경 연장, 외국인 유학·어학연수 과정을 전문 대행합니다.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-bold">#비자발급대행 #D-2유학생알바 #합법체류</span>
                <Link href="/visa-inquiry" className="text-slate-400 group-hover:text-emerald-600 font-bold transition flex items-center gap-0.5">
                  상담신청 &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 회사 개요 및 찾아오시는 길 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>기업 개요 및 소재지 안내</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
            {/* 구 홈페이지 원본 완벽 복원: 기업 개요 10대 공식 팩트 표 */}
            <div className="space-y-3">
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">회사명</span>
                <span className="font-bold text-slate-900">록산에버그린 주식회사</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">대표이사</span>
                <span className="font-bold text-slate-900">김찬식</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">설립일</span>
                <span className="font-bold text-emerald-800">
                  1983년 10월 <span className="text-[11px] font-normal text-emerald-600">(40여 년 업력)</span>
                </span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">사업자등록번호</span>
                <span className="text-slate-800 font-mono font-bold">616-81-02802</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">임직원수</span>
                <span className="font-bold text-slate-900">
                  610명 <span className="text-[11px] font-normal text-slate-400">(2023년 집계 기준)</span>
                </span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">자본금</span>
                <span className="font-bold text-slate-900">20억 원</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">업태 / 업종</span>
                <div className="text-slate-800 leading-snug">
                  <div><strong>서비스</strong></div>
                  <div className="text-xs text-slate-600 mt-0.5">시설물 종합관리업 및 인재파견, 유료직업소개업</div>
                </div>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">인허가 등록</span>
                <div className="text-slate-800 font-mono text-[11px] leading-relaxed">
                  <div>&bull; 직업소개업 : <strong className="text-slate-900">제주시 제2020-6510216-14-5-0001호</strong></div>
                  <div>&bull; 국외유료직업소개 : <strong className="text-emerald-700">f1630120240001</strong></div>
                </div>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">품질경영 인증</span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-800 border border-blue-200 rounded font-bold text-[10px]">
                    Main-Biz 인증
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-bold text-[10px]">
                    ISO 9001
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-bold text-[10px]">
                    ISO 14001
                  </span>
                  <span className="px-2 py-0.5 bg-teal-50 text-teal-800 border border-teal-200 rounded font-bold text-[10px]">
                    ISO 22000
                  </span>
                </div>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">전화 / 팩스</span>
                <span className="text-slate-800">
                  <strong className="text-emerald-700 font-bold">064-711-8578</strong> / 064-712-5512
                </span>
              </div>
              <div className="flex pb-1">
                <span className="w-28 text-slate-400 font-bold shrink-0">본사 소재지</span>
                <span className="text-slate-800">제주특별자치도 제주시 서광로 107-6 (용담이동)</span>
              </div>
            </div>

            {/* 본사 위치 안내 카드 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>제주 본사 오시는 길</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  제주국제공항 및 제주종합경기장 인근에 위치하고 있어 접근이 용이합니다. 방문 전 전화 예약해 주시면 원활한 1:1 상담이 가능합니다.
                </p>
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                  <div><strong>도로명:</strong> 제주특별자치도 제주시 서광로 107-6</div>
                  <div><strong>지번 주소:</strong> 제주시 용담이동 636-2</div>
                  <div><strong>대중교통:</strong> 용담이동 주민센터 또는 서광로 정류장 하차 도보 3분</div>
                </div>
              </div>

              {/* 안내 및 바로가기 4대 버튼 (2x2 동일 크기 그리드) */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-2.5">
                <div className="text-[11px] font-bold text-slate-500">빠른 길찾기 및 상담 연결:</div>
                <div className="grid grid-cols-2 gap-2.5">
                  {/* 1. 네이버 지도 */}
                  <a
                    href="https://naver.me/xPYiat3x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-3 bg-[#03C75A] hover:bg-[#02b350] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center"
                  >
                    <span className="bg-white text-[#03C75A] font-black text-[11px] w-4 h-4 rounded-full flex items-center justify-center shrink-0">N</span>
                    <span className="truncate">네이버 지도</span>
                  </a>

                  {/* 2. 카카오맵 */}
                  <a
                    href="https://map.kakao.com/link/search/제주특별자치도 제주시 서광로 107-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-3 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center"
                  >
                    <span className="bg-[#191919] text-[#FEE500] font-black text-[11px] w-4 h-4 rounded-full flex items-center justify-center shrink-0">K</span>
                    <span className="truncate">카카오맵</span>
                  </a>

                  {/* 3. 전화 문의 */}
                  <a
                    href="tel:064-711-8578"
                    className="h-11 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">본사 전화문의</span>
                  </a>

                  {/* 4. 온라인 상담 접수 */}
                  <Link
                    href="/visa-inquiry"
                    className="h-11 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-95 text-center"
                  >
                    <FileCheck className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">온라인 상담접수</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
