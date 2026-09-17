'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  UserCheck, 
  Phone, 
  ChevronRight, 
  Sparkles, 
  Globe2, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck,
  Award,
  Users
} from 'lucide-react';

export default function ResumesPage() {
  // 상태 관리
  const [selectedTarget, setSelectedTarget] = useState<'all' | 'korean' | 'foreigner'>('all'); // 내국인 / 외국인 / 전체
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
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

  // 실제 사이트 기준 구직자 실제 데이터셋
  const allSeekers = [
    { 
      id: '1', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '영어 도우미', 
      title: '영어 관련 일자리 찾고 있습니다 (외국인 학교/학원 등)', 
      region: '서울', 
      gender: '여자', 
      age: '23세', 
      visa: 'D-2(유학)', 
      date: '08-14', 
      experience: '원어민 튜터 1년 / 한국어 소통 가능', 
      views: 184 
    },
    { 
      id: '2', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '제조업', 
      title: '일자리를 구하는 성실한 외국인 여성입니다.', 
      region: '전국', 
      gender: '여자', 
      age: '34세', 
      visa: 'F-4(재외동포)', 
      date: '08-14', 
      experience: '식품 포장 및 라인 조립 경력 3년', 
      views: 142 
    },
    { 
      id: '3', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '기타', 
      title: 'F2 비자 남자 일자리 구합니다. 제조업, 물류 가능', 
      region: '부산', 
      gender: '남자', 
      age: '36세', 
      visa: 'F-2(거주)', 
      date: '08-07', 
      experience: '지게차 운전 기능사, 물류창고 입출고', 
      views: 210 
    },
    { 
      id: '4', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '제조업', 
      title: '주야간 교대 생산직 일자리 찾읍니다.', 
      region: '서울', 
      gender: '남자', 
      age: '38세', 
      visa: 'H-2(방문취업)', 
      date: '08-07', 
      experience: '금속 가공 및 사출 공장 4년 경력', 
      views: 95 
    },
    { 
      id: '5', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '제조업', 
      title: 'F4남(30세), H2남(34세) 함께 일할 공장 구합니다.', 
      region: '경기', 
      gender: '남 2명', 
      age: '30대', 
      visa: 'F-4 / H-2', 
      date: '08-06', 
      experience: '기숙사 제공 희망, 2인 동반 근무 가능', 
      views: 312 
    },
    { 
      id: '6', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '룸메이드', 
      title: '호텔 객실 청소 경력 2년 유학생 주말/평일 알바 구직', 
      region: '제주', 
      gender: '여자', 
      age: '25세', 
      visa: 'D-2(유학)', 
      date: '08-05', 
      experience: '서귀포 특급호텔 룸메이드 베딩/클리닝 능숙', 
      views: 285 
    },
    { 
      id: '7', 
      target: 'korean', 
      targetLabel: '내국인', 
      category: '간병인', 
      title: '요양보호사 1급 자격증 보유 주간/야간 간병 일자리 희망', 
      region: '제주', 
      gender: '여자', 
      age: '54세', 
      visa: '내국인', 
      date: '07-28', 
      experience: '요양병원 5년 근무 / 온화하고 성실한 성격', 
      views: 110 
    },
    { 
      id: '8', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '용접공', 
      title: '선박 TIG 배관 용접 경력 5년 (E-7 비자 전직 희망)', 
      region: '울산', 
      gender: '남자', 
      age: '32세', 
      visa: 'E-7-3(용접기능공)', 
      date: '07-20', 
      experience: '조선소 선체 배관 용접 자격증 보유, 즉시 투입 가능', 
      views: 450 
    },
    { 
      id: '9', 
      target: 'foreigner', 
      targetLabel: '외국인', 
      category: '청소', 
      title: '준공청소 및 오피스 정기 클리닝 팀 구직', 
      region: '인천', 
      gender: '남녀 3명', 
      age: '30~40대', 
      visa: 'F-4/F-5', 
      date: '07-15', 
      experience: '청소 전문 장비 보유, 주야간 청소 대행', 
      views: 175 
    },
    { 
      id: '10', 
      target: 'korean', 
      targetLabel: '내국인', 
      category: '가사 도우미', 
      title: '가사/산후도우미 및 정리수납 전문가 구직', 
      region: '서울', 
      gender: '여자', 
      age: '49세', 
      visa: '내국인', 
      date: '07-02', 
      experience: '정리수납 1급 자격증, 출퇴근 가사도우미', 
      views: 130 
    }
  ];

  // 필터링 계산
  const filteredSeekers = allSeekers.filter(seeker => {
    if (selectedTarget !== 'all' && seeker.target !== selectedTarget) return false;
    if (selectedRegion !== '전체' && seeker.region !== selectedRegion) return false;
    if (selectedCategory !== '전체' && seeker.category !== selectedCategory) return false;
    if (keyword.trim()) {
      const q = keyword.toLowerCase();
      const matchTitle = seeker.title.toLowerCase().includes(q);
      const matchCat = seeker.category.toLowerCase().includes(q);
      const matchRegion = seeker.region.toLowerCase().includes(q);
      const matchVisa = seeker.visa.toLowerCase().includes(q);
      if (!matchTitle && !matchCat && !matchRegion && !matchVisa) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-16">
      
      {/* 1. 상단 3단 비주얼 큐레이션 배너 (구직자 전용 모던 배너) */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 배너 1: 검증된 인재풀 안내 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all border border-emerald-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner1.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-emerald-900/30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600/90 backdrop-blur-md flex items-center justify-center font-bold text-sm text-white shadow-md border border-white/30">
                    인
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Verified Talent Pool
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug drop-shadow-md text-white">
                  신원 보증 & 비자 검증<br />
                  <span className="text-emerald-400">맞춤 우수 인재풀</span>
                </h3>
                <p className="text-xs text-emerald-100/90 mt-2 font-medium line-clamp-2">
                  신원이 확실하고 출입국 합법 체류 자격이 확인된 인재만을 기업에 매칭합니다.
                </p>
              </div>

              <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-emerald-200 group-hover:text-white transition">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% 합법 체류 인력
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* 배너 2: We supply Manpower (전문 기술/현장 인력) */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-orange-500/40 hover:-translate-y-1 transition-all border border-orange-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner2.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-orange-950/50 to-orange-900/30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/90 backdrop-blur-md flex items-center justify-center font-bold text-sm text-white shadow-md border border-white/30">
                    직
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                    We Supply Manpower
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug drop-shadow-md text-white">
                  룸메이드 &middot; 용접 &middot; 제조업<br />
                  <span className="text-orange-400">분야별 숙련 구직자</span>
                </h3>
                <p className="text-xs text-orange-100/90 mt-2 font-medium line-clamp-2">
                  호텔 룸메이드, 하우스키핑, 선박 배관 용접, 라인 생산직 등 즉시 현장 투입 가능.
                </p>
              </div>

              <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-orange-200 group-hover:text-white transition">
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-orange-400" />
                  직무 경력자 최우선 매칭
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* 배너 3: 유학생 시간제 취업 허가 인재 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-blue-500/40 hover:-translate-y-1 transition-all border border-blue-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner3.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-blue-900/30"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/90 backdrop-blur-md flex items-center justify-center font-bold text-sm text-white shadow-md border border-white/30">
                    학
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                    Campus & Language
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug drop-shadow-md text-white">
                  D-2 유학생 시간제 취업<br />
                  <span className="text-blue-400">외국어 &middot; 서비스 알바 인재</span>
                </h3>
                <p className="text-xs text-blue-100/90 mt-2 font-medium line-clamp-2">
                  출입국 시간제 취업 허가증 발급 절차 완벽 지원. 어학/식음료/호텔 보조 알바.
                </p>
              </div>

              <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-blue-200 group-hover:text-white transition">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  시간제 취업 허가 지원
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 메인 바디 컨테이너: 필터 + 구직자 리스트 + 인재 요청 사이드바 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* 상단 타이틀 & 내/외국인 전환 탭 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-6 bg-emerald-600 rounded-sm"></span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">구직 정보 (인재 찾기)</h1>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                총 {filteredSeekers.length}명
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-4">
              성실하고 책임감 있는 내&middot;외국인 구직자의 프로필을 확인하고 적임자를 채용하세요.
            </p>
          </div>

          {/* 내/외국인 필터 탭 */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setSelectedTarget('all')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                selectedTarget === 'all' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedTarget('foreigner')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                selectedTarget === 'foreigner' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              외국인 인재
            </button>
            <button
              onClick={() => setSelectedTarget('korean')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                selectedTarget === 'korean' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              내국인 인재
            </button>
          </div>
        </div>

        {/* 조건 검색 바 (지역 & 직종 & 검색어) */}
        <div className="mt-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
          
          {/* 지역 선택 바 */}
          <div className="flex items-start gap-2">
            <span className="text-xs font-bold text-slate-500 shrink-0 mt-1.5 w-14 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              지역별
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {regions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    selectedRegion === reg
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          </div>

          {/* 직종 선택 바 */}
          <div className="flex items-start gap-2 pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 shrink-0 mt-1.5 w-14 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              직종별
            </span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {jobCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 키워드 검색창 */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="구직자 희망직무, 비자종류(E-7, D-2, F-4 등), 자격증, 지역 검색"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm font-medium outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="text-xs text-slate-400 hover:text-slate-600 shrink-0"
              >
                검색어 초기화
              </button>
            )}
          </div>

        </div>

        {/* 콘텐츠 영역: 2단 분할 (좌측 8컬럼 구직자 카드 목록 / 우측 4컬럼 인재 매칭 안내) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* 좌측 8컬럼: 구직자 프로필 목록 */}
          <div className="lg:col-span-8 space-y-4">
            {filteredSeekers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700">해당 조건의 구직자가 없습니다.</h3>
                <p className="text-xs text-slate-400 mt-1">지역 또는 직종 조건을 변경해 보세요.</p>
                <button
                  onClick={() => {
                    setSelectedTarget('all');
                    setSelectedRegion('전체');
                    setSelectedCategory('전체');
                    setKeyword('');
                  }}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
                >
                  필터 전체 초기화
                </button>
              </div>
            ) : (
              filteredSeekers.map((seeker) => (
                <div
                  key={seeker.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        seeker.target === 'foreigner' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-300'
                      }`}>
                        {seeker.targetLabel}
                      </span>
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg">
                        {seeker.category}
                      </span>
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                        비자: {seeker.visa}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3">
                      <span>등록일: {seeker.date}</span>
                      <span>조회 {seeker.views}</span>
                    </div>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {seeker.title}
                  </h3>

                  {/* 구직자 세부 정보 태그 */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-4 text-slate-600 font-medium">
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        {seeker.gender} &middot; {seeker.age}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        희망지역: <strong className="text-slate-800">{seeker.region}</strong>
                      </span>
                      <span className="hidden sm:inline-block text-slate-400">|</span>
                      <span className="hidden sm:inline-block text-slate-500 truncate max-w-xs">
                        {seeker.experience}
                      </span>
                    </div>

                    <a
                      href="tel:010-7169-2255"
                      className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold rounded-xl text-xs transition flex items-center gap-1 border border-emerald-200 group-hover:border-emerald-500"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>인재 매칭 문의</span>
                    </a>
                  </div>
                </div>
              ))
            )}

            {/* 페이지네이션 */}
            <div className="pt-6 flex items-center justify-center gap-2">
              <button
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 text-xs font-bold disabled:opacity-50"
              >
                이전
              </button>
              <button className="w-8 h-8 rounded-lg bg-emerald-600 text-white text-xs font-bold">
                1
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50">
                다음
              </button>
            </div>

          </div>

          {/* 우측 4컬럼: 기업용 맞춤 인재 요청 박스 & 비자 상담 배너 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 기업 인재 요청 전용 카드 */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-6 shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold mb-3 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>기업 채용 담당자 전용</span>
              </div>
              <h3 className="text-xl font-black tracking-tight leading-tight">
                원하시는 조건의 인재를<br />
                신속하게 매칭해 드립니다
              </h3>
              <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
                호텔 룸메이드, 하우스키핑, 선박/플랜트 용접사, 제조업 생산직, 서비스 알바 등 원하는 인력 조건(국적, 비자, 경력)을 말씀해 주시면 즉시 연결해 드립니다.
              </p>

              <div className="mt-5 pt-5 border-t border-white/20 space-y-3">
                <div className="text-center">
                  <div className="text-xs text-emerald-200 font-medium">인재 수급 직통 상담</div>
                  <div className="text-2xl font-black tracking-tight mt-0.5">010-7169-2255</div>
                  <div className="text-xs text-emerald-100/80">본사: 064-711-8578</div>
                </div>

                <a
                  href="tel:010-7169-2255"
                  className="block w-full py-3 bg-white hover:bg-emerald-50 text-emerald-800 text-center font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
                >
                  담당자 전화 바로 연결
                </a>

                <Link
                  href="/visa-inquiry"
                  className="block w-full py-2.5 bg-emerald-700/60 hover:bg-emerald-700 border border-white/30 text-white text-center font-bold text-xs rounded-xl transition"
                >
                  온라인 인재 요청 접수
                </Link>
              </div>
            </div>

            {/* 비자 행정 대행 안내 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm mb-2">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>합법 비자 취업 대행 안내</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                외국인 채용 시 가장 중요한 출입국 합법 비자(E-7, E-9, D-2, H-2, F-4 등) 자격 심사 및 시간제 취업 허가 행정을 록산에버그린이 안전하게 전담합니다.
              </p>
              
              <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>D-2 유학생 시간제 취업 허가증 발급</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>E-7 특정활동 전문 취업비자 지원</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>신원보증 및 범죄경력 체류자격 사전 검증</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
