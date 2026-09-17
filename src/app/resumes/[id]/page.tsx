'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { 
  User, 
  MapPin, 
  Clock, 
  Calendar, 
  Eye, 
  Phone, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Briefcase,
  Globe2,
  GraduationCap,
  Award,
  AlertCircle
} from 'lucide-react';

interface ResumeDetailPageProps {
  params: Promise<{ id: string }>;
}

// 12개 더미 구직자 전체 상세 데이터 매핑
const RESUME_DETAILS: Record<string, {
  id: string;
  target: 'korean' | 'foreigner';
  targetLabel: string;
  category: string;
  title: string;
  region: string;
  info: string;
  date: string;
  views: number;
  age: number;
  gender: string;
  visa: string;
  nationality: string;
  koreanLevel: string;
  experience: string;
  careerHistory: string[];
  selfIntro: string;
}> = {
  '1': {
    id: '1',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '영어 도우미',
    title: '영어 관련 일자리 찾고 있습니다 (외국인 학교/학원 등)',
    region: '서울',
    info: '23세 / 여 / D-2',
    date: '08-14',
    views: 184,
    age: 23,
    gender: '여성',
    visa: 'D-2 (유학 - 시간제 취업 허가 가능)',
    nationality: '미국 (원어민)',
    koreanLevel: '중급 (일상 대화 및 안내 가능)',
    experience: '1년 이상',
    careerHistory: [
      '국내 대학교 어학당 및 영어 회화 튜터링 1년',
      '키즈 영어 카페 및 방과 후 액티비티 보조 강사 6개월',
      '출입국관리사무소 D-2 유학생 시간제 취업 허가 요건 완비'
    ],
    selfIntro: `안녕하세요. 서울 소재 대학교에 재학 중인 유학생입니다. 
영어가 모국어이며 아이들을 좋아하고 성실합니다. 
유치부/초등부 영어 놀이 보조, 성인 기초 회화 파트타임, 외국인학교 행정 보조 등 합법적으로 근무 가능한 일자리를 희망합니다. 
시간 약속을 철저히 지키며 밝은 에너지로 근무하겠습니다.`
  },
  '2': {
    id: '2',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '제조업',
    title: '일자리를 구하는 성실한 외국인 여성입니다.',
    region: '전국',
    info: '34세 / 여 / F-4',
    date: '08-14',
    views: 142,
    age: 34,
    gender: '여성',
    visa: 'F-4 (재외동포 - 취업 제한 없음)',
    nationality: '중국 동포',
    koreanLevel: '원어민 수준 (한국어 완벽 소통)',
    experience: '3년 이상',
    careerHistory: [
      '전자부품 PCB 검사 및 조립 라인 2년',
      '식품 가공 및 소포장 위생라인 1년 6개월',
      '기숙사 입주 가능, 주야간 교대근무 경험 다수'
    ],
    selfIntro: `F-4 비자를 소지하고 있어 합법적 취업 및 4대보험 가입이 가능합니다. 
손이 빠르고 눈썰미가 좋아 검사 및 조립 포장 업무에 자신 있습니다. 
기숙사가 제공되는 제조업 공장이나 생산 라인을 희망하며, 장기 근속을 목표로 성실히 임하겠습니다.`
  },
  '3': {
    id: '3',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '기타',
    title: 'F2 비자 남자 일자리 구합니다. 제조업, 물류 가능',
    region: '부산',
    info: '36세 / 남 / F-2',
    date: '08-07',
    views: 210,
    age: 36,
    gender: '남성',
    visa: 'F-2 (거주비자 - 자유 취업 가능)',
    nationality: '외국국적',
    koreanLevel: '상급 (현장 의사소통 및 전산 입력 능숙)',
    experience: '4년',
    careerHistory: [
      '부산/경남 물류센터 입출고 피킹 및 패킹 2년',
      '금속 가공 및 지게차 3톤 미만 조종 가능',
      'F-2 거주 체류자격으로 비자 연장 문제 없음'
    ],
    selfIntro: `F-2 체류자격을 보유하고 있어 내국인과 동일하게 제약 없이 취업할 수 있습니다. 
체력이 튼튼하고 성실하며 물류 상하차, 피킹, 제조업 생산 보조 등 힘든 일도 마다하지 않고 해냅니다. 
부산 및 인근 경남 지역 출퇴근 또는 기숙사 근무 희망합니다.`
  },
  '4': {
    id: '4',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '제조업',
    title: '주야간 교대 생산직 일자리 찾읍니다.',
    region: '서울',
    info: '38세 / 남 / H-2',
    date: '08-07',
    views: 95,
    age: 38,
    gender: '남성',
    visa: 'H-2 (방문취업 - 취업개시신고 완료)',
    nationality: '중국 동포',
    koreanLevel: '원어민 수준',
    experience: '5년',
    careerHistory: [
      '사출성형 플라스틱 완제품 검사 및 잔업 특근 다수',
      '물류센터 파레트 랩핑 및 상하차 적재 작업'
    ],
    selfIntro: `잔업과 특근을 선호하며 성실하게 주야 2교대 근무 가능합니다. 
취업교육 이수 및 취업개시신고 자격을 갖추고 있습니다.`
  },
  '5': {
    id: '5',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '기타',
    title: 'F4남(30세), H2남(34세) 함께 일할 공장 구합니다.',
    region: '경기',
    info: '30대 / 남2 / F4,H2',
    date: '08-06',
    views: 312,
    age: 32,
    gender: '남성 2명 동반',
    visa: 'F-4, H-2',
    nationality: '중국 동포',
    koreanLevel: '능숙함',
    experience: '3년',
    careerHistory: [
      '경기권 자동차 부품 조립 라인 동반 근무 2년',
      '2인 1실 기숙사 희망, 장기 근속 보장'
    ],
    selfIntro: `형제처럼 손발 맞춰 일해온 2인 동반 취업 희망자입니다. 
둘 다 건강하고 근태 확실합니다. 함께 기숙사 생활하며 오래 일할 사업장 연락 부탁드립니다.`
  },
  '6': {
    id: '6',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '룸메이드',
    title: '호텔 객실 청소 경력 2년 유학생 주말/평일 알바',
    region: '제주',
    info: '25세 / 여 / D-2',
    date: '08-05',
    views: 285,
    age: 25,
    gender: '여성',
    visa: 'D-2 (유학생 시간제 취업)',
    nationality: '베트남',
    koreanLevel: '중상급 (TOPIK 4급)',
    experience: '2년',
    careerHistory: [
      '제주 중문 특급호텔 룸메이드 베드메이킹 1년 6개월',
      '호텔 F&B 연회장 기물 정리 및 서빙 경험'
    ],
    selfIntro: `제주도 내 대학교에 재학 중인 유학생입니다. 
호텔 린넨 교체, 베드메이킹, 화장실 어메니티 세팅 등 룸메이드 실무에 능숙합니다. 
주말 또는 평일 지정 시간대에 꼼꼼하고 신속하게 객실을 정비할 수 있습니다.`
  },
  '7': {
    id: '7',
    target: 'korean',
    targetLabel: '내국인',
    category: '간병인',
    title: '요양보호사 1급 자격증 보유 주간/야간 간병 일자리 희망',
    region: '제주',
    info: '54세 / 여 / 내국인',
    date: '07-28',
    views: 110,
    age: 54,
    gender: '여성',
    visa: '내국인',
    nationality: '대한민국',
    koreanLevel: '모국어',
    experience: '7년',
    careerHistory: [
      '요양병원 및 종합병원 입원환자 1:1 전담 간병 5년',
      '요양보호사 1급 국가공인 자격증 보유'
    ],
    selfIntro: `어르신들을 내 부모님처럼 따뜻하고 정성껏 모십니다. 
식사 보조, 체위 변경, 위생 관리, 투약 돕기 등 오랜 임상 경력으로 환자분의 쾌유를 성심성의껏 돕겠습니다.`
  },
  '8': {
    id: '8',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '용접공',
    title: '선박 TIG 배관 용접 경력 5년 (E-7 비자 전직 희망)',
    region: '울산',
    info: '32세 / 남 / E-7',
    date: '07-20',
    views: 450,
    age: 32,
    gender: '남성',
    visa: 'E-7-3 (일반기능인력 - 조선 용접)',
    nationality: '우즈베키스탄',
    koreanLevel: '중급 (도면 해석 및 현장 지시 이해 완벽)',
    experience: '5년',
    careerHistory: [
      '현대중공업 협력사 선체 배관 TIG 용접 3년',
      'AWS D1.1 및 선급 용접 기량 자격증 보유'
    ],
    selfIntro: `조선소 및 플랜트 현장 용접 기술자입니다. 
비파괴검사(RT) 통과율이 높고 안전 규정을 철저히 지킵니다. 
비자 전직 및 연장이 가능한 건실한 조선/중공업 사업장을 찾고 있습니다.`
  },
  '9': {
    id: '9',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '청소',
    title: '준공청소 및 오피스 정기 클리닝 팀 구직',
    region: '인천',
    info: '남녀3 / F-4,F-5',
    date: '07-15',
    views: 175,
    age: 40,
    gender: '팀(남2, 여1)',
    visa: 'F-4, F-5',
    nationality: '중국 동포',
    koreanLevel: '상급',
    experience: '4년',
    careerHistory: [
      '아파트 신축 현장 준공청소 및 입주청소 다수',
      '고압세척기 및 바닥 광택기 능숙 조작'
    ],
    selfIntro: `오랜 기간 합을 맞춰온 3인 전문 청소팀입니다. 
마감이 깔끔하고 속도가 빠르며 약속된 기일을 철저히 엄수합니다.`
  },
  '10': {
    id: '10',
    target: 'korean',
    targetLabel: '내국인',
    category: '가사 도우미',
    title: '가사/산후도우미 및 정리수납 전문가 구직',
    region: '서울',
    info: '49세 / 여 / 내국인',
    date: '07-02',
    views: 130,
    age: 49,
    gender: '여성',
    visa: '내국인',
    nationality: '대한민국',
    koreanLevel: '모국어',
    experience: '6년',
    careerHistory: [
      '강남/서초 가정집 정기 가사 및 정리수납 4년',
      '산후관리사 및 정리수납전문가 2급 자격증 보유'
    ],
    selfIntro: `위생과 청결을 최우선으로 생각합니다. 
반찬 만들기, 의류 세탁/다림질, 쾌적한 실내 정리수납을 믿고 맡기실 수 있습니다.`
  },
  '11': {
    id: '11',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '유학생 알바',
    title: '주말 식음료 서빙 및 설거지 파트타임 (시간제 취업허가 완료)',
    region: '제주',
    info: '22세 / 남 / D-2',
    date: '06-25',
    views: 198,
    age: 22,
    gender: '남성',
    visa: 'D-2 (유학생)',
    nationality: '몽골',
    koreanLevel: '중상급 (한국어 소통 능숙)',
    experience: '1년',
    careerHistory: [
      '제주시 대형 식당 홀서빙 및 주방 보조 1년',
      '출입국 시간제 취업허가서 완비'
    ],
    selfIntro: `성격이 밝고 힘이 좋아 손이 많이 가는 주방 보조나 매장 서빙에 적합합니다. 
주말 전일 근무 및 공휴일 근무 가능합니다.`
  },
  '12': {
    id: '12',
    target: 'foreigner',
    targetLabel: '외국인',
    category: '제조업',
    title: '비닐 가공 및 완제품 포장 라인 구직 (F4 비자)',
    region: '충남',
    info: '42세 / 여 / F-4',
    date: '06-18',
    views: 88,
    age: 42,
    gender: '여성',
    visa: 'F-4',
    nationality: '중국 동포',
    koreanLevel: '원어민 수준',
    experience: '4년',
    careerHistory: [
      '포장재 가공 공장 라인 피딩 및 박스 테이핑 3년',
      '단순 반복 업무 끈기 있게 수행'
    ],
    selfIntro: `지각이나 결근 없이 성실하게 근무합니다. 
기숙사 제공되는 지방 공장이나 주간 고정 생산직 환영합니다.`
  }
};

