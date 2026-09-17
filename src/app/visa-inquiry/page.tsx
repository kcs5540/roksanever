'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Send, CheckCircle2, Phone, HelpCircle } from 'lucide-react';

export default function VisaInquiryPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry_type: '비자 발급/연장 대행',
    title: '',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase 연동 시 DB insert, 현재는 성공 피드백 표시
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>전문 행정 상담</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
          비자 발급 및 취업 행정 무료 상담
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          외국인 근로자 고용에 필요한 비자(E-7, E-9, D-2, F-4 등) 발급 요건 및 절차를 전문 상담원이 상세히 확인 후 연락드립니다.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
        {submitted ? (
          <div className="text-center py-12 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">상담 문의가 성공적으로 접수되었습니다!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              접수해주신 연락처(<strong className="text-emerald-700">{formData.phone}</strong>)로 담당 상담원이 신속하게 연락드리겠습니다.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  phone: '',
                  email: '',
                  inquiry_type: '비자 발급/연장 대행',
                  title: '',
                  content: ''
                });
              }}
              className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition"
            >
              추가 문의 작성하기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  성명 (또는 기업명) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동 또는 (주)에버그린"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  연락처 (휴대전화) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  상담 분야 선택 <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.inquiry_type}
                  onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="비자 발급/연장 대행">비자 발급/연장 대행 (E-7, E-9, F-4 등)</option>
                  <option value="유학생 시간제 취업 허가">유학생 시간제 취업 허가 (D-2)</option>
                  <option value="기업 인력 단체 구인">기업 대량 인력 공급 문의 (호텔, 제조)</option>
                  <option value="개인 구직 및 취업 지원">외국인 개인 구직 및 이력서 등록</option>
                  <option value="기타 행정 문의">기타 문의</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  이메일 (선택)
                </label>
                <input
                  type="email"
                  placeholder="예: roksan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                문의 제목 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="예: 호텔 룸메이드 인력 5명 구인 및 E-7 비자 자격 문의"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                상세 상담 내용 <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="궁금하신 내용이나 현재 상황, 필요 인원수, 근무 지역 등을 자유롭게 적어주세요."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-600 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-base"
            >
              <Send className="w-5 h-5" />
              <span>무료 상담 문의 신청하기</span>
            </button>
          </form>
        )}
      </div>

      {/* 긴급 전화 안내 카드 */}
      <div className="mt-8 bg-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">당일 급구 인력 및 즉시 상담이 필요하신가요?</div>
            <div className="text-xs text-slate-500">전화 주시면 전문 상담원이 실시간으로 신속하게 응대해 드립니다.</div>
          </div>
        </div>
        <a
          href="tel:064-711-8578"
          className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl shrink-0 transition"
        >
          064-711-8578 전화걸기
        </a>
      </div>
    </div>
  );
}
