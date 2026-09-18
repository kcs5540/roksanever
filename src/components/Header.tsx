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
      {/* 1. 최상단 서브 바: 로고 + 검색창 + 유틸리티 (홈으로 / 로그인 / 언어) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* 브랜드 로고: 신규 고해상도 3D 심볼 + 한글 사명(록산에버그린) + 영문 도메인 */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* 사용자가 제공한 기존 고유 로고 문양 원본 그대로 적용 */}
          <div className="h-12 w-16 sm:w-20 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-all flex items-center justify-center bg-[#8ab9ff] border border-sky-300/60 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/roksan_original_symbol.png" 
              alt="록산에버그린 오리지널 로고" 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="flex flex-col">
            {/* 한글 사명 */}
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition">
                록산에버그린<span className="text-emerald-600 font-bold text-sm ml-0.5">(주)</span>
              </span>
            </div>

            {/* 영문 브랜드 도메인 */}
            <div className="text-xs sm:text-sm font-extrabold tracking-tight text-emerald-600 leading-tight mt-0.5">
              roksanevergreen<span className="text-slate-700 font-bold">.com</span>
            </div>
          </div>
        </Link>

        {/* 중앙 상단 빠른 검색창 (원본 형태를 슬림하고 모던하게 배치) */}
        <div className="flex-1 max-w-lg mx-auto hidden md:flex items-center gap-2 border-2 border-emerald-500/80 rounded-full px-4 py-1.5 bg-slate-50/50 shadow-inner focus-within:border-emerald-600 focus-within:bg-white transition">
          <input
            type="text"
            placeholder="찾으시는 회사명, 직종, 지역 등을 입력해주세요."
            className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400 font-medium"
          />
          <button className="text-emerald-600 hover:text-emerald-700 p-1">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* 우측 유틸리티 메뉴 */}
        <div className="flex items-center justify-end gap-3 text-xs text-slate-600">
          <Link href="/" className="hover:text-emerald-600 font-medium transition">
            {t('home')}
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/login" className="hover:text-emerald-600 font-medium transition">
            {t('login')}
          </Link>
          <span className="text-slate-300">|</span>
          {/* 다국어 언어선택 (원본 인트로의 국기 버튼 스타일 계승: 🇰🇷 🇺🇸 🇨🇳) */}
          <div className="flex items-center gap-1.5 bg-slate-100/90 rounded-full px-2 py-1 border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-emerald-600 mr-0.5" />
            <button
              onClick={() => setLang('ko')}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full transition text-[11px] font-bold ${
                lang === 'ko' ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-emerald-400 font-extrabold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="한국어 (KOR)"
            >
              <span>🇰🇷</span>
              <span className="hidden sm:inline">KO</span>
            </button>
            <button
              onClick={() => setLang('en')}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full transition text-[11px] font-bold ${
                lang === 'en' ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-emerald-400 font-extrabold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="English (ENG)"
            >
              <span>🇺🇸</span>
              <span className="hidden sm:inline">EN</span>
            </button>
            <button
              onClick={() => setLang('zh')}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full transition text-[11px] font-bold ${
                lang === 'zh' ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-emerald-400 font-extrabold' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="中文 (CHN)"
            >
              <span>🇨🇳</span>
              <span className="hidden sm:inline">CN</span>
            </button>
          </div>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:text-emerald-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 text-sm sm:text-base ${
                    active
                      ? 'bg-emerald-800/90 text-white shadow-inner ring-2 ring-white/70 font-extrabold'
                      : 'text-emerald-50 hover:bg-emerald-700/60 hover:text-white font-bold'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      active ? 'bg-white text-emerald-800' : 'bg-white/20 text-white'
                    }`}>
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
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-xl font-bold transition flex items-center justify-between ${
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
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="/jobs/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl shadow text-center flex items-center justify-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>구인공고 무료 등록 신청</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

