'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Menu, X, PhoneCall, PlusCircle, Search } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 현재 경로와 메뉴 링크의 일치 여부 판별 함수
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navItems = [
    { href: '/about', label: '회사소개' },
    { href: '/jobs', label: '구인' },
    { href: '/resumes', label: '구직' },
    { href: '/student-jobs', label: '유학생 취업', badge: 'D-2' },
    { href: '/part-time', label: '아르바이트' },
    { href: '/visa-inquiry', label: '문의하기 (비자·행정)' },
    { href: '/community', label: '커뮤니티' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* 1. 최상단 헤더 바: 모바일에서는 [로고/사명]과 [언어선택 + 햄버거 메뉴]가 단정하게 한 줄로 정렬 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* 브랜드 로고: 3D 심볼 + 사명(록산에버그린) + 영문 도메인 */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="h-10 w-12 sm:h-12 sm:w-20 rounded-xl overflow-hidden shadow-xs group-hover:scale-105 transition-all flex items-center justify-center bg-[#8ab9ff] border border-sky-300/60 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/roksan_original_symbol.png" 
                alt="록산에버그린 오리지널 로고" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition">
                  록산에버그린<span className="text-emerald-600 font-bold text-xs sm:text-sm ml-0.5">(주)</span>
                </span>
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold tracking-tight text-emerald-600 leading-tight mt-0.5">
                roksanevergreen<span className="text-slate-700 font-bold">.com</span>
              </div>
            </div>
          </Link>

          {/* 중앙 상단 빠른 검색창 (PC 전용) */}
          <div className="flex-1 max-w-md mx-auto hidden lg:flex items-center gap-2 border-2 border-emerald-500/80 rounded-full px-4 py-1 bg-slate-50/50 shadow-inner focus-within:border-emerald-600 focus-within:bg-white transition">
            <input
              type="text"
              placeholder="회사명, 직종, 지역 검색"
              className="w-full text-xs bg-transparent outline-none text-slate-800 placeholder:text-slate-400 font-medium"
            />
            <button className="text-emerald-600 hover:text-emerald-700 p-0.5" aria-label="Search">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 우측 유틸리티 영역 */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs text-slate-600">
            {/* PC 전용 홈/로그인 텍스트 링크 */}
            <div className="hidden md:flex items-center gap-2.5">
              <Link href="/" className="hover:text-emerald-600 font-medium transition">
                {t('home')}
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/login" className="hover:text-emerald-600 font-medium transition">
                {t('login')}
              </Link>
              <span className="text-slate-300">|</span>
            </div>

            {/* 다국어 언어선택 (모바일에서는 간결한 원형 국기 버튼, PC에서는 라벨 포함) */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100/90 rounded-full p-0.5 sm:p-1 border border-slate-200 shadow-2xs">
              <button
                onClick={() => setLang('ko')}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full transition text-xs font-bold ${
                  lang === 'ko'
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500 font-black'
                    : 'text-slate-600 hover:text-slate-900 opacity-60 hover:opacity-100'
                }`}
                title="한국어 (Korean)"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://flagcdn.com/w40/kr.png"
                  alt="한국어"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-cover border border-slate-200"
                />
                <span className="text-[10px] sm:text-[11px] hidden xs:inline">KOR</span>
              </button>

              <button
                onClick={() => setLang('en')}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full transition text-xs font-bold ${
                  lang === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500 font-black'
                    : 'text-slate-600 hover:text-slate-900 opacity-60 hover:opacity-100'
                }`}
                title="English"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://flagcdn.com/w40/us.png"
                  alt="English"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full object-cover border border-slate-200"
                />
                <span className="text-[10px] sm:text-[11px] hidden xs:inline">ENG</span>
              </button>

              <button
                onClick={() => setLang('zh')}
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full transition text-xs font-bold ${
                  lang === 'zh'
                    ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-emerald-500 font-black'
                    : 'text-slate-600 hover:text-slate-900 opacity-60 hover:opacity-100'
                }`}
                title="中文 (Chinese)"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full overflow-hidden border border-slate-200 flex items-center justify-center">
                  <img
                    src="https://flagcdn.com/cn.svg"
                    alt="中文"
                    className="w-full h-full object-cover scale-125 object-left-top"
                  />
                </div>
                <span className="text-[10px] sm:text-[11px] hidden xs:inline">CHN</span>
              </button>
            </div>
            
            {/* 모바일 햄버거 메뉴 버튼 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 active:scale-95 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 2. 메인 GNB 그린 바 (현재 활성화된 메뉴 하이라이트 표시) */}
      <nav className="bg-emerald-600 text-white font-bold shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 text-sm sm:text-base overflow-x-auto scrollbar-none py-1.5">
            {[
              { href: '/about', label: t('about') },
              { href: '/jobs', label: t('jobs') },
              { href: '/resumes', label: t('resumes') },
              { href: '/student-jobs', label: t('studentJobs'), badge: 'D-2' },
              { href: '/part-time', label: t('partTime') },
              { href: '/visa-inquiry', label: t('visaInquiry') },
              { href: '/community', label: t('community') },
            ].map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                    active
                      ? 'bg-white text-emerald-800 shadow-sm font-black'
                      : 'hover:bg-emerald-700 text-white font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-2xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/jobs/new"
              className={`text-xs font-bold px-3.5 py-1.5 rounded-full shadow transition flex items-center gap-1 ${
                isActive('/jobs/new')
                  ? 'bg-emerald-950 text-white ring-2 ring-white'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t('postJob')}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 모바일 팝다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3">
          
          {/* 모바일 유저 상단 바: 로그인 & 회원가입 / 홈 */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-600 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80"
            >
              <span>{t('home')}</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200"
              >
                {t('login')}
              </Link>
              <Link
                href="/login?tab=register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-white px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 shadow-2xs"
              >
                회원가입
              </Link>
            </div>
          </div>

          {/* 메뉴 리스트 */}
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 px-3 rounded-xl font-bold transition flex items-center justify-between text-sm ${
                    active
                      ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
          {/* 모바일 언어 선택기 (국기 버튼) */}
          <div className="pt-2 pb-1 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">언어 선택 (Language)</span>
            <div className="flex items-center gap-1.5 bg-slate-100 rounded-full p-1 border border-slate-200">
              <button
                onClick={() => setLang('ko')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  lang === 'ko' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w40/kr.png" alt="KO" className="w-3.5 h-3.5 rounded-full object-cover" />
                <span>KO</span>
              </button>
              <button
                onClick={() => setLang('en')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  lang === 'en' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://flagcdn.com/w40/us.png" alt="EN" className="w-3.5 h-3.5 rounded-full object-cover" />
                <span>EN</span>
              </button>
              <button
                onClick={() => setLang('zh')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  lang === 'zh' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="w-3.5 h-3.5 rounded-full overflow-hidden flex items-center justify-center">
                  <img src="https://flagcdn.com/cn.svg" alt="CN" className="w-full h-full object-cover scale-125 object-left-top" />
                </div>
                <span>CN</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/jobs/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl shadow text-center flex items-center justify-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('postJob')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

