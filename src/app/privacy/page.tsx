'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#f4f7f6] min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-3 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            홈으로 돌아가기
          </Link>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>록산에버그린(주) 운영정책</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">개인정보처리방침</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. 개인정보의 수집 및 이용 목적</h2>
            <p>록산에버그린(주)은 구인·구직 중개 서비스 제공, 비자 및 출입국 행정 상담 대행, 취업 알선 계약 이행을 위해 필요한 최소한의 개인정보를 수집합니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. 수집하는 개인정보 항목</h2>
            <p>- 이름, 연락처(휴대전화/유선), 이메일, 희망 근무지역, 체류자격(비자유형), 국적, 희망직종 등</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. 개인정보의 보유 및 이용 기간</h2>
            <p>수집된 개인정보는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기하며, 관계 법령에 따라 보존할 필요가 있는 경우 해당 법정 기간 동안 안전하게 보관합니다.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. 개인정보 보호책임자 및 상담 연락처</h2>
            <p>
              - 회사명: 록산에버그린(주)<br />
              - 대표자: 김찬식<br />
              - 대표전화: 064-711-8578 / 직통: 010-5731-8578<br />
              - 이메일: roksan22@daum.net
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
