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
  Sparkles, 
  Globe2, 
  Flame, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  Languages, 
  Users2,
  Calendar,
  Filter
} from 'lucide-react';

export default function JobsPage() {
  // 상태 관리
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'korean' | 'foreigner'>('all'); // 내국인 / 외국인 / 전체
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchField, setSearchField] = useState('all'); // 제목+내용
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 지역 목록
  const regions = [
    '전체', '서울', '경기', '인천', '부산',
    '경남', '경북', '대구', '광주',
    '대전', '전남', '전북', '충남',
    '충북', '세종', '울산', '강원',
    '제주'
  ];

  // 직종 목록
  const jobCategories = [
    '전체', '룸메이드', '청소', '가사 도우미', '영어 도우미', 
    '용접공', '유학생 알바', '제조업', '간병인', '기타'
  ];

  // 기존 사이트의 구인 실제 데이터셋
  const allJobs = [
    { id: '1', target: 'foreigner', targetLabel: '외국인', category: '룸메이드', title: '룸메이드 구합니다. 태국여성 환영 / 기숙사 완비', region: '경기', date: '08-14', isHot: true, views: 185, salary: '월 270만' },
    { id: '2', target: 'foreigner', targetLabel: '외국인', category: '기타', title: 's.n 에서 일할수 있는 사람을 찾고 있습니다.', region: '제주', date: '08-08', isHot: true, views: 120, salary: '월 260만' },
    { id: '3', target: 'foreigner', targetLabel: '외국인', category: '제조업', title: '생산직급구 (F4, H2 환영, 초보자 가능)', region: '전국', date: '08-07', isHot: true, views: 240, salary: '월 290만' },
    { id: '4', target: 'foreigner', targetLabel: '외국인', category: '기타', title: '식자재 물류패킹, 소분포장 주/야간 교대', region: '인천', date: '08-06', isHot: true, views: 98, salary: '시급 11,500원' },
    { id: '5', target: 'foreigner', targetLabel: '외국인', category: '제조업', title: '화장지 원료제조 단순작업 급구', region: '경기', date: '08-06', isHot: true, views: 142, salary: '월 280만' },
    { id: '6', target: 'foreigner', targetLabel: '외국인', category: '기타', title: '외국인 여자 급구함 (기숙사 제공, 청소/보조)', region: '경기', date: '07-17', isHot: true, views: 210, salary: '월 250만' },
    { id: '7', target: 'foreigner', targetLabel: '외국인', category: '기타', title: 'plastering work (미장/조적 기술 인력 구인)', region: '서울', date: '07-16', isHot: true, views: 175, salary: '일당 19만' },
    { id: '8', target: 'korean', targetLabel: '내국인', category: '청소', title: '외국인 직원 구할 수 있을까요? 현장 청소관리자', region: '경기', date: '07-15', isHot: true, views: 130, salary: '월 300만' },
    { id: '9', target: 'foreigner', targetLabel: '외국인', category: '유학생 알바', title: '유학생 파트타임 구인합니다. (D-2 허가증 필수)', region: '제주', date: '06-21', isHot: true, views: 320, salary: '시급 10,500원' },
    { id: '10', target: 'foreigner', targetLabel: '외국인', category: '룸메이드', title: 'roommaid recruitment for Jeju Hotel & Resort', region: '제주', date: '05-23', isHot: true, views: 290, salary: '월 265만' },
    { id: '11', target: 'foreigner', targetLabel: '외국인', category: '용접공', title: '조선소 선박 배관 용접사 (E-7 특정활동비자 승인 지원)', region: '울산', date: '05-10', isHot: false, views: 410, salary: '월 430만' },
    { id: '12', target: 'korean', targetLabel: '내국인', category: '간병인', title: '제주시 요양원 야간 간병 및 보조 인력 구인', region: '제주', date: '05-02', isHot: false, views: 88, salary: '월 280만' },
  ];

  // 필터링 계산
  const filteredJobs = allJobs.filter(job => {
    if (selectedTarget !== 'all' && job.target !== selectedTarget) return false;
    if (selectedRegion !== '전체' && job.region !== selectedRegion) return false;
    if (selectedCategory !== '전체' && job.category !== selectedCategory) return false;
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCat = job.category.toLowerCase().includes(q);
      const matchRegion = job.region.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchRegion) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-16">
      
      {/* 1. 상단 3단 비주얼 큐레이션 배너 (스크린샷 속 3대 핵심 카드를 모던 UI로 승격) */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 배너 1: 회사소개 & 자산관리/아웃소싱 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all border border-blue-400/40 min-h-[230px]">
              {/* 배경 이미지: 선명하게 노출 */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner1.jpg')` }}
              ></div>
              {/* 은은한 틴트 오버레이 (이미지가 또렷이 보이도록 투명도 완화) */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-blue-900/30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/90 backdrop-blur-md flex items-center justify-center font-bold text-sm text-white shadow-md border border-white/30">
                    록
                  </div>
                  <div className="bg-slate-900/60 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                    <div className="text-xs font-bold text-blue-300">록산에버그린 Roksan Evergreen</div>
                    <div className="text-[11px] text-white/90 font-medium">고용노동부 등록 정식 인력공급기관</div>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white leading-snug mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  자산관리 및 아웃소싱 전문기업<br />
                  <span className="text-blue-300 underline decoration-blue-400 underline-offset-4">록산에버그린(주)</span>을 소개합니다.
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  호텔·리조트, 시설관리, 생산제조 전문 인력 파견 및 채용 대행 원스톱 솔루션
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/about" className="hover:underline flex items-center gap-1">
                  <span>회사 소개 바로가기</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                </Link>
                <Building2 className="w-5 h-5 text-blue-200" />
              </div>
            </div>

            {/* 배너 2: We supply Manpower (전문 직종 인력 공급) */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-orange-500/40 hover:-translate-y-1 transition-all border border-amber-400/40 min-h-[230px]">
              {/* 배경 이미지: 선명하게 노출 */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner2.jpg')` }}
              ></div>
              {/* 은은한 틴트 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-amber-950/50 to-orange-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-amber-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Join Our Team
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  We supply Manpower
                </h3>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-amber-50 font-bold mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <span className="flex items-center gap-1.5">&bull; Room-maid</span>
                  <span className="flex items-center gap-1.5">&bull; Housekeeper</span>
                  <span className="flex items-center gap-1.5">&bull; Cleaning</span>
                  <span className="flex items-center gap-1.5">&bull; English Helper</span>
                  <span className="flex items-center gap-1.5">&bull; Welder (용접공)</span>
                  <span className="flex items-center gap-1.5">&bull; Factory Work</span>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/jobs" className="hover:underline flex items-center gap-1">
                  <span>전문 직종 인력 요청하기</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                </Link>
                <Users2 className="w-5 h-5 text-amber-200" />
              </div>
            </div>

            {/* 배너 3: Language Training & Student Job Arrangement */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all border border-emerald-400/40 min-h-[230px]">
              {/* 배경 이미지: 선명하게 노출 */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner3.jpg')` }}
              ></div>
              {/* 은은한 틴트 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-teal-950/50 to-emerald-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Global Education & Visa
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Language Training<br />Arrangement
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  한국 유학 비자(D-2, D-4) 어학연수 매칭 및 시간제 취업 허가증(파트타임) 합법 알선
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/visa-inquiry" className="hover:underline flex items-center gap-1">
                  <span>유학&middot;비자 상담 신청</span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                </Link>
                <GraduationCap className="w-5 h-5 text-emerald-200" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 메인 콘텐츠: 2열 구성 (좌측 지역/직종 사이드바 + 우측 구인목록 및 검색) */}
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

            {/* 2) 직종별 구인/구직 (구인/구직 버튼 분기 완벽 지원) */}
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
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                          selectedCategory === cat
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600'
                        }`}
                      >
                        구인
                      </button>
                      <Link
                        href="/resumes"
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-600 font-bold text-[11px] transition"
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

          {/* [우측 본문: 9컬럼] 내국인/외국인 탭 + 검색 필터 바 + 구인 테이블 */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">

            {/* 1) [내국인 | 외국인 | 전체] 상단 라지 탭 (원본 UI 완벽 계승) */}
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
                  전체 구인 ({allJobs.length})
                </button>
                <button
                  onClick={() => setSelectedTarget('korean')}
                  className={`pb-2 -mb-2 border-b-2 transition ${
                    selectedTarget === 'korean'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  내국인 ({allJobs.filter(j => j.target === 'korean').length})
                </button>
                <span className="text-slate-300">|</span>
                <button
                  onClick={() => setSelectedTarget('foreigner')}
                  className={`pb-2 -mb-2 border-b-2 transition flex items-center gap-1.5 ${
                    selectedTarget === 'foreigner'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  <Globe2 className="w-4 h-4" />
                  <span>외국인 ({allJobs.filter(j => j.target === 'foreigner').length})</span>
                </button>
              </div>

              {/* 건수 카운트 */}
              <div className="text-xs sm:text-sm text-slate-500 font-semibold">
                전체 <strong className="text-emerald-600 font-black">{filteredJobs.length}</strong>건 / 1 페이지
              </div>
            </div>

            {/* 2) 검색 & 정렬 필터 박스 (기존 사이트의 지역, 분야, 검색어 폼을 세련되게 통합) */}
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
                      placeholder="검색어를 입력해주세요."
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

            {/* 3) 구인 리스트 테이블 (스크린샷 속 컬럼: 분야, 제목 [내/외국인], 지역, 등록일 완벽 구현) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 text-slate-500 text-xs font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4 w-28 text-center">분야</th>
                      <th className="py-3.5 px-4">구인 제목</th>
                      <th className="py-3.5 px-4 w-28 text-center">급여</th>
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
                          {/* 분야 */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition">
                              {job.category}
                            </span>
                          </td>

                          {/* 제목 및 [내/외국인] 뱃지 */}
                          <td className="py-4 px-4 font-semibold text-slate-800">
                            <Link href={`/jobs/${job.id}`} className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded ${
                                job.target === 'foreigner' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-slate-200 text-slate-800'
                              }`}>
                                [{job.targetLabel}]
                              </span>
                              <span className="group-hover:text-emerald-600 transition text-sm sm:text-base">
                                {job.title}
                              </span>
                              {job.isHot && (
                                <span className="inline-flex items-center text-rose-500 text-[10px] font-black italic">
                                  HOT
                                </span>
                              )}
                            </Link>
                          </td>

                          {/* 급여 */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-emerald-600">
                            {job.salary}
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
                        <td colSpan={5} className="py-16 text-center text-slate-400 text-xs sm:text-sm">
                          해당 조건에 부합하는 구인 공고가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* 테이블 하단 페이지네이션 & 글쓰기 버튼 (스크린샷 원본의 << < > >> 및 글쓰기 버튼 완벽 지원) */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
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

                {/* 글쓰기 버튼 */}
                <Link
                  href="/jobs/new"
                  className="bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>글쓰기 (공고 등록)</span>
                </Link>
              </div>

            </div>

          </main>
        </div>
      </section>

    </div>
  );
}
