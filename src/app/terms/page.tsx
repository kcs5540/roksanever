'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bg-[#f4f7f6] min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-3 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            홈으로 돌아가기
          </Link>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <FileText className="w-4 h-4" />
            <span>록산에버그린(주) 이용정책</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">서비스 이용약관</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제1조 (목적)</h2>
            <p>본 약관은 록산에버그린(주)(이하 "회사")이 제공하는 구인구직 중개 및 비자 행정 상담 관련 제반 서비스의 이용 조건 및 절차, 권리와 의무를 규정함을 목적으로 합니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제2조 (용어의 정의)</h2>
            <p>
              1. "이용자"란 본 사이트에 접속하여 회사가 제공하는 서비스를 이용하는 구인기업 및 구직자를 말합니다.<br />
              2. "서비스"란 구인공고 게재, 인재 정보 열람, 비자 및 취업 행정 1:1 상담, 커뮤니티 게시판 등을 포함합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제3조 (회사의 의무와 준수사항)</h2>
            <p>회사는 직업안정법 및 출입국관리법 등 관련 법령을 엄격히 준수하며, 허위 구인광고 게재를 금지하고 신뢰할 수 있는 합법적 채용 환경을 제공하기 위해 최선을 다합니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">제4조 (고객센터 및 분쟁 해결)</h2>
            <p>
              서비스 이용 중 발생하는 불편사항이나 문의사항은 아래 고객센터로 접수해주시면 성실히 처리해 드립니다.<br />
              - 고객센터 직통: 010-5731-8578 / 사무실: 064-711-8578<br />
              - 이메일: roksan22@daum.net
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
