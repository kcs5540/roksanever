'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle2, 
  Phone, 
  HelpCircle, 
  MessageSquare, 
  FileQuestion, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Globe2, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  MapPin,
  Sparkles,
  Lock
} from 'lucide-react';

export default function VisaInquiryPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'board' | 'faq'>('form'); // 온라인 문의 | 상담 게시판 | 자주 묻는 질문
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry_type: '비자 발급/연장 대행',
    is_private: true,
    password: '',
    title: '',
    content: ''
  });

  // 이전 홈페이지 문의 상담 게시판 실제 데이터셋 (비밀글 보호 및 답변 상태)
  const [inquiryBoard, setInquiryBoard] = useState([
    {
      id: 1,
      category: '비자 발급',
      title: '베트남 국적 요리사 E-7 비자 고용 추천서 발급 문의드립니다.',
      author: '김*호(식음료)',
      date: '08-14',
      status: '답변완료',
      isSecret: true,
      views: 142
    },
    {
      id: 2,
      category: '유학생 알바',
      title: 'D-2 비자 유학생 주말 호텔 룸메이드 파트타임 허가 절차',
      author: '이*정(호텔)',
      date: '08-11',
      status: '답변완료',
      isSecret: true,
      views: 230
    },
    {
      id: 3,
      category: '인력 공급',
      title: '제조업 사출공장 F-4 / H-2 인력 4명 공급 견적 요청',
      author: '박*철(제조)',
      date: '08-08',
      status: '답변완료',
      isSecret: true,
      views: 185
    },
    {
      id: 4,
      category: '비자 변경',
      title: '어학연수 D-4 과정 수료 후 D-2 학위과정 및 시간제 취업 연계',
      author: 'Nguyen* (유학생)',
      date: '08-02',
      status: '답변완료',
      isSecret: true,
      views: 310
    },
    {
      id: 5,
      category: '인력 공급',
      title: '서귀포 리조트 하우스키핑 및 미화 정기 도급 상담',
      author: '정*훈',
      date: '07-28',
      status: '답변완료',
      isSecret: true,
      views: 275
    }
  ]);

  // 자주 묻는 질문 (FAQ)
  const faqs = [
    {
      q: '외국인 근로자를 합법적으로 고용하려면 어떤 비자가 필요한가요?',
      a: '직종에 따라 전문 기술 직종은 E-7(특정활동), 비전문 취업은 E-9(고용허가제), 재외동포는 F-4 및 H-2(방문취업), 유학생은 D-2(시간제 취업허가) 비자가 필요합니다. 록산에버그린에서 현장 맞춤 비자 요건을 사전 진단해 드립니다.'
    },
    {
      q: 'D-2 유학생 시간제 취업(아르바이트)은 법적으로 얼마나 일할 수 있나요?',
      a: '대학 학사 과정 기준 학기 중 주당 20~25시간(TOPIK 등급별 상이)까지 허용되며, 주말 및 방학 기간에는 시간 제한 없이 전일제 근무가 가능합니다. 단, 관할 출입국관리사무소의 사전 허가를 필해야 합니다.'
    },
    {
      q: '인력 요청 후 현장 배치까지 소요 시간은 얼마나 걸리나요?',
      a: '국내 체류 중인 합법 F비자 및 유학생 시간제 인력은 1~3일 이내 즉시 배치 가능하며, 신규 E-7 초청 또는 비자 변경이 필요한 전문 인력은 서류 접수 후 약 2~4주 정도 소요됩니다.'
    },
    {
      q: '비자 발급 및 행정 대행 수수료는 어떻게 되나요?',
      a: '기본적인 비자 자격 심사 및 전화 상담은 100% 무료로 진행됩니다. 출입국 공식 행정 대행 및 기업 채용 연계 계약 시 사전 협의된 표준 수수료 규정에 따라 투명하게 처리됩니다.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 새 문의글 리스트에 추가
    const newEntry = {
      id: inquiryBoard.length + 1,
      category: formData.inquiry_type.split(' ')[0],
      title: formData.title,
      author: formData.name.length > 1 ? formData.name[0] + '*' + formData.name.slice(2) : formData.name,
      date: new Date().toISOString().slice(5, 10),
      status: '접수대기',
      isSecret: formData.is_private,
      views: 1
    };
    setInquiryBoard([newEntry, ...inquiryBoard]);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen pb-16">
      
      {/* 1. 상단 비주얼 큐레이션 배너 (전체 사이트 통일 규격) */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 배너 1: 비자 행정 원스톱 지원 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all border border-emerald-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner1.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/50 to-emerald-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Visa Administration
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  합법 비자 발급 &middot; 연장<br />출입국 행정 원스톱
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  E-7 전문취업, E-9 고용허가, D-2 유학생 시간제 취업, F-4 재외동포 비자 변경
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  신원 보증 & 출입국 자격 사전심사
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />
              </div>
            </div>

            {/* 배너 2: 기업 맞춤형 인력 공급 상담 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-orange-500/40 hover:-translate-y-1 transition-all border border-orange-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner2.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/90 via-orange-950/50 to-orange-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Manpower Supply
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  기업 대량 인력 수급<br />도급&middot;파견&middot;채용대행
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  특급호텔 룸메이드, 하우스키핑, 조선소 배관 용접사, 제조업 생산직 맞춤 배치
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <a href="tel:010-7169-2255" className="hover:underline flex items-center gap-1">
                  <span>기업 직통 인력 요청</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-300" />
                </a>
                <Building2 className="w-5 h-5 text-amber-200" />
              </div>
            </div>

            {/* 배너 3: 24시간 실시간 무료 전화 상담 */}
            <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl flex flex-col justify-between group hover:shadow-blue-500/40 hover:-translate-y-1 transition-all border border-blue-400/40 min-h-[230px]">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 opacity-90"
                style={{ backgroundImage: `url('/images/banners/banner3.jpg')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/50 to-blue-900/30"></div>

              <div className="relative z-10">
                <div className="inline-block bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-md border border-white/30">
                  Quick Consultation
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  긴급 상담 직통 전화<br />010-7169-2255
                </h3>
                <p className="text-xs text-white font-medium leading-relaxed mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-xs">
                  본사: 064-711-8578 (평일 09~18시) / 야간 및 주말은 직통 휴대폰 상시 연결
                </p>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/30 flex items-center justify-between text-xs font-bold text-white bg-slate-900/40 backdrop-blur-sm -mx-6 -mb-6 px-6 py-3">
                <a href="tel:010-7169-2255" className="hover:underline flex items-center gap-1 font-black text-amber-300">
                  <span>지금 바로 전화걸기</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <Phone className="w-5 h-5 text-blue-200 animate-bounce" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 상단 탭 전환 바 (온라인 상담 신청서 / 1:1 상담 게시판 / 자주 묻는 질문 FAQ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-emerald-600 rounded-sm"></span>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">문의하기 (비자 &middot; 행정 &middot; 채용)</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-4">
              외국인 인력 수급, 비자 발급 자격, 유학생 취업 등 궁금하신 내용을 문의하시면 전문 행정 상담원이 상세히 답변해 드립니다.
            </p>
          </div>

          {/* 탭 버튼 */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'form' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>온라인 상담 신청</span>
            </button>
            <button
              onClick={() => setActiveTab('board')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'board' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>상담 문의 게시판 ({inquiryBoard.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'faq' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileQuestion className="w-3.5 h-3.5" />
              <span>자주 묻는 질문 FAQ</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. 탭별 콘텐츠 영역 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* TAB 1: 온라인 상담 신청 폼 */}
        {activeTab === 'form' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 좌측 8컬럼: 온라인 상담 신청 폼 */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900">1:1 비자 &middot; 구인구직 무료 상담 신청서</h3>
                </div>
                <span className="text-xs text-rose-500 font-bold">* 필수 입력 항목</span>
              </div>

              {submitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">상담 문의가 성공적으로 접수되었습니다!</h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    접수해주신 연락처(<strong className="text-emerald-700">{formData.phone}</strong>)로 전문 상담원이 내용을 사전 검토 후 신속하게 연락드리겠습니다.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          inquiry_type: '비자 발급/연장 대행',
                          is_private: true,
                          password: '',
                          title: '',
                          content: ''
                        });
                      }}
                      className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition"
                    >
                      추가 문의 작성하기
                    </button>
                    <button
                      onClick={() => setActiveTab('board')}
                      className="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-200 transition"
                    >
                      문의 게시판 확인
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* 신청자명 & 연락처 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        성명 (또는 기업명) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="예: 홍길동 또는 (주)호텔에버그린"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white bg-slate-50 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        연락처 (휴대전화) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="예: 010-1234-5678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white bg-slate-50 transition"
                      />
                    </div>
                  </div>

                  {/* 상담 분야 & 이메일 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        상담 분야 선택 <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.inquiry_type}
                        onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 bg-slate-50 transition font-medium"
                      >
                        <option value="비자 발급/연장 대행">비자 발급 &middot; 연장 대행 (E-7, E-9, F-4 등)</option>
                        <option value="유학생 시간제 취업 허가">D-2 유학생 시간제 취업 허가 대행</option>
                        <option value="기업 인력 공급 요청">기업 인력 공급 (호텔 룸메이드, 용접, 제조)</option>
                        <option value="개인 구직 및 취업 알선">외국인/내국인 개인 구직 및 이력서 등록</option>
                        <option value="기타 행정 및 자격 문의">기타 출입국 행정 상담</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        이메일 (선택)
                      </label>
                      <input
                        type="email"
                        placeholder="예: user@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white bg-slate-50 transition"
                      />
                    </div>
                  </div>

                  {/* 문의 제목 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      문의 제목 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="예: 호텔 룸메이드 인력 4명 구인 조건 및 E-7 비자 지원 절차 문의"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white bg-slate-50 transition font-semibold"
                    />
                  </div>

                  {/* 상세 상담 내용 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      상세 상담 내용 <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="희망 직무, 근무 지역, 필요 인원수, 비자 종류, 현재 상황 등을 자세히 적어주시면 더욱 빠르고 정확한 맞춤 상담이 가능합니다."
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white bg-slate-50 transition resize-none leading-relaxed"
                    ></textarea>
                  </div>

                  {/* 비밀글 설정 */}
                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={formData.is_private}
                        onChange={(e) => setFormData({ ...formData, is_private: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <span>비밀글로 문의하기 (작성자와 관리자만 확인 가능)</span>
                    </label>
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm sm:text-base mt-4"
                  >
                    <Send className="w-4 h-4" />
                    <span>무료 상담 문의 신청하기</span>
                  </button>
                </form>
              )}
            </div>

            {/* 우측 4컬럼: 연락처 카드 & 상담 프로세스 안내 */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* 전화 직통 카드 */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-6 shadow-xl text-center">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-xs text-emerald-200 font-bold mb-1">인력 급구 & 비자 실시간 직통</div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
                  010-7169-2255
                </div>
                <div className="text-xs text-emerald-100/90 mb-4">
                  본사: 064-711-8578 (평일 09:00 ~ 18:00)
                </div>
                <a
                  href="tel:010-7169-2255"
                  className="block w-full py-2.5 bg-white text-emerald-800 font-bold text-xs rounded-xl shadow transition hover:bg-emerald-50"
                >
                  담당자 전화 바로 연결
                </a>
              </div>

              {/* 상담 진행 4단계 안내 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>상담 진행 절차</span>
                </div>
                
                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-[11px]">
                      1
                    </div>
                    <div>
                      <strong className="text-slate-800">온라인/전화 상담 접수</strong>
                      <p className="text-slate-500 mt-0.5">상담 내용 및 필요 인력/비자 요건 파악</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-[11px]">
                      2
                    </div>
                    <div>
                      <strong className="text-slate-800">합법 자격 및 인재 매칭</strong>
                      <p className="text-slate-500 mt-0.5">출입국 체류 자격 사전 검증 및 적임자 선발</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-[11px]">
                      3
                    </div>
                    <div>
                      <strong className="text-slate-800">비자 행정 서류 대행</strong>
                      <p className="text-slate-500 mt-0.5">고용 추천서, 시간제 취업 허가, 체류 연장</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center shrink-0 text-[11px]">
                      4
                    </div>
                    <div>
                      <strong className="text-slate-800">현장 배치 및 사후 관리</strong>
                      <p className="text-slate-500 mt-0.5">안전한 근무 투입 및 체류 기간 지속 관리</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: 상담 문의 게시판 목록 */}
        {activeTab === 'board' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 text-slate-600 text-xs font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4 w-28 text-center">분야</th>
                      <th className="py-3.5 px-4">문의 제목</th>
                      <th className="py-3.5 px-4 w-28 text-center">작성자</th>
                      <th className="py-3.5 px-4 w-24 text-center">처리 상태</th>
                      <th className="py-3.5 px-4 w-20 text-center">등록일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {inquiryBoard.map((item) => (
                      <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors group cursor-pointer">
                        <td className="py-4 px-4 text-center">
                          <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-slate-800">
                          <div className="flex items-center gap-2">
                            {item.isSecret && (
                              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            )}
                            <span className="group-hover:text-emerald-600 transition text-sm sm:text-base">
                              {item.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-xs text-slate-500 font-medium">
                          {item.author}
                        </td>
                        <td className="py-4 px-4 text-center text-xs font-bold">
                          <span className={`px-2.5 py-1 rounded-full ${
                            item.status === '답변완료' 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                              : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-xs text-slate-400 font-medium">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 하단 글쓰기 버튼 */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-400">
                  총 {inquiryBoard.length}건의 상담 문의
                </div>
                <button
                  onClick={() => setActiveTab('form')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>새 문의글 작성하기</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 자주 묻는 질문 (FAQ) */}
        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 text-xs">
                    Q
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </h3>
                </div>
                <div className="flex items-start gap-3 pl-9 pt-1">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 w-full">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}