export default function ResumeDetailPage({ params }: ResumeDetailPageProps) {
  const resolvedParams = use(params);
  const resumeId = resolvedParams.id;

  const resume = RESUME_DETAILS[resumeId] || {
    id: resumeId,
    target: 'foreigner' as const,
    targetLabel: '외국인',
    category: '전문 인재',
    title: `[인재정보] 성실하고 책임감 있는 맞춤 구직자 프로필 (${resumeId}번)`,
    region: '제주 / 전국',
    info: '30대 / 남녀 / 합법 비자',
    date: '2026-03-15',
    views: 150,
    age: 32,
    gender: '남성',
    visa: '합법 취업 비자 보유',
    nationality: '외국국적 / 재외동포',
    koreanLevel: '의사소통 원활',
    experience: '2년 이상',
    careerHistory: [
      '현장 실무 경력 보유 및 즉시 출근 가능',
      '출입국관리법 준수 합법 체류자격 사전 검증 완료'
    ],
    selfIntro: `본 구직자는 록산에버그린(주)에 정식 등록되어 신원 및 체류자격 적합성 검토를 거친 우수 인재입니다.
구인을 희망하시는 사업주께서는 록산에버그린(주) 담당자에게 연락 주시면 맞춤 매칭 및 인터뷰 일정을 신속히 주선해 드립니다.`
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen pb-20">
      
      {/* 1. 상단 브레드크럼 & 헤더 */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/resumes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>구직(인재) 목록으로 돌아가기</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              조회 {resume.views}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              등록일: {resume.date}
            </span>
          </div>
        </div>
      </div>

      {/* 2. 메인 컨테이너 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 좌측 8컬럼: 인재 상세 프로필 */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 프로필 헤더 카드 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                  resume.target === 'foreigner' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  [{resume.targetLabel}]
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {resume.category}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  희망지역: {resume.region}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {resume.title}
              </h1>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 pb-4 border-b border-slate-100">
                <User className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-slate-900">구직자 기본 인적사항: {resume.info}</span>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 신원확인 인재
                </span>
              </div>

              {/* 핵심 스펙 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4">
                  <div className="text-xs text-blue-700 font-bold mb-1 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>체류 비자 / 자격</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-blue-900">
                    {resume.visa}
                  </div>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
                  <div className="text-xs text-emerald-700 font-bold mb-1 flex items-center gap-1.5">
                    <Globe2 className="w-4 h-4" />
                    <span>한국어 소통 수준</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-emerald-900">
                    {resume.koreanLevel}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs text-slate-500 font-bold mb-1 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>경력 기간</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {resume.experience}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs text-slate-500 font-bold mb-1 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>국적 및 희망지</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {resume.nationality} &middot; {resume.region}
                  </div>
                </div>
              </div>
            </div>

            {/* 주요 경력 및 자기소개 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              
              {/* 경력 사항 */}
              <div>
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>주요 경력 및 보유 자격</span>
                </h2>
                <ul className="mt-3 space-y-2">
                  {resume.careerHistory.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 자기소개 / 희망사항 */}
              <div>
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>자기소개 및 근무 희망 사항</span>
                </h2>
                <div className="mt-3 text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  {resume.selfIntro}
                </div>
              </div>

              {/* 주의사항 / 안심 채용 가이드 */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 text-xs text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span>록산에버그린 안심 인재 채용 보증</span>
                </div>
                <p className="leading-relaxed text-emerald-800/90">
                  록산에버그린(주)은 구직자의 신원, 체류자격(비자 유효기간), 취업허가증 유무를 철저히 사전 스크리닝하여 사업장에 안심하고 채용하실 수 있는 합법 인력만을 추천해 드립니다.
                </p>
              </div>

            </div>

          </div>

          {/* 우측 4컬럼: 채용 문의 및 직통 상담 카드 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 채용 문의 카드 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                이 인재 채용 & 면접 요청
              </div>

              <div className="space-y-3">
                <a
                  href="tel:010-5731-8578"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>인재 채용 전화 문의</span>
                </a>

                <Link
                  href="/visa-inquiry"
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 text-center"
                >
                  <span>온라인 채용 의뢰 접수</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">인재 관리 번호</span>
                  <span className="font-bold text-slate-800">RESUME-#{resume.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">직통 상담원</span>
                  <span className="font-bold text-slate-800">010-5731-8578</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">사무실 대표전화</span>
                  <span className="font-bold text-slate-800">064-711-8578</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">대표 이메일</span>
                  <span className="font-bold text-slate-800">roksan22@daum.net</span>
                </div>
              </div>
            </div>

            {/* 지정 규격 상담 박스 */}
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

          </div>

        </div>
      </div>

    </div>
  );
}
