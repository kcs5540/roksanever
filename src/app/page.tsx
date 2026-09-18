'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  ChevronRight, 
  Phone, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Globe2, 
  Users, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Award
} from 'lucide-react';

export default function HomePage() {
  const { t } = useLanguage();
  
  // 히어로 슬라이더 상태 및 자동 재생
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? 2 : prev - 1));
  };

  // 모바일 터치 스와이프 제어
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  const minSwipeDistance = 30; // 스와이프 감지 최소 픽셀 거리 (모바일 반응성 대폭 향상)

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchEndY(null);
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
    setTouchEndY(e.touches[0].clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = touchEndX !== null ? touchEndX : (e.changedTouches?.[0]?.clientX ?? null);
    const endY = touchEndY !== null ? touchEndY : (e.changedTouches?.[0]?.clientY ?? null);

    if (touchStartX === null || endX === null) return;
    
    const distanceX = touchStartX - endX;
    const distanceY = (touchStartY !== null && endY !== null) ? Math.abs(touchStartY - endY) : 0;

    // 가로 이동 거리가 30px 이상이고 세로 스크롤보다 크면 즉시 전환
    if (Math.abs(distanceX) > distanceY && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 필터 상태
  const [selectedRegion, setSelectedRegion] = useState('전체');
  const [selectedJobType, setSelectedJobType] = useState('전체'); // 직종
  const [activeTab, setActiveTab] = useState<'offer' | 'seek'>('offer'); // 구인정보 vs 구직정보 모바일/탭 전환용
  const [searchKeyword, setSearchKeyword] = useState('');

  // 16개 송출/협력국 국기 데이터 (ISO 코드 포함, 중국 1순위 배치)
  const countries = [
    { name: 'China', iso: 'cn' },
    { name: 'Philippines', iso: 'ph' },
    { name: 'Vietnam', iso: 'vn' },
    { name: 'Thailand', iso: 'th' },
    { name: 'Indonesia', iso: 'id' },
    { name: 'Sri Lanka', iso: 'lk' },
    { name: 'Mongolia', iso: 'mn' },
    { name: 'Uzbekistan', iso: 'uz' },
    { name: 'Pakistan', iso: 'pk' },
    { name: 'Cambodia', iso: 'kh' },
    { name: 'Bangladesh', iso: 'bd' },
    { name: 'Kyrgyzstan', iso: 'kg' },
    { name: 'Nepal', iso: 'np' },
    { name: 'Myanmar', iso: 'mm' },
    { name: 'East Timor', iso: 'tl' },
    { name: 'Laos', iso: 'la' },
  ];

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

  // 실제 구인 데이터 기본값
  const initialJobOffers = [
    { id: '1', category: '룸메이드', title: '룸메이드 구합니다. 태국여성 환영 / 기숙사 완비', region: '경기', target: '외국인', date: '08-14', urgent: true, salary: '월 270만' },
    { id: '2', category: '기타', title: 'S.N 및 리조트 시설 관리 인력 모십니다.', region: '제주', target: '무관', date: '08-08', urgent: false, salary: '월 260만' },
    { id: '3', category: '제조업', title: '화장품 포장 및 생산직 급구 (초보자 가능)', region: '전국', target: '무관', date: '08-07', urgent: true, salary: '월 290만' },
    { id: '4', category: '기타', title: '식자재 물류 패킹 및 소분 포장 야간/주간', region: '인천', target: '외국인', date: '08-06', urgent: false, salary: '시급 11,500원' },
    { id: '5', category: '제조업', title: '화장지 원료 제조 및 라인 단순 작업자 모집', region: '경기', target: '무관', date: '08-06', urgent: false, salary: '월 285만' },
    { id: '6', category: '용접공', title: '선박 TIG 배관 용접사 (E-7 비자 지원 가능)', region: '울산', target: '외국인', date: '08-04', urgent: true, salary: '월 420만' },
  ];

  // 실제 구직 데이터 기본값
  const initialJobSeekers = [
    { id: '1', category: '영어 도우미', title: '영어 관련 일자리 찾고 있습니다 (외국인 학교/학원 등)', region: '서울', type: '외국인', info: '23세 / 여자', visa: 'D-2(유학)', date: '08-14' },
    { id: '2', category: '제조업', title: '일자리를 구하는 성실한 외국인 여성입니다.', region: '전국', type: '외국인', info: '34세 / 여자', visa: 'F-4', date: '08-14' },
    { id: '3', category: '기타', title: 'F2 비자 남자 일자리 구합니다. 제조업, 물류 가능', region: '부산', type: '외국인', info: '36세 / 남자', visa: 'F-2', date: '08-07' },
    { id: '4', category: '기타', title: '주야간 교대 생산직 일자리 찾읍니다.', region: '서울', type: '외국인', info: '38세 / 남자', visa: 'H-2', date: '08-07' },
    { id: '5', category: '기타', title: 'F4남(30세), H2남(34세) 함께 일할 공장 구합니다.', region: '서울', type: '외국인', info: '30대 / 남2', visa: 'F-4/H-2', date: '08-06' },
    { id: '6', category: '룸메이드', title: '호텔 객실 청소 경력 2년 유학생 주말/평일 알바', region: '제주', type: '외국인', info: '25세 / 여자', visa: 'D-2', date: '08-05' },
  ];

  // Supabase 실시간 연동 상태
  const [jobOffers, setJobOffers] = useState(initialJobOffers);
  const [jobSeekers, setJobSeekers] = useState(initialJobSeekers);
  const [dbConnected, setDbConnected] = useState(false);

  useEffect(() => {
    async function loadDataFromSupabase() {
      try {
        const { supabase } = await import('@/lib/supabase');
        if (!supabase) return;

        // 1. roksan_jobs 테이블에서 구인공고 불러오기
        const { data: dbJobs, error: jobsError } = await supabase
          .from('roksan_jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (!jobsError && dbJobs && dbJobs.length > 0) {
          const mappedJobs = dbJobs.map((item: any) => ({
            id: item.id,
            category: item.category,
            title: item.title,
            region: item.region,
            target: item.target || '외국인',
            date: item.created_at ? item.created_at.slice(5, 10) : '방금',
            urgent: item.urgent ?? false,
            salary: item.salary || '협의'
          }));
          setJobOffers(mappedJobs);
          setDbConnected(true);
        }

        // 2. roksan_resumes 테이블에서 구직자 불러오기
        const { data: dbSeekers, error: seekersError } = await supabase
          .from('roksan_resumes')
          .select('*')
          .order('created_at', { ascending: false });

        if (!seekersError && dbSeekers && dbSeekers.length > 0) {
          const mappedSeekers = dbSeekers.map((item: any) => ({
            id: item.id,
            category: item.category,
            title: item.title,
            region: item.region,
            type: item.target || '외국인',
            info: item.info || '정보 미기재',
            visa: item.visa || '무관',
            date: item.created_at ? item.created_at.slice(5, 10) : '방금'
          }));
          setJobSeekers(mappedSeekers);
        }
      } catch (err) {
        console.warn('Supabase 실시간 로드 대기:', err);
      }
    }

    loadDataFromSupabase();
  }, []);

  // 필터링
  const filteredOffers = jobOffers.filter(job => {
    if (selectedRegion !== '전체' && job.region !== selectedRegion) return false;
    if (selectedJobType !== '전체' && job.category !== selectedJobType) return false;
    if (searchKeyword.trim() && !job.title.includes(searchKeyword) && !job.category.includes(searchKeyword)) return false;
    return true;
  });

  const filteredSeekers = jobSeekers.filter(job => {
    if (selectedRegion !== '전체' && job.region !== selectedRegion) return false;
    if (selectedJobType !== '전체' && job.category !== selectedJobType) return false;
    if (searchKeyword.trim() && !job.title.includes(searchKeyword) && !job.category.includes(searchKeyword)) return false;
    return true;
  });

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      
      {/* 1. HERO BANNER: 3대 핵심 테마 스와이프 슬라이더 (모바일/PC 높이 균일화 & 카드형 래퍼) */}
      <section 
        className="relative bg-gradient-to-b from-[#eef9f2] via-slate-50 to-[#e2e8f0]/40 pt-4 pb-8 sm:py-8 border-b-2 border-slate-200 shadow-xs overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 슬라이드 컨테이너: 고정 높이(h-[660px] sm:h-[590px] md:h-[450px])를 주어 슬라이드 내용과 무관하게 전체 컨테이너와 검색바 위치를 1픽셀도 흔들리지 않게 완벽 고정 */}
          <div className="relative h-[660px] sm:h-[590px] md:h-[450px] flex items-center bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-md p-4 sm:p-6 md:p-8 overflow-hidden">
            
            {/* SLIDE 1: 글로벌 인력공급 & 비자 행정 */}
            <div className={`w-full h-full flex flex-col justify-center transition-opacity duration-500 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-8 items-center h-full">
                
                {/* 좌측 컬럼 */}
                <div className="md:col-span-7 text-left space-y-2 sm:space-y-2.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] sm:text-[11px] font-bold shadow-xs">
                      <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                      <span className="font-mono text-amber-300">f1630120240001</span>
                      <span className="text-slate-300 text-[10px] sm:text-[11px] hidden sm:inline">| Registered overseas agency</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-extrabold border border-emerald-300">
                      <span>JOB IN JEJU</span>
                    </div>
                  </div>

                  <h1 className="text-lg sm:text-2xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight break-keep-all">
                    {t('heroTitle1')}<br />
                    <span className="text-emerald-600">{t('heroTitle2')}</span>
                  </h1>

                  {/* 5대 원형 사업 박스 */}
                  <div className="bg-slate-50/90 rounded-2xl p-2 sm:p-3 shadow-inner border border-slate-200/80 space-y-1.5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-extrabold text-slate-800">
                      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <div className="truncate">
                          <div className="truncate">{t('pillar1Title')}</div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 font-normal truncate">Labor Supply</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                        <div className="truncate">
                          <div className="truncate">{t('pillar2Title')}</div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 font-normal truncate">Job Placement</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></span>
                        <div className="truncate">
                          <div className="truncate">{t('pillar3Title')}</div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 font-normal truncate">Visa Agency</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0"></span>
                        <div className="truncate">
                          <div className="truncate">{t('pillar4Title')}</div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 font-normal truncate">Study Abroad</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-600 shrink-0"></span>
                        <div className="truncate">
                          <div className="truncate">{t('pillar5Title')}</div>
                          <div className="text-[8px] sm:text-[9px] text-slate-400 font-normal truncate">Housekeeper</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-1 border-t border-slate-200/60 flex items-center justify-between text-[10px] sm:text-xs">
                      <span className="font-bold text-slate-500 text-[10px] sm:text-xs">{t('targetVisaLabel')}</span>
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-black shadow-2xs">
                        {t('targetVisaList')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-0.5 flex flex-wrap items-center gap-2">
                    <Link
                      href="/jobs"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <span>{t('findJobBtn')}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                    <Link
                      href="/visa-inquiry"
                      className="border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl transition"
                    >
                      {t('freeVisaBtn')}
                    </Link>
                  </div>
                </div>

                {/* 우측 컬럼: 1번 그림 (16개국 국기 카드) - 세로 높이를 정확히 h-[210px] sm:h-[230px] md:h-auto 로 고정 */}
                <div className="md:col-span-5 block">
                  <div className="bg-slate-50/90 rounded-2xl p-2.5 sm:p-3 shadow-sm border border-slate-200/80 relative overflow-hidden h-[210px] sm:h-[230px] md:h-auto flex flex-col justify-between">
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-200/60 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] sm:text-xs font-extrabold text-slate-800">{t('networkTitle')}</span>
                      </div>
                      <span className="text-[9px] font-bold bg-emerald-100/80 text-emerald-800 px-1.5 py-0.5 rounded-full border border-emerald-200">
                        {t('networkBadge')}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1 py-0.5 overflow-hidden flex-1 items-center">
                      {countries.map((c, idx) => (
                        <div 
                          key={idx} 
                          className="flex flex-col items-center justify-center p-1 rounded-lg bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200/60 transition-all cursor-pointer group shadow-2xs"
                        >
                          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden border border-slate-200 bg-white p-0.5 mb-0.5 flex items-center justify-center ${c.iso === 'cn' ? 'ring-1 ring-red-400' : ''}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={c.iso === 'cn' ? 'https://flagcdn.com/cn.svg' : `https://flagcdn.com/w80/${c.iso}.png`}
                              alt={`${c.name} 국기`} 
                              className={`w-full h-full rounded-full ${c.iso === 'cn' ? 'object-cover scale-125 object-left-top' : 'object-cover'}`}
                              loading="lazy"
                            />
                          </div>
                          <span className={`text-[8px] font-bold text-center truncate w-full ${c.iso === 'cn' ? 'text-red-700 font-black' : 'text-slate-700 group-hover:text-emerald-700'}`}>
                            {c.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-1 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 shrink-0">
                      <span className="flex items-center gap-1 font-medium text-[9px] sm:text-[10px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {t('networkFooter')}
                      </span>
                      <span className="font-bold text-emerald-700 text-[9px] sm:text-[10px]">{t('verifiedTalent')}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* SLIDE 2: We supply Manpower */}
            <div className={`w-full h-full flex flex-col justify-center transition-opacity duration-500 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-8 items-center h-full">
                <div className="md:col-span-7 text-left space-y-2 sm:space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] sm:text-xs font-bold border border-orange-200">
                    <Briefcase className="w-3.5 h-3.5 text-orange-600" />
                    <span>{t('slide2Badge')}</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
                    {t('slide2Title1')}<br />
                    <span className="text-orange-600">{t('slide2Title2')}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl line-clamp-2">
                    {t('slide2Desc')}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {['룸메이드 (Room-maid)', '하우스키퍼', '실내외 클리닝', '선박/플랜트 TIG 용접', '제조업 생산직', '간병인/가사도우미'].map((job, idx) => (
                      <span key={idx} className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-xl text-[9px] sm:text-xs font-bold text-slate-800 shadow-2xs">
                        &bull; {job}
                      </span>
                    ))}
                  </div>

                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <Link
                      href="/jobs"
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <span>{t('slide2Btn1')}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                    <a
                      href="tel:064-711-8578"
                      className="border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl transition"
                    >
                      {t('slide2Btn2')}
                    </a>
                  </div>
                </div>

                {/* 우측 컬럼: 2번 그림 (전문 직종 인력 일러스트) - 1번과 100% 동일한 h-[210px] sm:h-[230px] md:h-auto 로 고정 */}
                <div className="md:col-span-5 block">
                  <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 h-[210px] sm:h-[230px] md:h-auto md:aspect-[4/3] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/images/banners/banner2.jpg" 
                      alt="전문 직종 인력 공급" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3 sm:p-4">
                      <div className="text-white">
                        <div className="text-[9px] sm:text-xs font-bold text-amber-300 uppercase">Verified Talent Pool</div>
                        <div className="text-xs sm:text-sm md:text-base font-bold">{t('slide2ImgBadge')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 3: Language Training & 유학생 취업 */}
            <div className={`w-full h-full flex flex-col justify-center transition-opacity duration-500 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-8 items-center h-full">
                <div className="md:col-span-7 text-left space-y-2 sm:space-y-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] sm:text-xs font-bold border border-blue-200">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t('slide3Badge')}</span>
                  </div>
                  <h2 className="text-lg sm:text-2xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
                    {t('slide3Title1')}<br />
                    <span className="text-blue-600">{t('slide3Title2')}</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl line-clamp-2">
                    {t('slide3Desc')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg pt-0.5">
                    <div className="bg-slate-50/90 p-2 sm:p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5">{t('slide3Card1Title')}</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500">{t('slide3Card1Desc')}</div>
                    </div>
                    <div className="bg-slate-50/90 p-2 sm:p-2.5 rounded-xl border border-slate-200/80 shadow-2xs hidden sm:block">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm mb-0.5">{t('slide3Card2Title')}</div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500">{t('slide3Card2Desc')}</div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <Link
                      href="/visa-inquiry"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-xl shadow-md transition inline-flex items-center gap-1.5"
                    >
                      <span>{t('slide3Btn')}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>

                {/* 우측 컬럼: 3번 그림 (캠퍼스 유학/비자 일러스트) - 1번, 2번과 100% 동일한 h-[210px] sm:h-[230px] md:h-auto 로 고정 */}
                <div className="md:col-span-5 block">
                  <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 h-[210px] sm:h-[230px] md:h-auto md:aspect-[4/3] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="/images/banners/banner3.jpg" 
                      alt="유학생 비자 및 어학연수 매칭" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3 sm:p-4">
                      <div className="text-white">
                        <div className="text-[9px] sm:text-xs font-bold text-emerald-300 uppercase">Global Campus & Visa</div>
                        <div className="text-xs sm:text-sm md:text-base font-bold">100% 합법적 유학생 시간제 취업 지원</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 슬라이더 하단 컨트롤러: 슬라이드 전환과 무관하게 상하 마진 및 높이 고정 */}
          <div className="h-10 my-2 flex items-center justify-between">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-500 shadow-2xs flex items-center justify-center transition active:scale-95 text-sm font-bold"
              aria-label="Previous slide"
            >
              &#8592;
            </button>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? 'w-8 bg-emerald-600'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 sm:hidden">
                좌우로 밀어서 넘기기
              </span>
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-500 shadow-2xs flex items-center justify-center transition active:scale-95 text-sm font-bold"
              aria-label="Next slide"
            >
              &#8594;
            </button>
          </div>

          {/* 통합 검색바: 슬라이드 높이와 완전히 분리된 고정 위치 래퍼 */}
          <div className="max-w-3xl mx-auto pt-1 pb-2">
            <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-emerald-500/80 flex items-center gap-2 text-slate-800">
              <div className="flex-1 flex items-center gap-2.5 px-3 py-1.5">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full text-xs sm:text-sm font-medium outline-none bg-transparent placeholder:text-slate-400"
                />
              </div>
              <button
                onClick={() => {}}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl transition text-xs sm:text-sm shrink-0 flex items-center gap-1.5 shadow-sm"
              >
                <span>{t('btnSearch')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </section>

      {/* 히어로 섹션과 본문 사이의 또렷하고 감각적인 시각적 분리선 / 전환 바 */}
      <div className="w-full bg-[#f1f5f9] border-b border-slate-200/90 py-3 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-700">실시간 매칭 공고 현황</span>
            <span className="hidden sm:inline text-slate-400">| 검증된 합법 취업 일자리 및 전문 구직 인재</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            UPDATED DAILY &middot; ROKSANEVERGREEN
          </div>
        </div>
      </div>

      {/* 2. MAIN 2열 레이아웃: 좌측(지역/직종 네비게이션) + 우측(구인/구직 현대화 테이블) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-[#f8fafc]">
        
        {/* 모바일용 직종/지역 빠른 탭 전환 (PC에서는 사이드바로 노출) */}
        <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
          {jobCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedJobType(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                selectedJobType === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* [좌측 사이드바: 12 중 3.5컬럼] 기존 사이트의 '지역별 구인/구직' + '직종별 구인/구직' 승계 */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* 1) 지역별 구인/구직 박스 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-emerald-200" />
                  <span>{t('regionTitle')}</span>
                </div>
                <span className="text-[11px] bg-emerald-700/80 px-2 py-0.5 rounded text-emerald-100">{t('regionBadge')}</span>
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

            {/* 2) 직종별 구인/구직 박스 (기존 구인/구직 분기 링크 완벽 승계) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>{t('jobTypeTitle')}</span>
                </div>
                <span className="text-[11px] text-slate-400">{t('jobTypeBadge')}</span>
              </div>
              
              <div className="divide-y divide-slate-100 text-xs">
                {jobCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition ${
                      selectedJobType === cat ? 'bg-emerald-50/70' : ''
                    }`}
                  >
                    <button
                      onClick={() => setSelectedJobType(cat)}
                      className={`text-left font-medium hover:text-emerald-700 flex-1 ${
                        selectedJobType === cat ? 'text-emerald-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => { setSelectedJobType(cat); setActiveTab('offer'); }}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 font-bold text-[11px] transition"
                      >
                        {t('quickOffer')}
                      </button>
                      <button
                        onClick={() => { setSelectedJobType(cat); setActiveTab('seek'); }}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-600 font-bold text-[11px] transition"
                      >
                        {t('quickSeek')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3) 긴급 전화 상담 배너 */}
            <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm border border-slate-800 text-center">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs text-emerald-400 font-bold mb-1">{t('urgentCallTitle')}</div>
              <div className="text-lg font-black text-white">064-711-8578</div>
              <div className="text-xs text-slate-400 mt-0.5">직통 010-5731-8578</div>
              <a
                href="tel:064-711-8578"
                className="mt-3 block w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow"
              >
                {t('urgentCallBtn')}
              </a>
            </div>

          </aside>

          {/* [우측 본문: 12 중 8.5컬럼] 구인정보 목록 + 구직정보 목록 */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-10">

            {/* 활성화 필터 안내 */}
            {(selectedRegion !== '전체' || selectedJobType !== '전체' || searchKeyword) && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3 flex items-center justify-between text-xs sm:text-sm text-emerald-800">
                <div className="flex items-center gap-2">
                  <span className="font-bold">선택 필터:</span>
                  {selectedRegion !== '전체' && <span className="bg-white px-2.5 py-0.5 rounded-md font-semibold border border-emerald-300">지역: {selectedRegion}</span>}
                  {selectedJobType !== '전체' && <span className="bg-white px-2.5 py-0.5 rounded-md font-semibold border border-emerald-300">직종: {selectedJobType}</span>}
                  {searchKeyword && <span className="bg-white px-2.5 py-0.5 rounded-md font-semibold border border-emerald-300">검색어: {searchKeyword}</span>}
                </div>
                <button
                  onClick={() => { setSelectedRegion('전체'); setSelectedJobType('전체'); setSearchKeyword(''); }}
                  className="font-bold text-emerald-700 underline text-xs hover:text-emerald-900"
                >
                  초기화
                </button>
              </div>
            )}

            {/* 1. 구인정보 (Job Offers) 섹션 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-6 bg-emerald-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">{t('jobOffersTitle')}</h2>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                    {t('totalCount').replace('{count}', String(filteredOffers.length))}
                  </span>
                </div>
                <Link
                  href="/jobs"
                  className="text-xs font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition"
                >
                  <span>{t('viewMore')}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 모던 테이블 뷰 (PC/태블릿) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold border-y border-slate-100">
                      <th className="py-3 px-4 w-24">{t('thCategory')}</th>
                      <th className="py-3 px-4">{t('thTitle')}</th>
                      <th className="py-3 px-4 w-28 text-center">{t('thSalary')}</th>
                      <th className="py-3 px-4 w-20 text-center">{t('thRegion')}</th>
                      <th className="py-3 px-4 w-20 text-center">{t('thDate')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredOffers.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800 group-hover:text-emerald-600 transition">
                          <Link href={`/jobs/${item.id}`} className="flex items-center gap-2">
                            {item.urgent && (
                              <span className="bg-rose-50 text-rose-600 text-[10px] font-black px-1.5 py-0.5 rounded shrink-0">
                                급구
                              </span>
                            )}
                            <span className="line-clamp-1">{item.title}</span>
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs font-bold text-emerald-600">
                          {item.salary}
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs font-medium text-slate-600">
                          {item.region}
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs text-slate-400 font-medium">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 모바일 카드 리스트 뷰 */}
              <div className="sm:hidden space-y-3">
                {filteredOffers.map((item) => (
                  <Link
                    key={item.id}
                    href={`/jobs/${item.id}`}
                    className="block p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500 transition"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="text-slate-400">{item.date}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                      {item.title}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                      <span className="text-emerald-600 font-bold">{item.salary}</span>
                      <span>지역: {item.region}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. 구직정보 (Job Seekers) 섹션 */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-6 bg-teal-600 rounded-full"></div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">{t('jobSeekersTitle')}</h2>
                  <span className="text-xs bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-md">
                    {t('totalPeople').replace('{count}', String(filteredSeekers.length))}
                  </span>
                </div>
                <Link
                  href="/resumes"
                  className="text-xs font-bold text-slate-500 hover:text-teal-600 flex items-center gap-1 transition"
                >
                  <span>{t('viewMore')}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 모던 테이블 뷰 (PC/태블릿) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold border-y border-slate-100">
                      <th className="py-3 px-4 w-24">{t('thCategory')}</th>
                      <th className="py-3 px-4">{t('thTitle')}</th>
                      <th className="py-3 px-4 w-20 text-center">{t('thRegion')}</th>
                      <th className="py-3 px-4 w-20 text-center">{t('thType')}</th>
                      <th className="py-3 px-4 w-24 text-center">{t('thVisaInfo')}</th>
                      <th className="py-3 px-4 w-20 text-center">{t('thDate')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredSeekers.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800 group-hover:text-teal-600 transition">
                          <span className="line-clamp-1">{item.title}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs font-medium text-slate-600">
                          {item.region}
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs font-semibold text-slate-700">
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded">{item.type}</span>
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs text-slate-600">
                          <div className="font-bold text-teal-700">{item.visa}</div>
                          <div className="text-[11px] text-slate-400">{item.info}</div>
                        </td>
                        <td className="py-3.5 px-4 text-center text-xs text-slate-400 font-medium">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 모바일 카드 리스트 뷰 */}
              <div className="sm:hidden space-y-3">
                {filteredSeekers.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded">
                        {item.category} ({item.visa})
                      </span>
                      <span className="text-slate-400">{item.date}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                      {item.title}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                      <span className="font-semibold text-slate-700">{item.info}</span>
                      <span>희망지역: {item.region}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. 특화 솔루션: 기존 인트로 5대 핵심 사업 영역 완벽 승계 카드 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {t('pillarsTitle')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t('pillarsSubtitle')}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Core Business
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {/* 1. 외국인 인력공급 */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500 transition group hover:shadow-md">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center font-black mb-3 text-sm group-hover:scale-110 transition shadow-2xs">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-0.5">{t('pillar1Title')}</h4>
                  <div className="text-[10px] font-bold text-emerald-600 mb-2">{t('pillar1Sub')}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{t('pillar1Desc')}</p>
                </div>

                {/* 2. 취업알선 */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500 transition group hover:shadow-md">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center font-black mb-3 text-sm group-hover:scale-110 transition shadow-2xs">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-0.5">{t('pillar2Title')}</h4>
                  <div className="text-[10px] font-bold text-emerald-600 mb-2">{t('pillar2Sub')}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{t('pillar2Desc')}</p>
                </div>

                {/* 3. 비자발급·대행 */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500 transition group hover:shadow-md">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center font-black mb-3 text-sm group-hover:scale-110 transition shadow-2xs">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-0.5">{t('pillar3Title')}</h4>
                  <div className="text-[10px] font-bold text-emerald-600 mb-2">{t('pillar3Sub')}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{t('pillar3Desc')}</p>
                </div>

                {/* 4. 한국유학 & 어학연수 */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500 transition group hover:shadow-md">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center font-black mb-3 text-sm group-hover:scale-110 transition shadow-2xs">
                    4
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-0.5">{t('pillar4Title')}</h4>
                  <div className="text-[10px] font-bold text-emerald-600 mb-2">{t('pillar4Sub')}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{t('pillar4Desc')}</p>
                </div>

                {/* 5. 전문 하우스키퍼 (룸메이드) */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-500 transition group hover:shadow-md">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center justify-center font-black mb-3 text-sm group-hover:scale-110 transition shadow-2xs">
                    5
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-0.5">{t('pillar5Title')}</h4>
                  <div className="text-[10px] font-bold text-emerald-600 mb-2">{t('pillar5Sub')}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">{t('pillar5Desc')}</p>
                </div>
              </div>
            </div>

          </main>
        </div>
      </section>

    </div>
  );
}
