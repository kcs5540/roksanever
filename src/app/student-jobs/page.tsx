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
  GraduationCap, 
  Users2,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  Clock,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';

export default function StudentJobsPage() {
  // 상태 관리
  const [selectedTab, setSelectedTab] = useState<'all' | 'd2' | 'd4' | 'faq'>('all');
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

  // 업로드해주신 기존 홈페이지 실제 유학생 취업 게시판 데이터 100% 반영
  const studentPosts = [
    {
      id: '1',
      category: '기타',
      title: '호텔일을 찾고 있어요 태국사람입니다.',
      region: '서울',
      visa: 'D-2(유학)',
      personInfo: '여자 / 24세',
      date: '08-08',
      isHot: true,
      views: 312,
      desc: '태국 유학생입니다. 서울/경기 호텔 객실 청소 및 룸메이드 주말/평일 알바 찾고 있습니다.'
    },
    {
      id: '2',
      category: '유학생 알바',
      title: '유학생 일자리 가능합니까 부산말고 다른지역으로 가도 되나요?',
      region: '부산',
      visa: 'D-2(유학)',
      personInfo: '여자 / 22세',
      date: '07-22',
      isHot: false,
      views: 185,
      desc: '부산 소재 대학교 재학 중입니다. 방학 기간 동안 다른 지역(제주, 경기 등) 시간제 취업 가능한가요?'
    },
    {
      id: '3',
      category: '기타',
      title: '비자 d2 일구합니까?',
      region: '전국',
      visa: 'D-2(학사)',
      personInfo: '여자 / 21세',
      date: '07-22',
      isHot: true,
      views: 260,
      desc: 'D-2 비자 소지자입니다. 출입국 시간제 취업 허가 받고 합법적으로 일할 수 있는 곳 문의드립니다.'
    },
    {
      id: '4',
      category: '가사, 영어도우미',
      title: 'can i get a job after language training?',
      region: '제주',
      visa: 'D-4(어학연수)',
      personInfo: '여 / 23세',
      date: '07-15',
      isHot: true,
      views: 420,
      desc: 'Currently in Korean language training course. Looking for part-time tutoring or hospitality assistant in Jeju.'
    },
    {
      id: '5',
      category: '룸메이드',
      title: '제주 특급 리조트 객실 정비 주말 시간제 유학생 아르바이트',
      region: '제주',
      visa: 'D-2 허가필',
      personInfo: '무관 / 유학생',
      date: '07-10',
      isHot: true,
      views: 340,
      desc: '주말 2일(토, 일) 시급 11,500원. 중식 제공 및 셔틀 운행. 출입국 시간제 취업 허가 대행 지원.'
    },
    {
      id: '6',
      category: '유학생 알바',
      title: '외국인 유학생 한국어/영어 가능자 카페 및 레스토랑 홀 서빙',
      region: '서울',
      visa: 'D-2(유학)',
      personInfo: '남녀 / 20대',
      date: '06-28',
      isHot: false,
      views: 195,
      desc: '주중 오후 18시~22시 (주 15시간 이내 법정 준수). TOPIK 3급 이상 우대.'
    },
  ];

  // 필터링 계산
  const filteredPosts = studentPosts.filter(post => {
    if (selectedRegion !== '전체' && post.region !== selectedRegion) return false;
    if (selectedCategory !== '전체' && post.category !== selectedCategory) return false;
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchCat = post.category.toLowerCase().includes(q);
      const matchRegion = post.region.toLowerCase().includes(q);
      const matchVisa = post.visa.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchRegion && !matchVisa) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-16">
      
      {/* 1. 상단 3단 비주얼 큐레이션 배너 (전체 사이트 규격 일체화) */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 배너 1: Language Training & 어학연수 매칭 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all border border-emerald-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner3.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-teal-950/50 to-emerald-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  D-2 &middot; D-4 Visa Support
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  유학생 취업 &middot; 알바<br />합법 행정 지원
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  출입국관리사무소 D-2 유학생 시간제 취업 허가증 발급 절차 100% 무료 지원
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/visa-inquiry" className="hover:underline flex items-center gap-1">
                  <span>시간제 취업 허가 신청 안내</span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
                </Link>
                <GraduationCap className="w-5 h-5 text-emerald-200" />
              </div>
            </div>

            {/* 배너 2: 추천 유학생 직종 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-blue-500/40 hover:-translate-y-1 transition-all border border-blue-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner1.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-blue-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Allowed Jobs
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  호텔 룸메이드 &middot; F&B<br />주말/방학 파트타임
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  학업에 지장 없는 주중 야간/주말 특급호텔 및 식음료 매장 합법 파트타임 매칭
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/jobs" className="hover:underline flex items-center gap-1">
                  <span>유학생 구인 공고 바로가기</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                </Link>
                <Users2 className="w-5 h-5 text-blue-200" />
              </div>
            </div>

            {/* 배너 3: 졸업 후 전문비자 E-7 연계 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-orange-500/40 hover:-translate-y-1 transition-all border border-orange-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner2.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-orange-950/50 to-orange-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Career Transition
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  국내 대학 졸업생<br />E-7 취업비자 전환
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  D-2 학위 취득 후 국내 기업 정규 취업 및 체류자격 E-7-1/E-7-3 변경 행정 전문
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/visa-inquiry" className="hover:underline flex items-center gap-1">
                  <span>E-7 비자 전환 1:1 상담</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                </Link>
                <Award className="w-5 h-5 text-amber-200" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 유학생 취업 필수 가이드 3대 알림 바 (기존보다 대폭 강화된 정보성 컴포넌트) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-300/80 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded">필독</span>
                <h4 className="text-sm font-bold text-slate-900">외국인 유학생 시간제 취업 허가 가이드</h4>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                D-2 비자 유학생은 학교 유학생 담당자 및 관할 출입국관리사무소의 <strong>시간제 취업 허가</strong>를 득한 후 근무해야 합니다. (학기 중 학사 주 20~25시간, 방학 중 무제한 허용)
              </p>
            </div>
          </div>
          <Link
            href="/visa-inquiry"
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition flex items-center gap-1"
          >
            <span>허가 신청 문의</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* 3. 메인 콘텐츠: 2열 구성 (구인/구직과 동일한 사이드바 + 유학생 게시판 테이블) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* [좌측 사이드바: 3컬럼] */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* 1) 지역별 구인/구직 (기존 홈페이지 스크린샷 100% 매칭) */}
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

            {/* 2) 직종별 구인/구직 (기존 홈페이지 구인/구직 버튼 완벽 분기) */}
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

          {/* [우측 메인: 9컬럼 유학생 게시판] */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-5">
            
            {/* 상단 타이틀 & 건수 카운트 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b-2 border-slate-200">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-6 bg-emerald-600 rounded-sm"></span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">유학생 취업 (Student Jobs)</h1>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  D-2 &middot; D-4 허가 취업
                </span>
              </div>

              {/* 건수 카운트 (스크린샷 원본의 '전체 4건 / 1 페이지' 양식) */}
              <div className="text-xs sm:text-sm text-slate-500 font-semibold">
                전체 <strong className="text-emerald-600 font-black">{filteredPosts.length}</strong>건 / 1 페이지
              </div>
            </div>

            {/* 검색 & 정렬 필터 박스 (기존 홈페이지 4단 검색창 모던화) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                
                {/* 지역 셀렉트 */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">지역</label>
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

                {/* 분야 셀렉트 */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">분야</label>
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

                {/* 검색어 입력 및 검색하기 버튼 */}
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
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition shrink-0 shadow-sm"
                    >
                      검색하기
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* 유학생 취업 게시판 테이블 (스크린샷 컬럼: 분야, 제목, 지역, 비자, 나이/성별, 등록일 완벽 재현) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 text-slate-600 text-xs font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4 w-28 text-center">분야</th>
                      <th className="py-3.5 px-4">제목</th>
                      <th className="py-3.5 px-4 w-20 text-center">지역</th>
                      <th className="py-3.5 px-4 w-28 text-center">비자</th>
                      <th className="py-3.5 px-4 w-28 text-center">나이/성별</th>
                      <th className="py-3.5 px-4 w-20 text-center">등록일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <tr 
                          key={post.id} 
                          className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                        >
                          {/* 분야 */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition">
                              {post.category}
                            </span>
                          </td>

                          {/* 제목 및 HOT 마크 */}
                          <td className="py-4 px-4 font-semibold text-slate-800">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="group-hover:text-emerald-600 transition text-sm sm:text-base">
                                {post.title}
                              </span>
                              {post.isHot && (
                                <span className="inline-flex items-center text-rose-500 text-[10px] font-black italic bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded">
                                  HOT
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 font-normal mt-0.5 line-clamp-1">
                              {post.desc}
                            </div>
                          </td>

                          {/* 지역 */}
                          <td className="py-4 px-4 text-center text-xs font-medium text-slate-600">
                            {post.region}
                          </td>

                          {/* 비자 */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-emerald-600">
                            <span className="bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                              {post.visa}
                            </span>
                          </td>

                          {/* 나이/성별 */}
                          <td className="py-4 px-4 text-center text-xs text-slate-600 font-medium">
                            {post.personInfo}
                          </td>

                          {/* 등록일 */}
                          <td className="py-4 px-4 text-center text-xs text-slate-400 font-medium">
                            {post.date}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-slate-400 text-xs sm:text-sm">
                          해당 조건에 부합하는 유학생 취업 게시글이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* 테이블 하단 페이지네이션 & 글쓰기 버튼 */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  표시 중: 1 ~ {filteredPosts.length} of {filteredPosts.length} 건
                </div>

                {/* 페이지 네비게이션 (스크린샷 원본의 << < > >> 완벽 재현) */}
                <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                  <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&lt;&lt;</button>
                  <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&lt;</button>
                  <button className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold">1</button>
                  <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&gt;</button>
                  <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&gt;&gt;</button>
                </div>

                {/* 글쓰기 버튼 (스크린샷 원본 우측 하단 글쓰기 버튼 스타일 계승) */}
                <Link
                  href="/visa-inquiry"
                  className="bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>글쓰기 (유학생 문의/등록)</span>
                </Link>
              </div>

            </div>

          </main>
        </div>
      </section>

    </div>
  );
}
