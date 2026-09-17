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
  CheckCircle2,
  Award,
  Calendar
} from 'lucide-react';

export default function ResumesPage() {
  // 상태 관리
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'korean' | 'foreigner'>('all'); // 내국인 / 외국인 / 전체
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [keyword, setKeyword] = useState('');

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

  // 기존 사이트의 구직 실제 데이터셋
  const allResumes = [
    { 
      id: '1', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '영어 도우미', 
      title: '영어 관련 일자리 찾고 있습니다 (외국인 학교/학원 등)', 
      region: '서울', 
      info: '23세 / 여 / D-2', 
      date: '08-14', 
      isHot: true, 
      views: 184 
    },
    { 
      id: '2', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '제조업', 
      title: '일자리를 구하는 성실한 외국인 여성입니다.', 
      region: '전국', 
      info: '34세 / 여 / F-4', 
      date: '08-14', 
      isHot: true, 
      views: 142 
    },
    { 
      id: '3', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '기타', 
      title: 'F2 비자 남자 일자리 구합니다. 제조업, 물류 가능', 
      region: '부산', 
      info: '36세 / 남 / F-2', 
      date: '08-07', 
      isHot: true, 
      views: 210 
    },
    { 
      id: '4', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '제조업', 
      title: '주야간 교대 생산직 일자리 찾읍니다.', 
      region: '서울', 
      info: '38세 / 남 / H-2', 
      date: '08-07', 
      isHot: true, 
      views: 95 
    },
    { 
      id: '5', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '기타', 
      title: 'F4남(30세), H2남(34세) 함께 일할 공장 구합니다.', 
      region: '경기', 
      info: '30대 / 남2 / F4,H2', 
      date: '08-06', 
      isHot: true, 
      views: 312 
    },
    { 
      id: '6', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '룸메이드', 
      title: '호텔 객실 청소 경력 2년 유학생 주말/평일 알바', 
      region: '제주', 
      info: '25세 / 여 / D-2', 
      date: '08-05', 
      isHot: true, 
      views: 285 
    },
    { 
      id: '7', 
      target: 'korean', 
      targetLabel: '내국인', 
      category: '간병인', 
      title: '요양보호사 1급 자격증 보유 주간/야간 간병 일자리 희망', 
      region: '제주', 
      info: '54세 / 여 / 내국인', 
      date: '07-28', 
      isHot: false, 
      views: 110 
    },
    { 
      id: '8', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '용접공', 
      title: '선박 TIG 배관 용접 경력 5년 (E-7 비자 전직 희망)', 
      region: '울산', 
      info: '32세 / 남 / E-7', 
      date: '07-20', 
      isHot: true, 
      views: 450 
    },
    { 
      id: '9', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '청소', 
      title: '준공청소 및 오피스 정기 클리닝 팀 구직', 
      region: '인천', 
      info: '남녀3 / F-4,F-5', 
      date: '07-15', 
      isHot: false, 
      views: 175 
    },
    { 
      id: '10', 
      target: 'korean', 
      targetLabel: '내국인', 
      category: '가사 도우미', 
      title: '가사/산후도우미 및 정리수납 전문가 구직', 
      region: '서울', 
      info: '49세 / 여 / 내국인', 
      date: '07-02', 
      isHot: false, 
      views: 130 
    },
    { 
      id: '11', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '유학생 알바', 
      title: '주말 식음료 서빙 및 설거지 파트타임 (시간제 취업허가 완료)', 
      region: '제주', 
      info: '22세 / 남 / D-2', 
      date: '06-25', 
      isHot: true, 
      views: 198 
    },
    { 
      id: '12', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '제조업', 
      title: '비닐 가공 및 완제품 포장 라인 구직 (F4 비자)', 
      region: '충남', 
      info: '42세 / 여 / F-4', 
      date: '06-18', 
      isHot: false, 
      views: 88 
    }
  ];

  // 필터링 계산
  const filteredResumes = allResumes.filter(resume => {
    if (selectedTarget !== 'all' && resume.target !== selectedTarget) return false;
    if (selectedRegion !== '전체' && resume.region !== selectedRegion) return false;
    if (selectedCategory !== '전체' && resume.category !== selectedCategory) return false;
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      const matchTitle = resume.title.toLowerCase().includes(q);
      const matchCat = resume.category.toLowerCase().includes(q);
      const matchRegion = resume.region.toLowerCase().includes(q);
      const matchInfo = resume.info.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchRegion && !matchInfo) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-16">
      
      {/* 1. 상단 3단 비주얼 큐레이션 배너 (구인 페이지와 100% 동일한 규격과 스타일) */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 배너 1: 회사소개 & 인재풀 매칭 안내 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all border border-blue-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner1.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-blue-900/30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/90 backdrop-blur-md flex items-center justify-center font-bold text-sm text-white shadow-md border border-white/30">
                    록
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    Verified Talent Pool
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  록산에버그린(주)<br />검증된 인재 매칭
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  내국인 및 16개국 외국인 전문 인력의 합법 체류 비자 확인 및 신원 보증
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/about" className="hover:underline flex items-center gap-1">
                  <span>회사 소개 바로가기</span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-300" />
                </Link>
                <Globe2 className="w-5 h-5 text-blue-200" />
              </div>
            </div>

            {/* 배너 2: We supply Manpower (전문 직종 인력) */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-orange-500/40 hover:-translate-y-1 transition-all border border-orange-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner2.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-orange-950/50 to-orange-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  We supply Manpower
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  호텔&middot;용접&middot;제조업<br />숙련 구직자 매칭
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  특급호텔 룸메이드, 하우스키핑, 선박/플랜트 TIG 용접사, 공장 생산직 인재
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <Link href="/resumes" className="hover:underline flex items-center gap-1">
                  <span>전문 직종 구직자 요청</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                </Link>
                <Users2 className="w-5 h-5 text-amber-200" />
              </div>
            </div>

            {/* 배너 3: Language Training & Student Job Arrangement */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all border border-emerald-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner3.jpg')` }}
              ></div>
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

      {/* 2. 메인 콘텐츠: 2열 구성 (구인 페이지와 동일한 좌측 사이드바 + 우측 리스트 테이블) */}
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
                      <button
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                          selectedCategory === cat
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600'
                        }`}
                      >
                        구직
                      </button>
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

          {/* [우측 메인: 9컬럼 테이블 목록] */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-5">
            
            {/* 1) [내국인 | 외국인 | 전체] 상단 라지 탭 (구인 페이지와 완벽 통일) */}
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
                  전체 구직 ({allResumes.length})
                </button>
                <button
                  onClick={() => setSelectedTarget('korean')}
                  className={`pb-2 -mb-2 border-b-2 transition ${
                    selectedTarget === 'korean'
                      ? 'border-emerald-600 text-emerald-700'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  내국인 ({allResumes.filter(r => r.target === 'korean').length})
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
                  <span>외국인 ({allResumes.filter(r => r.target === 'foreigner').length})</span>
                </button>
              </div>

              {/* 건수 카운트 */}
              <div className="text-xs sm:text-sm text-slate-500 font-semibold">
                전체 <strong className="text-emerald-600 font-black">{filteredResumes.length}</strong>건 / 1 페이지
              </div>
            </div>

            {/* 2) 검색 & 정렬 필터 박스 */}
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
                      placeholder="구직 제목, 비자(E-7, D-2 등), 지역 검색"
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
                      <th className="py-3.5 px-4 w-28 text-center">분야</th>
                      <th className="py-3.5 px-4">구직 제목</th>
                      <th className="py-3.5 px-4 w-36 text-center">인적사항 / 비자</th>
                      <th className="py-3.5 px-4 w-20 text-center">희망지역</th>
                      <th className="py-3.5 px-4 w-20 text-center">등록일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredResumes.length > 0 ? (
                      filteredResumes.map((resume) => (
                        <tr 
                          key={resume.id} 
                          className="hover:bg-emerald-50/40 transition-colors group cursor-pointer"
                        >
                          {/* 분야 */}
                          <td className="py-4 px-4 text-center">
                            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition">
                              {resume.category}
                            </span>
                          </td>

                          {/* 구직 제목 및 [내/외국인] 뱃지 */}
                          <td className="py-4 px-4 font-semibold text-slate-800">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[11px] font-extrabold px-1.5 py-0.5 rounded ${
                                resume.target === 'foreigner' 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-slate-200 text-slate-800'
                              }`}>
                                [{resume.targetLabel}]
                              </span>
                              <span className="group-hover:text-emerald-600 transition text-sm sm:text-base">
                                {resume.title}
                              </span>
                              {resume.isHot && (
                                <span className="inline-flex items-center text-rose-500 text-[10px] font-black italic">
                                  HOT
                                </span>
                              )}
                            </div>
                          </td>

                          {/* 인적사항 / 비자 */}
                          <td className="py-4 px-4 text-center text-xs font-bold text-blue-600">
                            <span className="bg-blue-50 border border-blue-200 px-2 py-1 rounded-md">
                              {resume.info}
                            </span>
                          </td>

                          {/* 희망지역 */}
                          <td className="py-4 px-4 text-center text-xs font-medium text-slate-600">
                            {resume.region}
                          </td>

                          {/* 등록일 */}
                          <td className="py-4 px-4 text-center text-xs text-slate-400 font-medium">
                            {resume.date}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-slate-400 text-xs sm:text-sm">
                          해당 조건에 부합하는 구직 등록 글이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 모바일 전용: 커뮤니티처럼 각 인재가 독립된 둥근 카드 박스로 분리된 피드 (< md) */}
            <div className="md:hidden space-y-3.5">
              {filteredResumes.length > 0 ? (
                filteredResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="block bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all active:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                          resume.target === 'foreigner' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-slate-200 text-slate-800'
                        }`}>
                          [{resume.targetLabel}]
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {resume.category}
                        </span>
                        {resume.isHot && (
                          <span className="text-[10px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded italic">
                            HOT
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {resume.date}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-3">
                      {resume.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
                      <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                        {resume.info}
                      </span>
                      <div className="flex items-center gap-1 text-slate-600 font-semibold bg-slate-50 px-2 py-1 rounded-md">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>희망: {resume.region}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
                  해당 조건에 부합하는 구직 등록 글이 없습니다.
                </div>
              )}
            </div>

            {/* 하단 페이지네이션 & 구직 등록 바 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                표시 중: 1 ~ {filteredResumes.length} of {filteredResumes.length} 건
              </div>

              {/* 페이지 네비게이션 */}
              <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&lt;&lt;</button>
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&lt;</button>
                <button className="px-3 py-1.5 rounded bg-emerald-600 text-white font-bold">1</button>
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&gt;</button>
                <button className="px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-100">&gt;&gt;</button>
              </div>

              {/* 구직 등록(이력서 등록) 버튼 */}
              <Link
                href="/visa-inquiry"
                className="w-full sm:w-auto text-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>구직 등록 (이력서 접수)</span>
              </Link>
            </div>

          </main>
        </div>
      </section>

    </div>
  );
}
