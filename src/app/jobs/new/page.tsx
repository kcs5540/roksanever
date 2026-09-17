'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Phone, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  Coins, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  HelpCircle,
  UploadCloud,
  Users
} from 'lucide-react';

export default function NewJobPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    contactPerson: '',
    contactPhone: '',
    email: '',
    title: '',
    category: '제조·생산',
    workerType: 'all', // all | foreigner | domestic
    preferredVisas: [] as string[],
    regionSido: '제주',
    regionDetail: '',
    salaryType: 'monthly', // monthly | hourly | daily
    salaryAmount: '',
    workHours: '',
    benefits: [] as string[],
    dormitory: '제공 (1인1실 또는 2인1실)',
    meals: '삼시세끼 무료 제공',
    description: '',
    isUrgent: true,
    agreeTerms: true
  });

  const categories = [
    '제조·생산',
    '호텔·리조트·룸메이드',
    '식음료·홀서빙·주방',
    '농·축·수산업',
    '건설·토목·현장',
    '조선소·용접·배관',
    '청소·환경미화·세탁',
    '물류·상하차·운송',
    '간병·가사·도우미',
    '기타·전문직'
  ];

  const regions = [
    '제주', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종',
    '강원', '충북', '충남', '전북', '전남', '경북', '경남', '전국'
  ];

  const visaOptions = ['E-9 (비전문취업)', 'E-7 (특정활동)', 'F-4 (재외동포)', 'F-5 (영주)', 'F-6 (결혼이민)', 'H-2 (방문취업)', 'D-2 (유학생시간제)', '내국인'];
  const benefitOptions = ['4대보험', '퇴직금', '숙소/기숙사 지원', '식사 제공', '통근버스/교통비', '연차/휴가', '잔업·특근수당', '초보자가능'];

  const handleVisaToggle = (visa: string) => {
    if (formData.preferredVisas.includes(visa)) {
      setFormData({ ...formData, preferredVisas: formData.preferredVisas.filter(v => v !== visa) });
    } else {
      setFormData({ ...formData, preferredVisas: [...formData.preferredVisas, visa] });
    }
  };

  const handleBenefitToggle = (benefit: string) => {
    if (formData.benefits.includes(benefit)) {
      setFormData({ ...formData, benefits: formData.benefits.filter(b => b !== benefit) });
    } else {
      setFormData({ ...formData, benefits: [...formData.benefits, benefit] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactPhone || !formData.title || !formData.description) {
      alert('필수 입력 항목(회사명, 연락처, 공고제목, 업무내용)을 모두 입력해주세요.');
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen pb-20">
      
      {/* 1. 상단 배너 헤더 */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white py-12 px-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <Link 
            href="/jobs" 
            className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white font-bold mb-4 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>구인공고 목록으로 돌아가기</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>기업 고용주 전용 간편 채용 의뢰</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            구인공고 무료 등록 신청
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            성실한 내국인·외국인 인재 및 시간제 유학생 채용을 원하시는 사업주님, 간단한 정보만 남겨주시면 록산에버그린 전문 매칭팀이 즉시 검토 후 맞춤 인재를 연결해 드립니다.
          </p>
        </div>
      </div>

      {/* 2. 메인 폼 컨테이너 */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        
        {submitted ? (
          /* 신청 완료 안내 카드 */
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center max-w-2xl mx-auto my-8 animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              접수 완료
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
              공고 등록 신청이 완료되었습니다!
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              입력해주신 <strong>[{formData.companyName}]</strong>의 채용 정보가 록산에버그린 매칭 전담팀에 안전하게 전달되었습니다.<br />
              담당 직원이 기재해주신 연락처(<strong>{formData.contactPhone}</strong>)로 1~2시간 이내에 직접 확인 연락을 드리고 정식 게재 및 적합 인재 추천을 진행해 드립니다.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs text-slate-700 space-y-2 mb-8">
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-400 font-bold">공고 제목</span>
                <span className="font-bold text-slate-900">{formData.title}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-400 font-bold">모집 직종</span>
                <span className="font-semibold text-emerald-700">{formData.category} ({formData.regionSido})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">급여 조건</span>
                <span className="font-semibold text-slate-900">{formData.salaryAmount || '협의 후 결정'}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/jobs"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
              >
                구인정보 목록 보러가기
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    companyName: '',
                    businessNumber: '',
                    contactPerson: '',
                    contactPhone: '',
                    email: '',
                    title: '',
                    category: '제조·생산',
                    workerType: 'all',
                    preferredVisas: [],
                    regionSido: '제주',
                    regionDetail: '',
                    salaryType: 'monthly',
                    salaryAmount: '',
                    workHours: '',
                    benefits: [],
                    dormitory: '제공 (1인1실 또는 2인1실)',
                    meals: '삼시세끼 무료 제공',
                    description: '',
                    isUrgent: true,
                    agreeTerms: true
                  });
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                추가 공고 등록하기
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 상단 긴급 전화 배너 */}
            <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    글 작성이 번거로우신가요? 전화 한 통으로 즉시 공고 등록 가능!
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    구직&middot;구인 희망시 포스팅 또는 록산에버그린으로 연락주세요.
                  </p>
                </div>
              </div>
              <a
                href="tel:010-5731-8578"
                className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2"
              >
                <span>직통전화 010-5731-8578</span>
              </a>
            </div>

            {/* 섹션 1: 기업 / 사업체 기본 정보 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">1. 기업 및 채용 담당자 정보</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    회사명 / 상호 *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="예: (주)한라리조트, 영농조합법인 제주"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    사업자등록번호 (선택)
                  </label>
                  <input
                    type="text"
                    value={formData.businessNumber}
                    onChange={(e) => setFormData({ ...formData, businessNumber: e.target.value })}
                    placeholder="예: 000-00-00000"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    채용 담당자 성함 / 직함
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="예: 김인사 팀장"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    연락처 (휴대폰 / 유선) *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="예: 010-1234-5678"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-bold text-emerald-800"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    이메일 주소 (선택)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="담당자 이메일 (이력서 수신용)"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 섹션 2: 채용 공고 기본 내용 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">2. 모집 요강 및 상세 근무조건</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  공고 제목 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: [제주/중문] 특급호텔 룸메이드 정규/계약직 성실한 외국인·내국인 채용 (숙식제공)"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    모집 직종 *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    근무 지역 (시/도) *
                  </label>
                  <select
                    value={formData.regionSido}
                    onChange={(e) => setFormData({ ...formData, regionSido: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-semibold"
                  >
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    상세 근무지 위치
                  </label>
                  <input
                    type="text"
                    value={formData.regionDetail}
                    onChange={(e) => setFormData({ ...formData, regionDetail: e.target.value })}
                    placeholder="예: 서귀포시 중문관광단지 인근"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* 채용 대상자 구분 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  채용 희망 대상자
                </label>
                <div className="grid grid-cols-3 gap-3 text-xs font-semibold">
                  {[
                    { key: 'all', label: '내국인 & 외국인 모두 환영' },
                    { key: 'foreigner', label: '외국인 근로자 우대' },
                    { key: 'domestic', label: '내국인 전용' }
                  ].map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, workerType: t.key })}
                      className={`p-3 rounded-xl border text-center transition ${
                        formData.workerType === t.key
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 선호 / 가능 비자 (체크박스) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  취업 가능 비자 (중복 선택 가능)
                </label>
                <div className="flex flex-wrap gap-2">
                  {visaOptions.map((visa) => {
                    const isChecked = formData.preferredVisas.includes(visa);
                    return (
                      <button
                        key={visa}
                        type="button"
                        onClick={() => handleVisaToggle(visa)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition font-medium ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}{visa}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 급여 및 근무시간 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    급여 지급 형태 및 금액
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.salaryType}
                      onChange={(e) => setFormData({ ...formData, salaryType: e.target.value })}
                      className="w-28 text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-semibold shrink-0"
                    >
                      <option value="monthly">월급</option>
                      <option value="hourly">시급</option>
                      <option value="daily">일당</option>
                    </select>
                    <input
                      type="text"
                      value={formData.salaryAmount}
                      onChange={(e) => setFormData({ ...formData, salaryAmount: e.target.value })}
                      placeholder="예: 2,700,000원 ~ 3,200,000원 (상여금 별도)"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    근무 시간 / 요일
                  </label>
                  <input
                    type="text"
                    value={formData.workHours}
                    onChange={(e) => setFormData({ ...formData, workHours: e.target.value })}
                    placeholder="예: 08:30 ~ 17:30 (주 5일 근무)"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* 복리후생 & 숙식 제공 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    숙소 / 기숙사 지원 현황
                  </label>
                  <input
                    type="text"
                    value={formData.dormitory}
                    onChange={(e) => setFormData({ ...formData, dormitory: e.target.value })}
                    placeholder="예: 온돌방 2인 1실 완비 (세탁기/에어컨 구비)"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    식사 제공 현황
                  </label>
                  <input
                    type="text"
                    value={formData.meals}
                    onChange={(e) => setFormData({ ...formData, meals: e.target.value })}
                    placeholder="예: 사내 식당 구내식 삼시세끼 무료 제공"
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* 복리후생 태그 선택 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  복리후생 지원 항목 (중복 선택)
                </label>
                <div className="flex flex-wrap gap-2">
                  {benefitOptions.map((b) => {
                    const isChecked = formData.benefits.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleBenefitToggle(b)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition font-medium ${
                          isChecked
                            ? 'bg-teal-600 border-teal-600 text-white font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '}{b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 상세 업무 내용 */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  상세 업무 내용 및 지원 자격 *
                </label>
                <textarea
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="주요 담당 업무, 우대 사항, 필요한 한국어 소통 수준(초급/중급), 비자 발급 지원 여부 등을 자유롭게 입력해주세요."
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none leading-relaxed"
                  required
                />
              </div>

            </div>

            {/* 제출 버튼 및 동의 */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  required
                />
                <span>인재 매칭 및 채용 상담을 위한 개인/기업정보 수집 및 이용에 동의합니다.</span>
              </label>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 shrink-0"
              >
                <span>구인공고 등록 신청하기</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
