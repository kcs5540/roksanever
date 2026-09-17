'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, ArrowUp, X } from 'lucide-react';

export default function FloatingActionButtons() {
  const [showCallModal, setShowCallModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5">
        {/* 맨 위로 가기 버튼 */}
        <button
          onClick={scrollToTop}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur shadow-md border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-500 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          title="페이지 최상단으로 이동"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 카카오톡 간편상담 버튼 */}
        <a
          href="https://open.kakao.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 sm:gap-2 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          <span className="hidden xs:inline">카카오톡 상담</span>
          <span className="xs:hidden">카톡상담</span>
        </a>

        {/* 전화 연결 버튼 */}
        <button
          onClick={() => setShowCallModal(true)}
          className="flex items-center gap-1.5 sm:gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          <span className="hidden xs:inline">빠른 전화 연결</span>
          <span className="xs:hidden">전화상담</span>
        </button>
      </div>

      {/* 전화 모달창 */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowCallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">록산에버그린 직통 상담</h3>
              <p className="text-xs text-slate-500 mt-1">
                구인·구직 및 비자 발급 상담을 바로 연결해 드립니다.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:064-711-8578"
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-2xl transition group"
              >
                <div className="text-left">
                  <div className="text-xs text-slate-500 font-medium">제주 본사 대표전화</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-emerald-700">064-711-8578</div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100/80 px-2.5 py-1 rounded-lg">통화</span>
              </a>

              <a
                href="tel:010-5731-8578"
                className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 rounded-2xl transition group"
              >
                <div className="text-left">
                  <div className="text-xs text-slate-500 font-medium">24시 상담 직통 휴대폰</div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-emerald-700">010-5731-8578</div>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100/80 px-2.5 py-1 rounded-lg">통화</span>
              </a>
            </div>

            <p className="text-[11px] text-center text-slate-400 mt-5">
              상담시간: 평일 09:00 ~ 18:00 (야간/주말은 휴대폰 연락 가능)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
