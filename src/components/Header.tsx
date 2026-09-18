'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage, SUPPORTED_LANGUAGES, Language } from '@/context/LanguageContext';
import { Globe, Menu, X, PlusCircle, Search, ChevronDown, Check, User, UserPlus, LogIn } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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

            {/* 다국어 언어선택 (7개 주요 외국인 송출국가 완벽 지원 드롭다운) */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-100/95 hover:bg-white text-slate-800 font-bold p-1 sm:px-2.5 sm:py-1.5 rounded-full border border-slate-200 shadow-xs transition active:scale-95"
                title="언어 선택 (Choose Language)"
              >
                {/* 현재 선택된 언어의 국기 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SUPPORTED_LANGUAGES.find(l => l.code === lang)?.flag || 'https://flagcdn.com/w80/kr.png'}
                  alt={lang}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover shadow-2xs border border-slate-200"
                />
                <span className="text-xs font-black hidden sm:inline text-slate-800">
                  {SUPPORTED_LANGUAGES.find(l => l.code === lang)?.nativeName || '한국어'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${langDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {/* 7개국 언어 선택 드롭다운 팝업 */}
              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3.5 py-1.5 text-[11px] font-extrabold text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>언어 선택 / Language</span>
                      <span className="text-emerald-600 font-bold">7개국</span>
                    </div>
                    <div className="py-1 max-h-72 overflow-y-auto">
                      {SUPPORTED_LANGUAGES.map((item) => {
                        const isSelected = lang === item.code;
                        return (
                          <button
                            key={item.code}
                            onClick={() => {
                              setLang(item.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-800 font-black'
                                : 'text-slate-700 hover:bg-slate-50 font-medium'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.flag}
                                alt={item.name}
                                className="w-5 h-5 rounded-full object-cover shadow-2xs border border-slate-200 shrink-0"
                              />
                              <div className="text-left leading-tight">
                                <div className="font-bold">{item.nativeName}</div>
                                <div className="text-[10px] text-slate-400">{item.name}</div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 로그인/회원가입 직통 사람 아이콘 버튼 (원클릭 바로 이동) */}
            <Link
              href="/login"
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/90 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition active:scale-95 shadow-2xs"
              title="로그인 / 회원가입"
              aria-label="Login / Register"
            >
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </Link>
            
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
          {/* 모바일 언어 선택기 (7개 언어 원터치 그리드) */}
          <div className="pt-3 pb-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">언어 선택 / Choose Language</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">7개국 지원</span>
            </div>
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-1.5">
              {SUPPORTED_LANGUAGES.map((item) => {
                const isSelected = lang === item.code;
                return (
                  <button
                    key={item.code}
                    onClick={() => {
                      setLang(item.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded-xl border text-xs font-bold transition ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.flag}
                      alt={item.name}
                      className="w-4 h-4 rounded-full object-cover shadow-2xs border border-slate-200 shrink-0"
                    />
                    <span className="truncate">{item.nativeName}</span>
                  </button>
                );
              })}
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

