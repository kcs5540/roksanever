'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Navigation
    home: '홈',
    jobs: '구인정보',
    resumes: '구직인재',
    studentJobs: '유학생 취업',
    visaInquiry: '비자/행정상담',
    community: '커뮤니티',
    login: '로그인',
    postJob: '공고 등록하기',

    // Hero Section
    heroBadge: '글로벌 인력 매칭 & 비자 전문 행정 파트너',
    heroTitle: '신뢰할 수 있는 내·외국인 맞춤형 일자리 매칭',
    heroSubtitle: '호텔·리조트, 제조업, 조선/용접, 유학생 파트타임부터 비자 발급 및 체류 행정까지 원스톱으로 지원합니다.',
    searchPlaceholder: '직종, 회사명, 지역 검색...',
    btnSearch: '검색',
    findJobBtn: '맞춤 일자리 찾기',
    postResumeBtn: '간편 이력서 등록',

    // Filter
    filterAll: '전체',
    filterVisa: '비자 필터',
    filterCategory: '직종 카테고리',
    filterRegion: '지역',

    // Statistics
    statPartners: '제휴 협력사',
    statSuccessfulMatch: '취업/매칭 완료',
    statVisaApproval: '비자 행정 승인율',

    // Services
    serviceTitle: '록산에버그린 핵심 전문 분야',
    serviceSubtitle: '기업에는 검증된 우수 인재를, 구직자에게는 안전한 일자리와 합법적 비자 연계를 제공합니다.',

    // Contact CTA
    ctaTitle: '비자 발급부터 채용까지 지금 바로 무료 상담하세요',
    ctaSubtitle: '외국인 고용 절차, E-7/E-9/D-2/F-4 등 비자 체류 자격 전문 상담원이 친절히 안내해 드립니다.',
    ctaCallBtn: '전화 상담하기',
    ctaKakaoBtn: '카카오톡 상담',

    // Footer
    companyName: '록산에버그린 주식회사',
    address: '제주특별자치도 제주시 서광로 107-6 (용담이동)',
    ceo: '대표자 : 김찬식',
    bizNum: '사업자등록번호 : 616-81-02802',
    phone: '전화 : 064-711-8578 / 010-5731-8578',
    email: '이메일 : roksan22@daum.net',
    affiliates: '유관기관 바로가기'
  },
  en: {
    // Navigation
    home: 'Home',
    jobs: 'Jobs',
    resumes: 'Talents',
    studentJobs: 'Student Jobs',
    visaInquiry: 'Visa / Consulting',
    community: 'Community',
    login: 'Login',
    postJob: 'Post a Job',

    // Hero Section
    heroBadge: 'Global Manpower Matching & Visa Administration Partner',
    heroTitle: 'Reliable Employment for Domestic & Foreign Workers',
    heroSubtitle: 'One-stop support from hotel & resort staff, manufacturing, welding, student part-time jobs to visa issuance and administrative support.',
    searchPlaceholder: 'Search jobs, company, region...',
    btnSearch: 'Search',
    findJobBtn: 'Find Jobs',
    postResumeBtn: 'Register Resume',

    // Filter
    filterAll: 'All',
    filterVisa: 'Visa Filter',
    filterCategory: 'Job Category',
    filterRegion: 'Region',

    // Statistics
    statPartners: 'Partner Companies',
    statSuccessfulMatch: 'Successful Placements',
    statVisaApproval: 'Visa Approval Rate',

    // Services
    serviceTitle: 'Our Specialized Expertise',
    serviceSubtitle: 'Providing verified top talent to enterprises, and safe jobs with legitimate visa linkage to job seekers.',

    // Contact CTA
    ctaTitle: 'Free Consultation from Visa Issuance to Employment',
    ctaSubtitle: 'Professional counselors guide you through hiring foreign workers and visa qualifications (E-7, E-9, D-2, F-4, etc.).',
    ctaCallBtn: 'Call Consultation',
    ctaKakaoBtn: 'KakaoTalk Chat',

    // Footer
    companyName: 'Roksan Evergreen Co., Ltd.',
    address: '107-6, Seogwang-ro, Jeju-si, Jeju-do, Republic of Korea',
    ceo: 'CEO: Chan-sik Kim',
    bizNum: 'Business Reg. No: 616-81-02802',
    phone: 'Tel : +82-64-711-8578 / +82-10-5731-8578',
    email: 'Email : roksan22@daum.net',
    affiliates: 'Related Organizations'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
