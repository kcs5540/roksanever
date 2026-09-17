'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Menu, X, PhoneCall, PlusCircle, Search } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            홈으로
          </Link>
          <span className="text-slate-300">|</span>
          <Link href="/login" className="hover:text-emerald-600 font-medium transition">
            로그인
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="hover:text-emerald-600 font-bold uppercase"
            >
              {lang === 'ko' ? 'Language (ENG)' : '한국어 (KOR)'}
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

      {/* 2. 메인 GNB 그린 바 (기존 친숙한 그린 톤앤매너 완벽 승계) */}
      <nav className="bg-emerald-600 text-white font-bold shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-4 md:space-x-8 text-sm sm:text-base overflow-x-auto scrollbar-none py-1">
            <Link
              href="/about"
              className="px-3 py-3 hover:bg-emerald-700/70 rounded-lg transition whitespace-nowrap text-emerald-100 hover:text-white"
            >
              회사소개
            </Link>
            <Link
              href="/jobs"
              className="px-3 py-3 hover:bg-emerald-700/70 rounded-lg transition whitespace-nowrap"
            >
              구인
            </Link>
            <Link
              href="/resumes"
              className="px-3 py-3 hover:bg-emerald-700/70 rounded-lg transition whitespace-nowrap"
            >
              구직
            </Link>
            <Link
              href="/student-jobs"
              className="px-3 py-3 hover:bg-emerald-700/70 rounded-lg transition whitespace-nowrap flex items-center gap-1.5"
            >
              <span>유학생 취업</span>
              <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded font-bold">D-2</span>
            </Link>
            <Link
              href="/part-time"
              className="px-3 py-3 hover:bg-emerald-700/70 rounded-lg transition whitespace-nowrap"
            >
              아르바이트
            </Link>
            <Link
              href="/visa-inquiry"
              className="px-3 py-3 hover:bg-emerald-700/70 rounded-lg transition whitespace-nowrap"
            >
              문의하기 (비자·행정)
            </Link>
            <Link
              href="/community"
              className="px-3 py-3 hover:bg-emerald-700/70 rounded-lg transition whitespace-nowrap"
            >
              커뮤니티
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/jobs/new"
              className="bg-white text-emerald-700 hover:bg-emerald-50 text-xs font-bold px-3 py-1.5 rounded-full shadow transition flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>공고 등록</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 모바일 팝다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          <Link href="/jobs" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-slate-800 border-b border-slate-100">
            구인 정보
          </Link>
          <Link href="/resumes" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-slate-800 border-b border-slate-100">
            구직 정보
          </Link>
          <Link href="/student-jobs" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-slate-800 border-b border-slate-100 flex items-center justify-between">
            <span>유학생 취업</span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 rounded font-bold">D-2</span>
          </Link>
          <Link href="/part-time" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-slate-800 border-b border-slate-100">
            아르바이트 (단기&middot;주말&middot;시간제)
          </Link>
          <Link href="/visa-inquiry" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-slate-800 border-b border-slate-100">
            비자 및 채용 문의
          </Link>
          <Link href="/community" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-bold text-slate-800 border-b border-slate-100">
            커뮤니티
          </Link>
          <div className="pt-2">
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
