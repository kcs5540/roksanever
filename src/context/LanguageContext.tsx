'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en' | 'zh';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Navigation
    home: '홈',
    about: '회사소개',
    jobs: '구인',
    resumes: '구직',
    studentJobs: '유학생 취업',
    partTime: '아르바이트',
    visaInquiry: '비자/행정상담',
    community: '커뮤니티',
    login: '로그인',
    postJob: '공고 등록',

    // Official Registration
    regLicense: '국외유료직업소개사업 등록기관 f1630120240001',
    regSub: 'Registered overseas job placement agency',

    // Core Business Slogans
    heroJejuBadge: 'JOB IN JEJU ISLAND & GLOBAL MANPOWER',
    heroBadge: '국외유료직업소개 등록기관 | 비자 발급·대행 전문',
    heroTitle: '신뢰할 수 있는 내·외국인 맞춤형 일자리 매칭',
    heroSubtitle: '외국인 인력공급 · 취업알선 · 비자발급 대행 · 한국유학&어학연수 · 전문 하우스키퍼까지 원스톱으로 지원합니다.',
    searchPlaceholder: '직종(룸메이드, 하우스키퍼, 용접 등), 회사명, 지역 검색...',
    btnSearch: '검색',
    findJobBtn: '외국인 일자리 찾기',
    postResumeBtn: '인재 등록 / 이력서',

    // 5 Core Pillars
    pillarLaborSupply: '외국인 인력공급',
    pillarLaborSupplyEn: 'Foreign Labor Supply',
    pillarLaborSupplyZh: '外国人力供应',
    
    pillarPlacement: '취업알선',
    pillarPlacementEn: 'Job Placement',
    pillarPlacementZh: '就业中介',

    pillarVisa: '비자발급 & 대행',
    pillarVisaEn: 'Visa Issuance Agency',
    pillarVisaZh: '签证发放,代理',

    pillarStudyAbroad: '한국유학 & 어학연수',
    pillarStudyAbroadEn: 'Study Abroad & Language Training',
    pillarStudyAbroadZh: '韩国留学&语言研修',

    pillarHousekeeper: '하우스키퍼 & 룸메이드',
    pillarHousekeeperEn: 'Housekeeper & Room-maid',
    pillarHousekeeperZh: '管家 / 客房清扫',

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
    serviceTitle: '록산에버그린 5대 핵심 사업 분야',
    serviceSubtitle: '제주 및 국내 기업에는 검증된 우수 인재를, 구직자에게는 안전한 일자리와 합법적 비자 연계를 제공합니다.',

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
    about: 'About Us',
    jobs: 'Jobs',
    resumes: 'Talents',
    studentJobs: 'Student Jobs',
    partTime: 'Part-Time',
    visaInquiry: 'Visa / Consulting',
    community: 'Community',
    login: 'Login',
    postJob: 'Post a Job',

    // Official Registration
    regLicense: 'Overseas Job Placement Agency Lic. f1630120240001',
    regSub: 'Registered overseas job placement agency',

    // Core Business Slogans
    heroJejuBadge: 'JOB IN JEJU ISLAND & GLOBAL MANPOWER',
    heroBadge: 'Registered Overseas Job Placement Agency | Visa Specialist',
    heroTitle: 'JOB IN JEJU ISLAND & Nationwide Manpower Solutions',
    heroSubtitle: 'Foreign labor supply · Job placement · Visa issuance agency · Study abroad & language training · Housekeeper services.',
    searchPlaceholder: 'Search jobs (Housekeeper, Room-maid, Welding), company...',
    btnSearch: 'Search',
    findJobBtn: 'Find Jobs in Korea',
    postResumeBtn: 'Register Talent Profile',

    // 5 Core Pillars
    pillarLaborSupply: 'Foreign Labor Supply',
    pillarLaborSupplyEn: 'Foreign Labor Supply',
    pillarLaborSupplyZh: '外国人力供应',

    pillarPlacement: 'Job Placement',
    pillarPlacementEn: 'Job Placement',
    pillarPlacementZh: '就业中介',

    pillarVisa: 'Visa Issuance Agency',
    pillarVisaEn: 'Visa Issuance Agency',
    pillarVisaZh: '签证发放,代理',

    pillarStudyAbroad: 'Study Abroad & Language',
    pillarStudyAbroadEn: 'Study in Korea & Language Training',
    pillarStudyAbroadZh: '韩国留学&语言研修',

    pillarHousekeeper: 'Housekeeper & Room-maid',
    pillarHousekeeperEn: 'Housekeeper & Resort Cleaning',
    pillarHousekeeperZh: '管家 / 客房清扫',

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
    serviceTitle: 'Our 5 Specialized Business Pillars',
    serviceSubtitle: 'Providing verified global talent to enterprises in Jeju & nationwide, and safe jobs with legitimate visa linkage.',

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
  },
  zh: {
    // Navigation
    home: '首页',
    about: '公司介绍',
    jobs: '招聘信息',
    resumes: '求职人才',
    studentJobs: '留学生就业',
    partTime: '兼职打工',
    visaInquiry: '签证/行政咨询',
    community: '互动社区',
    login: '登录',
    postJob: '发布招聘',

    // Official Registration
    regLicense: '国外有偿职业介绍登记许可机构 f1630120240001',
    regSub: 'Registered overseas job placement agency',

    // Core Business Slogans
    heroJejuBadge: 'JOB IN JEJU ISLAND & 国际人力专业机构',
    heroBadge: '国外职业介绍许可机关 | 签证发放·代理专业机构',
    heroTitle: '济州岛与韩国全境 外国人就业·人力供应中心',
    heroSubtitle: '外国人人力供应 · 就业中介 · 签证发放与代理 · 韩国留学&语言研修 · 专业管家(Housekeeper)一站式服务。',
    searchPlaceholder: '搜索职位 (管家, 客房清扫, 焊接等), 公司名称...',
    btnSearch: '搜索',
    findJobBtn: '寻找韩国工作',
    postResumeBtn: '登记求职简历',

    // 5 Core Pillars
    pillarLaborSupply: '外国人力供应',
    pillarLaborSupplyEn: 'Foreign Labor Supply',
    pillarLaborSupplyZh: '外国人力供应',

    pillarPlacement: '就业中介',
    pillarPlacementEn: 'Job Placement',
    pillarPlacementZh: '就业中介',

    pillarVisa: '签证发放,代理',
    pillarVisaEn: 'Visa Issuance Agency',
    pillarVisaZh: '签证发放,代理',

    pillarStudyAbroad: '韩国留学&语言研修',
    pillarStudyAbroadEn: 'Study abroad in Korea & language training',
    pillarStudyAbroadZh: '韩国留学&语言研修',

    pillarHousekeeper: '专业管家 / 房间清洁',
    pillarHousekeeperEn: 'Housekeeper',
    pillarHousekeeperZh: '管家',

    // Filter
    filterAll: '全部',
    filterVisa: '签证种类',
    filterCategory: '职位分类',
    filterRegion: '地区',

    // Statistics
    statPartners: '合作企事业单位',
    statSuccessfulMatch: '匹配成功案例',
    statVisaApproval: '行政签证签发率',

    // Services
    serviceTitle: '禄山常青 5大核心专业领域',
    serviceSubtitle: '为济州及全韩企业输送经核实资质的优秀全球人才，为求职者提供合法签证支持与安心就业岗位。',

    // Contact CTA
    ctaTitle: '从签证签发到正式入职，立即获得免费咨询',
    ctaSubtitle: '专业行政团队全方位指导外国人聘用手续及 E-7, E-9, D-2, F-4 等在留资格办理。',
    ctaCallBtn: '立即电话咨询',
    ctaKakaoBtn: '在线咨询',

    // Footer
    companyName: '禄山常青 股份有限公司 (Roksan Evergreen Co., Ltd.)',
    address: '韩国济州特别自治道济州市西光路 107-6 (龙潭二洞)',
    ceo: '代表 : 金赞植',
    bizNum: '企业注册号 : 616-81-02802',
    phone: '电话 : +82-64-711-8578 / +82-10-5731-8578',
    email: '邮箱 : roksan22@daum.net',
    affiliates: '相关机构通道'
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
