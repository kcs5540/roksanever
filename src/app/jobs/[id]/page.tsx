'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_JOBS } from '@/lib/mock-data';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  Eye, 
  Phone, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  Sparkles, 
  Banknote,
  Users,
  AlertCircle
} from 'lucide-react';

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;

  // mock data 찾기 또는 폴백 생성
  const foundJob = MOCK_JOBS.find((j) => j.id === jobId);

  // MOCK_JOBS 외에 jobs 목록에 있는 id인 경우 폴백 생성
  const job = foundJob || {
    id: jobId,
    company_name: '(주)록산에버그린 협력사',
    title: `[채용정보] 성실한 현장 근무자 및 전문 인력 모집 (${jobId}번 공고)`,
    target_worker_type: 'all' as const,
    category: '룸메이드 / 청소 / 생산',
    eligible_visas: ['F-2', 'F-4', 'F-5', 'F-6', 'H-2', 'D-2', 'E-7', 'E-9', '내국인'],
    region_sido: '제주 / 전국',
    region_detail: '근무지 상세 협의',
    salary_type: 'monthly' as const,
    salary_amount: '월 2,700,000원 ~ 3,300,000원 (상여금 별도)',
    work_hours: '09:00 ~ 18:00 (주 5일 / 탄력근무제 가능)',
    description: `본 채용 공고는 록산에버그린(주)을 통해 적합성 사전 검증이 완료된 믿을 수 있는 구인처입니다.

[주요 업무 내용]
- 현장 직무 및 시설 관리, 부서별 맞춤 업무 수행
- 초보자도 쉽게 적응할 수 있도록 친절한 1:1 직무 교육 제공
- 외국인 근로자의 경우 한국어 소통 수준에 따른 부서 우선 배치

[복리후생 및 근무환경]
- 숙식 지원: 쾌적한 기숙사(온돌방/에어컨 완비) 및 삼시세끼 식사 제공
- 법정 복리: 4대보험, 퇴직금, 주휴수당, 연차휴가 준수
- 비자 행정: 체류기간 연장 및 합법 취업허가(D-2 시간제 등) 출입국 무료 대행 지원`,
    contact_phone: '010-5731-8578',
    status: 'active' as const,
    views_count: 240,
    created_at: '2026-03-15'
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen pb-20">
      
      {/* 1. 상단 브레드크럼 & 헤더 */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>구인공고 목록으로 돌아가기</span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              조회 {job.views_count}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {job.created_at}
            </span>
          </div>
        </div>
      </div>

      {/* 2. 메인 컨테이너 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 좌측 8컬럼: 공고 상세 본문 */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 공고 헤더 카드 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {job.category}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {job.region_sido} {job.region_detail}
                </span>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                  {job.target_worker_type === 'foreigner' ? '외국인 우대' : job.target_worker_type === 'korean' ? '내국인' : '내·외국인 환영'}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {job.title}
              </h1>

              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 pb-4 border-b border-slate-100">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-slate-900">{job.company_name}</span>
                <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> 인증기업
                </span>
              </div>

              {/* 급여 및 근무조건 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4">
                  <div className="text-xs text-emerald-700 font-bold mb-1 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4" />
                    <span>급여 조건</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-emerald-900">
                    {job.salary_amount}
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-xs text-slate-500 font-bold mb-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>근무 시간</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800">
                    {job.work_hours || '상세 협의'}
                  </div>
                </div>
              </div>

              {/* 취업 가능 비자 */}
              {job.eligible_visas && job.eligible_visas.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-500 mb-2">지원 가능 체류 비자</div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.eligible_visas.map((v, i) => (
                      <span key={i} className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 공고 상세 본문 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>상세 모집 요강 및 근무 환경</span>
              </h2>

              <div className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                {job.description}
              </div>

              {/* 주의사항 / 안심 취업 배너 */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-800">
                  <AlertCircle className="w-4 h-4" />
                  <span>록산에버그린 안심 취업 가이드</span>
                </div>
                <p className="leading-relaxed text-amber-800/90">
                  록산에버그린(주)은 근로기준법 및 출입국관리법을 철저히 준수합니다. 외국인 근로자의 불법 취업 알선은 절대 하지 않으며, 정식 인허가를 거쳐 합법적인 체류 및 근로계약을 지원합니다.
                </p>
              </div>
            </div>

          </div>

          {/* 우측 4컬럼: 지원 및 직통 상담 카드 */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 지원 신청 카드 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
                빠른 입사 지원 & 문의
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${job.contact_phone || '010-5731-8578'}`}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-2xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>전화로 즉시 지원하기</span>
                </a>

                <Link
                  href="/visa-inquiry"
                  className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 text-center"
                >
                  <span>비자&middot;취업 온라인 1:1 문의</span>
                </Link>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">채용 문의처</span>
                  <span className="font-bold text-slate-800">{job.contact_phone || '010-5731-8578'}</span>
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
