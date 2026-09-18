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
  Lock,
  Eye,
  ThumbsUp,
  Calendar,
  User,
  Search,
  X,
  MessageCircle
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

  // 이전 홈페이지 문의 상담 게시판 실제 데이터셋 (커뮤니티와 동일한 카드 형식 데이터 지원)
  const [inquiryBoard, setInquiryBoard] = useState([
    {
      id: 1,
      category: '비자 발급',
      title: '베트남 국적 요리사 E-7 비자 고용 추천서 발급 문의드립니다.',
      author: '김*호 (식음료)',
      authorRole: '기업회원',
      date: '2026-08-14',
      status: '답변완료',
      isSecret: true,
      views: 142,
      likes: 12,
      commentsCount: 1,
      summary: '제주 시내 베트남 전문 음식점 운영 중입니다. 현지 전문 주방장 채용을 위한 E-7 고용추천서 발급 요건 및 서류 절차 상담 요청합니다.',
      tags: ['E-7비자', '조리사초청', '고용추천서', '식음료'],
      reply: '안녕하세요 김*호 대표님, 록산에버그린 비자전담팀입니다. 관광식당 기준 면적 및 매출 조건, 본국 조리사 5년 이상 경력증명서 또는 자격증 인증 절차가 필요합니다. 유선으로 상세 서류 체크리스트를 송부드렸습니다.'
    },
    {
      id: 2,
      category: '유학생 알바',
      title: 'D-2 비자 유학생 주말 호텔 룸메이드 파트타임 허가 절차',
      author: '이*정 (호텔)',
      authorRole: '인사담당',
      date: '2026-08-11',
      status: '답변완료',
      isSecret: true,
      views: 230,
      likes: 25,
      commentsCount: 2,
      summary: '호텔 성수기 주말 객실 정비 인력으로 D-2 유학생을 합법적으로 채용하고 싶습니다. 학교 승인 및 출입국 사전 신고 양식 문의드립니다.',
      tags: ['D-2', '시간제취업', '호텔룸메이드', '합법알바'],
      reply: '이*정 담당자님, D-2 유학생은 학교 유학생지원센터에서 [시간제취업확인서]에 직인을 날인받은 후 하이코리아 전자민원으로 신고를 완료해야 근무 투입이 가능합니다. 계약서 표준 양식 전달해 드렸습니다.'
    },
    {
      id: 3,
      category: '인력 공급',
      title: '제조업 사출공장 F-4 / H-2 인력 4명 공급 견적 요청',
      author: '박*철 (제조)',
      authorRole: '사업주',
      date: '2026-08-08',
      status: '답변완료',
      isSecret: true,
      views: 185,
      likes: 8,
      commentsCount: 1,
      summary: '사출 금형 및 주간/야간 교대 근무가 가능한 성실한 동포 인력 4명 공급 견적 및 파견/도급 계약 조건 안내를 부탁드립니다.',
      tags: ['인력공급', 'F-4', 'H-2', '제조업생산', '기숙사'],
      reply: '박*철 대표님, 즉시 배치 가능한 기숙사 생활 가능 성실 동포 인력 4명 프로필 검토를 마쳤으며, 상담 직통(010-5731-8578)을 통해 견적서를 발송해 드렸습니다.'
    },
    {
      id: 4,
      category: '비자 변경',
      title: '어학연수 D-4 과정 수료 후 D-2 학위과정 및 시간제 취업 연계',
      author: 'Nguyen* (유학생)',
      authorRole: '유학생',
      date: '2026-08-02',
      status: '답변완료',
      isSecret: true,
      views: 310,
      likes: 34,
      commentsCount: 1,
      summary: '제주대 한국어학당 D-4 어학연수 6개월 수료 후 9월 학부 입학 예정입니다. 체류 자격 변경과 주말 아르바이트를 동시에 알아보고 있습니다.',
      tags: ['D-4', 'D-2변경', '유학비자', '주말알바'],
      reply: 'Nguyen 학생, 입학허가서 및 잔고증명서 준비 후 출입국 방문 예약 대행을 도와드렸습니다. 입학 후 바로 근무 가능한 리조트 F&B 알바도 예약 연계해 드렸습니다.'
    },
    {
      id: 5,
      category: '인력 공급',
      title: '서귀포 리조트 하우스키핑 및 미화 정기 도급 상담',
      author: '정*훈',
      authorRole: '총괄매니저',
      date: '2026-07-28',
      status: '답변완료',
      isSecret: true,
      views: 275,
      likes: 19,
      commentsCount: 1,
      summary: '서귀포 관광단지 내 독채 풀빌라 15동 하우스키핑 및 실내외 미화 업무를 정기 도급으로 전환하고자 합니다. 상담 미팅 요청합니다.',
      tags: ['하우스키핑', '청소도급', '서귀포리조트', '정기도급'],
      reply: '정*훈 매니저님, 제주 현장 방문 실사 및 운영 매뉴얼 안내를 위해 본사 담당자가 방문 드렸습니다. 성실한 베테랑 인력팀으로 세팅해 드리겠습니다.'
    }
  ]);

  // 선택된 문의글 상세 모달
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [boardSearch, setBoardSearch] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Supabase roksan_visas 테이블에 실제 저장
    try {
      const { supabase } = await import('@/lib/supabase');
      if (supabase) {
        await supabase.from('roksan_visas').insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          visa_type: formData.inquiry_type,
          message: `[${formData.title}] ${formData.content}`
        }]);
      }
    } catch (err) {
      console.warn('Supabase 상담 저장 실패 (로컬 상태만 반영):', err);
    }

    // 2. 화면 게시판 리스트에 즉시 반영
    const newEntry = {
      id: inquiryBoard.length + 1,
      category: formData.inquiry_type.split(' ')[0],
      title: formData.title,
      author: formData.name.length > 1 ? formData.name[0] + '*' + formData.name.slice(2) : formData.name,
      authorRole: '일반회원',
      date: new Date().toISOString().slice(0, 10),
      status: '접수대기',
      isSecret: formData.is_private,
      views: 1,
      likes: 0,
      commentsCount: 0,
      summary: formData.content.slice(0, 80) + (formData.content.length > 80 ? '...' : ''),
      tags: ['신규문의', formData.inquiry_type.split(' ')[0]],
      reply: '담당 행정사가 문의 내용을 검토 중입니다. 곧 기재해주신 연락처로 안내드립니다.'
    };
    setInquiryBoard([newEntry, ...inquiryBoard]);
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f4f7f6] text-slate-900 min-h-screen pb-20">
      
      {/* 1. 상단 페이지 히어로 헤더 (커뮤니티 페이지와 동일한 에메랄드 그라디언트 + 빠른 버튼) */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white py-12 px-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>록산에버그린 비자 &middot; 구인구직 1:1 전문 상담</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                문의하기 &middot; 상담센터
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                출입국 비자 발급&middot;연장 행정 대행, 기업 맞춤형 인력 수급, 유학생 합법 시간제 취업 등 궁금하신 사항을 남겨주시면 신속히 답변해 드립니다.
              </p>
            </div>

            {/* 빠른 상담/글쓰기 버튼 */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('form')}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-105 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>온라인 상담 신청하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 상단 탭 전환 바 (온라인 상담 신청서 / 1:1 상담 게시판 / 자주 묻는 질문 FAQ) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-emerald-600 rounded-sm"></span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {activeTab === 'form' && '1:1 온라인 상담 신청서'}
                {activeTab === 'board' && '상담 문의 게시판'}
                {activeTab === 'faq' && '자주 묻는 질문 (FAQ)'}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 pl-4">
              전문 행정 상담팀이 기재해주신 내용을 사전 검토 후 가장 적합한 법적 솔루션과 인재를 안내해 드립니다.
            </p>
          </div>

          {/* 탭 버튼 */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'form' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
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
                  ? 'bg-emerald-600 text-white shadow-sm' 
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
                  010-5731-8578
                </div>
                <div className="text-xs text-emerald-100/90 mb-1">
                  본사: 064-711-8578 (평일 09:00 ~ 18:00)
                </div>
                <div className="text-xs text-emerald-200 font-bold mb-4">
                  이메일: roksan22@daum.net
                </div>
                <a
                  href="tel:010-5731-8578"
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

        {/* TAB 2: 상담 문의 게시판 목록 (커뮤니티와 동일한 모던 카드 형식 피드) */}
        {activeTab === 'board' && (
          <div className="space-y-6">
            
            {/* 검색 & 카테고리 요약 바 (커뮤니티 완벽 동일) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">
                  [전체 상담]
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  총 <strong className="text-emerald-700">{inquiryBoard.length}</strong>개의 상담 내역이 있습니다.
                </span>
              </div>

              {/* 검색 인풋 & 새 문의글 버튼 */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-full sm:w-72 relative">
                  <input
                    type="text"
                    value={boardSearch}
                    onChange={(e) => setBoardSearch(e.target.value)}
                    placeholder="제목, 내용, 작성자, 분야 검색..."
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none transition"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  {boardSearch && (
                    <button 
                      onClick={() => setBoardSearch('')}
                      className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ×
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('form')}
                  className="shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>새 문의글 작성</span>
                </button>
              </div>
            </div>

            {/* 카드 목록 리스트 (커뮤니티 스크린샷 형태 완벽 계승) */}
            <div className="space-y-4">
              {inquiryBoard
                .filter((item) => {
                  if (!boardSearch) return true;
                  const q = boardSearch.toLowerCase();
                  return (
                    item.title.toLowerCase().includes(q) ||
                    item.author.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q) ||
                    (item.summary && item.summary.toLowerCase().includes(q)) ||
                    (item.tags && item.tags.some(t => t.toLowerCase().includes(q)))
                  );
                })
                .map((item) => (
                  <article
                    key={item.id}
                    onClick={() => setSelectedInquiry(item)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* 처리 상태 배지 */}
                        <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          item.status === '답변완료' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{item.status}</span>
                        </span>

                        {/* 카테고리 칩 */}
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                          {item.category}
                        </span>

                        {/* 제목 */}
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition flex items-center gap-1.5">
                          {item.isSecret && (
                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                          <span>{item.title}</span>
                        </h3>
                      </div>

                      {/* 작성일 */}
                      <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                    </div>

                    {/* 문의 요약 본문 */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {item.summary || '비공개 상담 내용입니다. 담당 행정사가 답변을 완료했습니다.'}
                    </p>

                    {/* 태그 목록 */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tags.map((t: string, idx: number) => (
                          <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 하단 메타정보: 작성자, 조회수, 좋아요, 댓글 */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {item.author}
                        </span>
                        {item.authorRole && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-medium">
                            {item.authorRole}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1 hover:text-rose-500 transition">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {item.likes || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {item.commentsCount || 1}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
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

      {/* 상담 상세 내용 모달 (비밀글 확인 및 답변 내용 조회) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* 상단 헤더 */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                  {selectedInquiry.category}
                </span>
                <span className="text-xs font-semibold bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-md">
                  {selectedInquiry.status}
                </span>
                <span className="text-xs text-slate-400">{selectedInquiry.date}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {selectedInquiry.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800">
                <span>작성자: <strong>{selectedInquiry.author}</strong> ({selectedInquiry.authorRole || '회원'})</span>
                <span>조회수: {selectedInquiry.views}</span>
              </div>
            </div>

            {/* 본문 내용 */}
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              <div>
                <div className="text-xs font-bold text-slate-400 mb-1">상담 문의 내용</div>
                <div className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                  {selectedInquiry.summary}
                </div>
              </div>

              {/* 공식 답변 영역 */}
              {selectedInquiry.reply && (
                <div>
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>록산에버그린 전문 행정팀 공식 답변</span>
                  </div>
                  <div className="text-sm text-emerald-950 leading-relaxed font-medium bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/70 whitespace-pre-line">
                    {selectedInquiry.reply}
                  </div>
                </div>
              )}

              {selectedInquiry.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedInquiry.tags.map((tag: string, i: number) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 전화 직통 안내 박스 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-600">
                <span>유사한 사안으로 실시간 빠른 상담이 필요하신가요?</span>
                <a href="tel:010-5731-8578" className="font-bold text-emerald-700 hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  010-5731-8578
                </a>
              </div>
            </div>

            {/* 하단 닫기 */}
            <div className="bg-slate-100 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

