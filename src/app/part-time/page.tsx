'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  PlusCircle, 
  Phone, 
  ChevronRight, 
  Globe2, 
  Clock, 
  Calendar,
  Users2,
  CheckCircle2,
  Sparkles,
  Zap,
  Coins,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function PartTimePage() {
  // 상태 관리
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'korean' | 'foreigner'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'weekend' | 'short' | 'daily'>('all'); // 주말/단기/일당/전체
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [keyword, setKeyword] = useState('');

  // 지역 목록
  const regions = [
    '전체', '서울', '경기', '인천', '부산',
    '경남', '경북', '대구', '광주',
    '대전', '전남', '전북', '충남',
    '충북', '세종', '울산', '강원',
    '제주', '전국'
  ];

  // 직종 목록
  const jobCategories = [
    '전체', '룸메이드', '청소', '가사 도우미', '영어 도우미', 
    '용접공', '유학생 알바', '제조업', '간병인', '기타'
  ];

  // 알바 실제 데이터셋 (호텔 룸메이드 주말/단기, 물류 패킹, 식음료 서빙, 단순 제조 등)
  const partTimeJobs = [
    {
      id: '1',
      target: 'foreigner',
      targetLabel: '외국인환영',
      category: '룸메이드',
      title: '특급 호텔&리조트 객실 청소/베딩 주말 파트타임 (초보가능)',
      region: '제주',
      wage: '시급 12,000원',
      workTime: '토/일 09:30 ~ 16:30',
      period: 'weekend',
      periodLabel: '주말알바',
      date: '08-14',
      isHot: true,
      views: 380,
      desc: '서귀포 중문 특급호텔. 셔틀버스 운행, 중식 무료 제공. 내외국인(D-2 허가증, F비자) 모두 가능.'
    },
    {
      id: '2',
      target: 'all',
      targetLabel: '내·외국인',
      category: '기타',
      title: '식자재 신선물류센터 소분 및 패킹 단기/야간 알바 (일급 당일지급)',
      region: '인천',
      wage: '일급 135,000원',
      workTime: '주 3~5일 선택 (20:00~05:00)',
      period: 'daily',
      periodLabel: '당일지급',
      date: '08-12',
      isHot: true,
      views: 295,
      desc: '단순 포장 및 바코드 검수. 초보자 누구나 즉시 가능. 주휴수당 별도 지급.'
    },
    {
      id: '3',
      target: 'foreigner',
      targetLabel: '유학생가능',
      category: '유학생 알바',
      title: '주말 브런치 카페 및 베이커리 매장 홀서빙 & 정리 보조',
      region: '서울',
      wage: '시급 11,000원',
      workTime: '주말 토/일 (11:00~17:00)',
      period: 'weekend',
      periodLabel: '주말알바',
      date: '08-10',
      isHot: false,
      views: 220,
      desc: '밝고 성실한 분. 유학생(D-2 시간제 취업허가 필수), 주휴수당 포함 지급.'
    },
    {
      id: '4',
      target: 'all',
      targetLabel: '내·외국인',
      category: '청소',
      title: '신축 아파트 및 오피스 준공 입주청소 단기 3일 집중 알바',
      region: '경기',
      wage: '일당 150,000원',
      workTime: '08:00 ~ 17:00 (점심시간 1시간)',
      period: 'short',
      periodLabel: '단기알바',
      date: '08-08',
      isHot: true,
      views: 410,
      desc: '준공 청소 보조 및 폐기물 정리. 현장 당일 지급 가능, 중식 제공.'
    },
    {
      id: '5',
      target: 'foreigner',
      targetLabel: '외국인우대',
      category: '제조업',
      title: '화장품 케이스 스티커 부착 및 박스 단순 포장 단기 알바',
      region: '경기',
      wage: '시급 10,800원',
      workTime: '평일 월~금 (09:00~18:00)',
      period: 'short',
      periodLabel: '단기알바',
      date: '08-06',
      isHot: false,
      views: 175,
      desc: '에어컨 완비 쾌적한 실내 클린룸. 잔업 시 수당 1.5배 적용.'
    },
    {
      id: '6',
      target: 'korean',
      targetLabel: '내국인',
      category: '가사 도우미',
      title: '주 3회 오전 정기 가사 및 정리수납 파트타임 (시간선택 가능)',
      region: '서울',
      wage: '시급 16,000원',
      workTime: '월/수/금 (09:00~13:00)',
      period: 'short',
      periodLabel: '시간선택',
      date: '08-03',
      isHot: false,
      views: 140,
      desc: '가사 경력자 우대. 자녀 등하교 시간 맞춤 근무 가능.'
    },
  ];

  // 필터링 계산
  const filteredJobs = partTimeJobs.filter(job => {
    if (selectedTarget !== 'all') {
      if (selectedTarget === 'foreigner' && job.target === 'korean') return false;
      if (selectedTarget === 'korean' && job.target === 'foreigner') return false;
    }
    if (selectedPeriod !== 'all' && job.period !== selectedPeriod) return false;
    if (selectedRegion !== '전체' && job.region !== selectedRegion) return false;
    if (selectedCategory !== '전체' && job.category !== selectedCategory) return false;
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCat = job.category.toLowerCase().includes(q);
      const matchRegion = job.region.toLowerCase().includes(q);
      const matchWage = job.wage.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchRegion && !matchWage) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-16">
      
      {/* 1. 상단 3단 비주얼 큐레이션 배너 (전체 사이트 규격 일체화) */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 배너 1: 당일지급 / 단기알바 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all border border-emerald-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner2.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-teal-950/50 to-emerald-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Daily & Short Term
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  단기 &middot; 일당 알바<br />당일/주급 정산 매칭
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  물류 패킹, 행사 보조, 준공 청소, 급구 생산 라인 등 원하는 날짜에 즉시 근무
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <a href="tel:010-5731-8578" className="hover:underline flex items-center gap-1">
                  <span>급구 알바 실시간 문의</span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                </a>
                <Zap className="w-5 h-5 text-emerald-200" />
              </div>
            </div>

            {/* 배너 2: 호텔 룸메이드 주말 알바 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-blue-500/40 hover:-translate-y-1 transition-all border border-blue-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner1.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-blue-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Weekend Hospitality
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  호텔&middot;리조트 룸메이드<br />주말/투잡 맞춤 알바
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  주말 토/일 하루 6~7시간. 초보자 환영, 기숙사/셔틀 지원 현장 다수 보유
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/jobs" className="hover:underline flex items-center gap-1">
                  <span>호텔 룸메이드 공고 보기</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                </Link>
                <Building2 className="w-5 h-5 text-blue-200" />
              </div>
            </div>

            {/* 배너 3: 유학생(D-2) 합법 시간제 취업 알바 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-orange-500/40 hover:-translate-y-1 transition-all border border-orange-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner3.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-orange-950/50 to-orange-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Legal Part-Time
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  유학생(D-2) 시간제 알바<br />출입국 허가 대행
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  합법적 시간제 취업 허가증 취득 지원. 외국인 학생을 위한 안전한 사업장 보증
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/student-jobs" className="hover:underline flex items-center gap-1">
                  <span>유학생 취업 전용관</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                </Link>
                <ShieldCheck className="w-5 h-5 text-amber-200" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 빠른 유형별 선택 태그 바 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 shrink-0">근무 형태:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: '전체 알바' },
                { id: 'weekend', label: '주말 알바' },
                { id: 'daily', label: '당일지급/일급' },
                { id: 'short', label: '단기/시간제' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPeriod(p.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedPeriod === p.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>근로기준법 준수 & 최저시급 보장</span>
          </div>
        </div>
      </section>

      {/* 3. 메인 콘텐츠: 2열 구성 (구인/구직과 통일된 사이드바 + 아르바이트 테이블) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* [좌측 사이드바: 3컬럼] */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* 1) 지역별 구인/구직 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-emerald-600 text-white px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-emerald-200" />
                  <span>지역별 구인 / 구직</span>
                </div>
                <span className="text-[11px] bg-emerald-700 px-2 py-0.5 rounded text-emerald-100">전국</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  {regions.map((region, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedRegion(region)}
                      className={`py-2 rounded-lg font-medium transition-all ${
                        selectedRegion === region
                          ? 'bg-emerald-600 text-white font-bold shadow-sm'
                          : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2) 직종별 구인/구직 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>직종별 구인 / 구직</span>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100 text-xs">
                {jobCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition ${
                      selectedCategory === cat ? 'bg-emerald-50/80 font-bold text-emerald-700' : 'text-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className="text-left font-medium hover:text-emerald-700 flex-1"
                    >
                      {cat}
                    </button>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Link
                        href="/jobs"
                        className="px-2 py-1 rounded text-[11px] font-bold bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 transition"
                      >
                        구인
                      </Link>
                      <Link
                        href="/resumes"
                        className="px-2 py-1 rounded text-[11px] font-bold bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 transition"
                      >
                        구직
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3) 긴급 상담 안내 배너 (스크린샷 원본 디자인 100% 완벽 계승) */}
            <div className="bg-[#f7fafc] rounded-2xl border border-slate-200/80 p-6 text-center shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-xs font-bold text-slate-700 leading-snug mb-2">
                구직&middot;구인 희망시<br />
                포스팅 또는 <span className="text-emerald-700 font-extrabold">록산에버그린</span>으로<br />
                연락주세요!
              </p>
              <div className="text-base sm:text-lg font-black text-emerald-800 tracking-tight mt-2">
                <span className="text-emerald-600">T. </span>010-5731-8578
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">
                <span className="text-emerald-700">E-mail. </span>
                <a href="mailto:roksan22@daum.net" className="hover:underline text-slate-800">
                  roksan22@daum.net
                </a>
              </div>
              <a
                href="tel:010-5731-8578"
                className="mt-4 block w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
              >
                전화 상담 바로 연결
              </a>
            </div>

          </aside>

          {/* [우측 메인: 9컬럼 아르바이트 테이블 목록] */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-5">
            
            {/* 상단 라지 탭 [전체 알바 | 외국인 알바 | 내국인 알바] */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-slate-200">
              <div className="flex items-center gap-6 text-base sm:text-lg font-black">
                <button
                  onClick={() => setSelectedTarget('all')}
                  className={`pb-2 -mb-2 border-b-2 transition ${
                    selectedTarget === 'all'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  전체 아르바이트 ({partTimeJobs.length})
                </button>
                <button
                  onClick={() => setSelectedTarget('foreigner')}
                  className={`pb-2 -mb-2 border-b-2 transition flex items-center gap-1.5 ${
                    selectedTarget === 'foreigner'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Globe2 className="w-4 h-4" />
                  <span>외국인&middot;유학생 환영 ({partTimeJobs.filter(j => j.target !== 'korean').length})</span>
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setSelectedTarget('korean')}
                  className={`pb-2 -mb-2 border-b-2 transition ${
                    selectedTarget === 'korean'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  내국인 ({partTimeJobs.filter(j => j.target !== 'foreigner').length})
                </button>
              </div>

              {/* 건수 카운트 */}
              <div className="text-xs sm:text-sm text-slate-500 font-semibold">
                전체 <strong className="text-emerald-600 font-black">{filteredJobs.length}</strong>건 / 1 페이지
              </div>
            </div>

            {/* 검색 & 정렬 필터 박스 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                
                {/* 지역 셀렉트 */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">지역 선택</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value="전체">지역: 전체</option>
                    {regions.filter(r => r !== '전체').map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* 직종 분야 셀렉트 */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">직종 분야</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                  >
                    <option value="전체">분야: 전체</option>
                    {jobCategories.filter(c => c !== '전체').map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* 검색어 인풋 & 검색 버튼 */}
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">키워드 검색</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="공고 제목, 급여, 근무시간, 지역 검색"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-500"
                    />
                    <button
                      onClick={() => {}}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition shrink-0"
                    >
                      검색하기
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* PC 및 태블릿: 정통 테이블 뷰 (md 이상) */}
            <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 text-slate-500 text-xs font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4 w-28 text-center">구분 / 분야</th>
                      <th className="py-3.5 px-4">아르바이트 모집 공고</th>
                      <th className="py-3.5 px-4 w-32 text-center">급여 (시급/일급)</th>
                      <th className="py-3.5 px-4 w-24 text-center">근무형태</th>
                      <th className="py-3.5 px-4 w-20 text-center">지역</th>
                      <th className="py-3.5 px-4 w-20 text-center">등록일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <tr 
                          key={job.id} 
                          className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                        >
                          {/* 구분 / 분야 */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition">
                              {job.category}
                            </span>
                          </td>

                          {/* 제목 및 뱃지 */}
                          <td className="py-4 px-4 font-semibold text-slate-800">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                {job.targetLabel}
                              </span>
                              <span className="group-hover:text-emerald-600 transition text-sm sm:text-base">
                                {job.title}
                              </span>
                              {job.isHot && (
                                <span className="inline-flex items-center text-rose-500 text-[10px] font-black italic bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">
                                  급구
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 font-normal mt-1 flex items-center gap-3">
                              <span className="flex items-center gap-1 text-slate-500">
                                <Clock className="w-3.5 h-3.5" />
                                {job.workTime}
                              </span>
                              <span className="hidden md:inline text-slate-400 truncate max-w-sm">
                                {job.desc}
                              </span>
                            </div>
                          </td>

                          {/* 급여 */}
                          <td className="py-4 px-4 text-center text-xs font-black text-emerald-700">
                            <span className="bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg inline-block">
                              {job.wage}
                            </span>
                          </td>

                          {/* 근무형태 */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-slate-600">
                            <span className="bg-slate-100 px-2 py-1 rounded-md">
                              {job.periodLabel}
                            </span>
                          </td>

                          {/* 지역 */}
                          <td className="py-4 px-4 text-center text-xs font-medium text-slate-600">
                            {job.region}
                          </td>

                          {/* 등록일 */}
                          <td className="py-4 px-4 text-center text-xs text-slate-400 font-medium">
                            {job.date}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-slate-400 text-xs sm:text-sm">
                          해당 조건에 부합하는 아르바이트 공고가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 모바일 전용: 커뮤니티처럼 각 항목이 독립된 둥근 카드 박스로 분리된 피드 (< md) */}
            <div className="md:hidden space-y-3.5">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all active:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          [{job.targetLabel}]
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {job.category}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                          {job.periodLabel}
                        </span>
                        {job.isHot && (
                          <span className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded italic">
                            급구
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {job.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                      {job.desc}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                        {job.wage}
                      </span>
                      <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {job.workTime.split(' ')[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.region}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
                  해당 조건에 부합하는 아르바이트 공고가 없습니다.
                </div>
              )}
            </div>

            {/* 하단 페이지네이션 & 알바 공고 등록 바 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                표시 중: 1 ~ {filteredJobs.length} of {filteredJobs.length} 건
              </div>

              {/* 페이지 네비게이션 */}
              <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&lt;&lt;</button>
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&lt;</button>
                <button className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold">1</button>
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&gt;</button>
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&gt;&gt;</button>
              </div>

              {/* 알바 공고 등록 버튼 */}
              <Link
                href="/visa-inquiry"
                className="w-full sm:w-auto text-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>알바 공고 등록 (무료)</span>
              </Link>
            </div>

          </main>
        </div>
      </section>

    </div>
  );
}
