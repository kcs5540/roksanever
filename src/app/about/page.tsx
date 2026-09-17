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
  TrendingUp,
  Briefcase
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

      {/* 2. 대표 인사말 & 비전 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 좌측 심볼 & 핵심 슬로건 */}
            <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 text-center flex flex-col items-center justify-center">
              <div className="w-24 h-16 rounded-xl bg-[#8ab9ff] p-2 shadow-md mb-4 border border-sky-300 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/roksan_original_symbol.png" 
                  alt="록산에버그린 로고" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="text-xl font-black text-slate-900 mb-1">록산에버그린 주식회사</div>
              <div className="text-xs text-emerald-700 font-bold mb-4">ROKSAN EVERGREEN CO., LTD.</div>
              <div className="w-12 h-1 bg-emerald-500 rounded-full mb-4"></div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                “신뢰와 성실을 원칙으로 기업에는 최고의 생산성을, 근로자에게는 보람찬 일터와 안전한 정착을 선물합니다.”
              </p>
            </div>

            {/* 우측 대표 메시지 */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">CEO Greeting</div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                고객사의 성공 파트너이자,<br />
                외국인 근로자의 든든한 길잡이가 되겠습니다.
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 pt-2">
                <p>
                  안녕하십니까? 록산에버그린(주) 대표 김찬식입니다.
                </p>
                <p>
                  오늘날 대한민국 산업 현장은 만성적인 구인난에 직면해 있으며, 특히 호텔·리조트, 제조업, 건설, 농어촌 등 핵심 기반 산업에서 내·외국인 숙련 인력의 중요성은 나날이 커지고 있습니다.
                </p>
                <p>
                  록산에버그린은 단순한 구인구직 중개를 넘어, <strong>철저한 비자 체류 자격 검증과 합법적 행정 절차</strong>를 완벽히 지원함으로써 기업에는 안심하고 고용할 수 있는 우수 인재를, 근로자에게는 권익이 보장되는 양질의 일자리를 연결해 드리고 있습니다.
                </p>
                <p>
                  언제나 정직과 신의로 고객 여러분의 든든한 비즈니스 동반자가 될 것을 약속드립니다. 감사합니다.
                </p>
              </div>
              <div className="pt-3 text-right">
                <span className="text-xs text-slate-400">록산에버그린(주) 대표이사</span>
                <span className="text-base font-black text-slate-900 ml-2">김 찬 식</span>
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

      {/* 4. 사업 영역 요약 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-black mb-2">록산에버그린 주요 사업 분야</h2>
            <p className="text-xs sm:text-sm text-emerald-100">
              다양한 산업군의 요구에 맞춘 전문 인력 솔루션을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-xs font-bold text-emerald-300 mb-1">Business 01</div>
              <h3 className="text-base font-bold mb-2">호텔 &middot; 리조트 객실정비</h3>
              <p className="text-xs text-emerald-50 leading-relaxed">
                특급호텔 룸메이드, 하우스키핑, 린넨실 정비, 세탁 및 공공구역 클리닝 상시 위탁 및 인력 파견
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-xs font-bold text-emerald-300 mb-1">Business 02</div>
              <h3 className="text-base font-bold mb-2">조선소 용접 &middot; 제조업 생산</h3>
              <p className="text-xs text-emerald-50 leading-relaxed">
                E-7 선박 배관 용접사, 자동차 부품가공, CNC 머시닝 센터 오퍼레이터, 물류패킹 숙련 인력
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
              <div className="text-xs font-bold text-emerald-300 mb-1">Business 03</div>
              <h3 className="text-base font-bold mb-2">비자 행정 &middot; 유학생 취업</h3>
              <p className="text-xs text-emerald-50 leading-relaxed">
                D-2 시간제 취업허가 대행, E-7/E-9/F-4 비자 발급 및 체류기간 연장, 외국인 유학·어학연수 알선
              </p>
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
            {/* 기본 정보 표 */}
            <div className="space-y-3.5">
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">회사명</span>
                <span className="font-bold text-slate-800">록산에버그린 주식회사</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">대표자</span>
                <span className="text-slate-800">김찬식</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">사업자등록번호</span>
                <span className="text-slate-800 font-mono">616-81-02802</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">인허가 등록</span>
                <span className="text-slate-800">직업정보제공사업 신고 &middot; 유료직업소개사업 정식 등록</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">대표전화</span>
                <span className="font-bold text-emerald-600">064-711-8578</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">직통 휴대폰</span>
                <span className="font-bold text-emerald-700">010-7169-2255</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">팩스</span>
                <span className="text-slate-800">064-712-5512</span>
              </div>
              <div className="flex border-b border-slate-100 pb-2.5">
                <span className="w-28 text-slate-400 font-bold shrink-0">이메일</span>
                <span className="text-slate-800 font-mono">roksan22@daum.net</span>
              </div>
              <div className="flex pb-2">
                <span className="w-28 text-slate-400 font-bold shrink-0">본사 주소</span>
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
                  <div><strong>지번 주소:</strong> 제주시 용담이동 636-2 (서광로 107-6)</div>
                  <div><strong>대중교통:</strong> 용담이동 주민센터 또는 서광로 정류장 하차 도보 3분</div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="tel:064-711-8578"
                  className="flex-1 py-3 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow"
                >
                  본사 전화 문의하기
                </a>
                <Link
                  href="/visa-inquiry"
                  className="flex-1 py-3 text-center bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
                >
                  온라인 상담 접수
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
