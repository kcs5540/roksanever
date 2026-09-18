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

    // Core Hero Slide 1
    heroJejuBadge: 'JOB IN JEJU ISLAND & GLOBAL MANPOWER',
    heroBadge: '국외유료직업소개 등록기관 | 비자 발급·대행 전문',
    heroTitle1: 'JOB IN JEJU ISLAND',
    heroTitle2: '외국인 인력공급 · 합법 비자대행',
    heroSubtitle: '외국인 인력공급 · 취업알선 · 비자발급 대행 · 한국유학&어학연수 · 전문 하우스키퍼까지 원스톱으로 지원합니다.',
    targetVisaLabel: '지원 대상 비자 자격:',
    targetVisaList: 'E-7 · E-9 · D-2 · H-2 · F계열 합법 취업',
    findJobBtn: '외국인 일자리 찾기',
    freeVisaBtn: '비자 발급 무료 상담',

    // Hero Slide 2
    slide2Badge: '기업 맞춤형 상시 인력 파견 · 도급 · 채용 대행',
    slide2Title1: '필요한 현장에 검증된 인재를,',
    slide2Title2: 'We supply Manpower',
    slide2Desc: '특급 호텔·리조트 룸메이드, 하우스키퍼, 조선소 선박 배관 용접사, 자동차 부품 및 식품 가공 제조업 숙련 인력을 신속하고 정확하게 공급합니다.',
    slide2Btn1: '전문 인력 공고 보러가기',
    slide2Btn2: '기업 인력 요청 상담 (064-711-8578)',
    slide2ImgBadge: '철저한 신원 보증 & 합법 비자 체류 확인',

    // Hero Slide 3
    slide3Badge: '글로벌 어학연수 · 유학 · 비자 행정 전문',
    slide3Title1: '한국 유학부터 합법 취업까지,',
    slide3Title2: 'Language Training Arrangement',
    slide3Desc: '외국인 유학생(D-2, D-4) 비자 발급, 어학연수 매칭 및 출입국관리사무소 시간제 취업 허가증 발급 행정 절차를 완벽 지원합니다.',
    slide3Card1Title: 'D-2 유학생 시간제 취업',
    slide3Card1Desc: '주중 식음료/서비스 및 주말 파트타임 알선',
    slide3Card2Title: 'E-7/F-4 체류자격 변경',
    slide3Card2Desc: '졸업 후 전문 취업비자 연계 및 체류 연장',
    slide3Btn: '유학·비자 무료 행정상담 신청',

    // Search bar
    searchPlaceholder: '찾으시는 회사명, 직종(룸메이드, 용접 등), 지역을 입력해주세요.',
    btnSearch: '검색하기',

    // 16 countries card
    networkTitle: '16개국 공식 송출 · 취업 네트워크',
    networkBadge: '16개 협력국',
    networkFooter: '합법 비자 취업 지원 협약국',
    verifiedTalent: '신원 보증',

    // Sidebars
    regionTitle: '지역별 구인 / 구직',
    regionBadge: '전국',
    jobTypeTitle: '직종별 구인 / 구직',
    jobTypeBadge: '원클릭 이동',
    quickOffer: '구인',
    quickSeek: '구직',
    urgentCallTitle: '인력 급구 & 비자 즉시 상담',
    urgentCallBtn: '전화 바로 걸기',

    // Lists
    jobOffersTitle: '구인정보',
    jobSeekersTitle: '구직정보',
    totalCount: '총 {count}건',
    totalPeople: '총 {count}명',
    viewMore: '더보기',
    thCategory: '분야',
    thTitle: '제목',
    thSalary: '급여',
    thRegion: '지역',
    thDate: '등록일',
    thType: '구분',
    thVisaInfo: '비자/연령',

    // 5 Core Pillars Section
    pillarsTitle: '록산에버그린 5대 핵심 전문 분야',
    pillarsSubtitle: '기존 인트로 핵심 정체성을 계승한 5대 외국인 종합 고용 및 비자 지원 서비스',
    pillar1Title: '외국인 인력공급',
    pillar1Sub: 'Foreign Labor Supply / 外国人力供应',
    pillar1Desc: '제조, 농축산, 어업, 관광/서비스 등 국내 산업군 맞춤 숙련 인력 상시 공급',
    pillar2Title: '취업알선',
    pillar2Sub: 'Job Placement / 就业中介',
    pillar2Desc: '외국인 전문 구직자 ↔ 제주 및 전국 고용 기업 간 1:1 정밀 매칭 및 사후관리',
    pillar3Title: '비자발급 · 대행',
    pillar3Sub: 'Visa Issuance Agency / 签证发放,代理',
    pillar3Desc: 'E-7, E-9, D-2, F-4 등 출입국 비자 행정 서류 발급, 자격변경 및 체류 연장 대행',
    pillar4Title: '한국유학&어학연수',
    pillar4Sub: 'Study Abroad / 韩国留学&语言研修',
    pillar4Desc: '외국인 유학생 유치 연계, 국내 대학 입학/연수 및 합법적 D-2 아르바이트 지원',
    pillar5Title: '하우스키퍼 (룸메이드)',
    pillar5Sub: 'Housekeeper / 管家',
    pillar5Desc: '제주 특급호텔, 리조트, 펜션 등 객실 정비 및 시설관리 특화 전문 인력 파견',

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
    postJob: 'Post Job',

    // Official Registration
    regLicense: 'Overseas Job Placement Agency Lic. f1630120240001',
    regSub: 'Registered overseas job placement agency',

    // Core Hero Slide 1
    heroJejuBadge: 'JOB IN JEJU ISLAND & GLOBAL MANPOWER',
    heroBadge: 'Registered Overseas Placement Agency | Visa Specialist',
    heroTitle1: 'JOB IN JEJU ISLAND',
    heroTitle2: 'Foreign Labor Supply & Visa Agency',
    heroSubtitle: 'One-stop support for Foreign labor supply · Job placement · Visa issuance agency · Study in Korea & language training · Professional housekeepers.',
    targetVisaLabel: 'Supported Visa Types:',
    targetVisaList: 'E-7 · E-9 · D-2 · H-2 · F-Visas Legal Employment',
    findJobBtn: 'Find Jobs in Korea',
    freeVisaBtn: 'Free Visa Consultation',

    // Hero Slide 2
    slide2Badge: 'Custom Manpower Dispatch · Contracting · Recruitment Agency',
    slide2Title1: 'Verified Talents for Your Workplace,',
    slide2Title2: 'We supply Manpower',
    slide2Desc: 'Promptly providing skilled workers for luxury hotels, resorts, room-maids, housekeepers, shipyard TIG welders, automotive parts, and food manufacturing.',
    slide2Btn1: 'Browse Specialized Jobs',
    slide2Btn2: 'Manpower Request Call (+82-64-711-8578)',
    slide2ImgBadge: 'Strict Identity Verification & Legal Visa Residency',

    // Hero Slide 3
    slide3Badge: 'Global Language Training · Study Abroad · Visa Administration',
    slide3Title1: 'From Studying in Korea to Employment,',
    slide3Title2: 'Language Training Arrangement',
    slide3Desc: 'Comprehensive support for international student (D-2, D-4) visas, language training matching, and immigration part-time work permit procedures.',
    slide3Card1Title: 'D-2 Student Part-Time Jobs',
    slide3Card1Desc: 'Weekday F&B, service jobs, and weekend part-time placements',
    slide3Card2Title: 'E-7 / F-4 Visa Status Change',
    slide3Card2Desc: 'Post-graduation professional work visa linkage and residency extensions',
    slide3Btn: 'Apply for Free Study & Visa Consultation',

    // Search bar
    searchPlaceholder: 'Search company, job category (Room-maid, Welder, etc.), region...',
    btnSearch: 'Search',

    // 16 countries card
    networkTitle: '16 Sending Countries Network',
    networkBadge: '16 Countries',
    networkFooter: 'Legal Employment Partner Countries',
    verifiedTalent: 'Identity Verified',

    // Sidebars
    regionTitle: 'Jobs by Region',
    regionBadge: 'Nationwide',
    jobTypeTitle: 'Jobs by Category',
    jobTypeBadge: 'Quick Jump',
    quickOffer: 'Hiring',
    quickSeek: 'Seeking',
    urgentCallTitle: 'Urgent Manpower & Visa Hotline',
    urgentCallBtn: 'Call Immediately',

    // Lists
    jobOffersTitle: 'Job Offers',
    jobSeekersTitle: 'Talent Profiles',
    totalCount: 'Total {count}',
    totalPeople: 'Total {count} talents',
    viewMore: 'More',
    thCategory: 'Category',
    thTitle: 'Title',
    thSalary: 'Salary',
    thRegion: 'Region',
    thDate: 'Date',
    thType: 'Type',
    thVisaInfo: 'Visa/Age',

    // 5 Core Pillars Section
    pillarsTitle: 'Our 5 Core Business Pillars',
    pillarsSubtitle: 'Dedicated global manpower and legal visa services continuing our foundational identity',
    pillar1Title: 'Foreign Labor Supply',
    pillar1Sub: 'Foreign Labor Supply / 外国人力供应',
    pillar1Desc: 'Supplying skilled global manpower for manufacturing, agriculture, fisheries, tourism, and services',
    pillar2Title: 'Job Placement',
    pillar2Sub: 'Job Placement / 就业中介',
    pillar2Desc: '1:1 precise matching and continuous care between foreign talents and enterprises in Jeju & nationwide',
    pillar3Title: 'Visa Issuance & Agency',
    pillar3Sub: 'Visa Issuance Agency / 签证发放,代理',
    pillar3Desc: 'Immigration administrative documentation, status change, and extension agency for E-7, E-9, D-2, F-4, etc.',
    pillar4Title: 'Study Abroad & Language',
    pillar4Sub: 'Study Abroad / 韩国留学&语言研修',
    pillar4Desc: 'Recruitment and admissions to Korean universities, language institutes, and legal D-2 student part-time support',
    pillar5Title: 'Housekeeper (Room-maid)',
    pillar5Sub: 'Housekeeper / 管家',
    pillar5Desc: 'Specialized staffing for luxury hotels, resorts, and villas in Jeju for room maintenance and facility care',

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

    // Core Hero Slide 1
    heroJejuBadge: 'JOB IN JEJU ISLAND & 国际人力专业机构',
    heroBadge: '国外职业介绍许可机关 | 签证发放·代理专业机构',
    heroTitle1: 'JOB IN JEJU ISLAND',
    heroTitle2: '外国人人力供应 · 合法签证代理',
    heroSubtitle: '外国人人力供应 · 就业中介 · 签证发放与代理 · 韩国留学&语言研修 · 专业管家(Housekeeper)一站式服务。',
    targetVisaLabel: '支持在留签证资格:',
    targetVisaList: 'E-7 · E-9 · D-2 · H-2 · F系列 合法就业',
    findJobBtn: '寻找韩国工作',
    freeVisaBtn: '免费签证咨询',

    // Hero Slide 2
    slide2Badge: '企业定制常驻派遣 · 外包 · 招聘代理',
    slide2Title1: '为所需现场输送经核实的优秀人才,',
    slide2Title2: 'We supply Manpower',
    slide2Desc: '快速精准供应特级酒店·度假村客房清扫(管家)、造船厂TIG管道焊工、汽车配件及食品加工制造熟练工。',
    slide2Btn1: '查看专业人才职位',
    slide2Btn2: '企业用工咨询 (+82-64-711-8578)',
    slide2ImgBadge: '严格身份核实 & 合法在留资格确认',

    // Hero Slide 3
    slide3Badge: '全球语言研修 · 韩国留学 · 签证行政专业机构',
    slide3Title1: '从韩国留学到合法就业,',
    slide3Title2: 'Language Training Arrangement',
    slide3Desc: '全方位支持外国留学生(D-2, D-4)签证签发、语言研修对接及出入境打工许可证申请等行政手续。',
    slide3Card1Title: 'D-2 留学生勤工俭学',
    slide3Card1Desc: '周中餐饮/服务及周末兼职精准推荐',
    slide3Card2Title: 'E-7 / F-4 在留资格变更',
    slide3Card2Desc: '毕业后专业工作签证对接与居留延期',
    slide3Btn: '申请免费留学·签证行政咨询',

    // Search bar
    searchPlaceholder: '请输入公司名称、职位(客房清扫、焊接工等)或地区...',
    btnSearch: '立即搜索',

    // 16 countries card
    networkTitle: '16个输送国官方就业网络',
    networkBadge: '16个合作国',
    networkFooter: '合法签证就业协议国',
    verifiedTalent: '身份保障',

    // Sidebars
    regionTitle: '按地区 招聘 / 求职',
    regionBadge: '全韩',
    jobTypeTitle: '按职位 招聘 / 求职',
    jobTypeBadge: '快速直达',
    quickOffer: '招聘',
    quickSeek: '求职',
    urgentCallTitle: '用工急聘 & 签证快速热线',
    urgentCallBtn: '立即拨打电话',

    // Lists
    jobOffersTitle: '招聘信息',
    jobSeekersTitle: '求职人才',
    totalCount: '共 {count} 条',
    totalPeople: '共 {count} 名',
    viewMore: '查看更多',
    thCategory: '类别',
    thTitle: '标题',
    thSalary: '薪资',
    thRegion: '地区',
    thDate: '日期',
    thType: '类型',
    thVisaInfo: '签证/年龄',

    // 5 Core Pillars Section
    pillarsTitle: '禄山常青 5大核心专业领域',
    pillarsSubtitle: '传承核心经营理念的5大外国人综合就业与签证代理服务',
    pillar1Title: '外国人人力供应',
    pillar1Sub: 'Foreign Labor Supply / 外国人力供应',
    pillar1Desc: '常年供应制造业、农畜业、渔业、观光及餐饮服务等领域熟练技术工人',
    pillar2Title: '就业中介',
    pillar2Sub: 'Job Placement / 就业中介',
    pillar2Desc: '外国专业人才与济州及韩国各地招聘企业间1:1精准对接与全程跟踪服务',
    pillar3Title: '签证签发 · 代理',
    pillar3Sub: 'Visa Issuance Agency / 签证发放,代理',
    pillar3Desc: '全权代理E-7, E-9, D-2, F-4等出入境行政文件签发、在留资格变更及签证延期',
    pillar4Title: '韩国留学&语言研修',
    pillar4Sub: 'Study Abroad / 韩国留学&语言研修',
    pillar4Desc: '留学生招募对接、韩国知名大学入学/语学堂研修及合法D-2兼职许可支持',
    pillar5Title: '专业管家 (客房清扫)',
    pillar5Sub: 'Housekeeper / 管家',
    pillar5Desc: '面向济州特级酒店、高端度假村及独栋别墅输送客房整备与设施管理专业人才',

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
