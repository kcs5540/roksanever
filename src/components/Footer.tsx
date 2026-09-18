'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, ExternalLink, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const [affiliateOpen, setAffiliateOpen] = useState(false);

  const affiliateLinks = [
    { name: '고용노동부', url: 'https://www.moel.go.kr' },
    { name: '한국산업인력공단', url: 'https://www.hrdkorea.or.kr' },
    { name: '법무부 출입국외국인정책본부', url: 'https://www.immigration.go.kr' },
    { name: '제주외국인근로자지원센터', url: 'http://jejumwc.kr' },
    { name: '제주특별자치도청', url: 'https://www.jeju.go.kr' },
    { name: '농협중앙회', url: 'https://www.nonghyup.com' },
  ];

  return (
    <footer className="bg-[#1e293b] text-slate-400 text-xs border-t border-slate-700/60 pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 상단: 약관 링크 및 원본에 있던 '유관기관 찾기' 드롭다운 버튼 완벽 구현 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
          <div className="flex items-center gap-3 sm:gap-4 text-slate-300 font-semibold text-xs sm:text-sm">
            <Link href="/privacy" className="text-emerald-400 hover:underline">개인정보처리방침</Link>
            <span className="text-slate-600">|</span>
            <Link href="/terms" className="hover:text-white">이용약관</Link>
            <span className="text-slate-600">|</span>
            <Link href="/login" className="hover:text-white">관리자</Link>
            <span className="text-slate-600">|</span>
            <Link href="/about" className="hover:text-white">회사소개</Link>
          </div>

          {/* 원본의 유관기관 찾기 드롭다운 토글 */}
          <div className="relative">
            <button
              onClick={() => setAffiliateOpen(!affiliateOpen)}
              className="bg-slate-700/80 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-600 font-semibold transition"
            >
              <span>유관기관 찾기</span>
              <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform ${affiliateOpen ? 'rotate-180' : ''}`} />
            </button>

            {affiliateOpen && (
              <div className="absolute right-0 bottom-12 w-56 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 py-2 z-50 animate-in fade-in zoom-in-95">
                {affiliateLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-2 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 중단: 원본 키워드 해시태그 & 상세 회사 정보 */}
        <div className="pt-6 pb-4 space-y-3">
          {/* 원본 푸터의 대표 비자 키워드 해시태그 그대로 유지 */}
          <p className="text-slate-400 text-[11px] leading-relaxed font-mono">
            #foreign job &nbsp;&nbsp;&nbsp; #foreign job placement &nbsp;&nbsp;&nbsp; #Visa issuance·agency employment support for studying abroad in korea, visa assistance language training &nbsp;&nbsp;&nbsp; #Hotel employment<br />
            #part-time job for international student E7·E9·D2·D4·D10·H2·F1·F2·F3·F4·F5·F6 &nbsp;&nbsp;&nbsp; #roksanmanpower &nbsp;&nbsp;&nbsp; #Housekeeper &nbsp;&nbsp;&nbsp; #caregiver
          </p>

          <div className="text-slate-300 font-bold text-sm">
            록산에버그린 주식회사
            <span className="text-slate-400 font-normal ml-3">주소 : 제주특별자치도 제주시 서광로 107-6 (용담이동)</span>
          </div>

          <div className="text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
            <span>대표자 : 김찬식</span>
            <span>사업자등록번호 : 616-81-02802</span>
            <span>국외유료직업소개사업 등록 : <strong className="text-amber-400 font-mono">f1630120240001</strong></span>
            <span>전화 : <strong className="text-emerald-400 font-bold">064-711-8578</strong>, 010-5731-8578</span>
            <span>팩스 : 064-712-5512</span>
            <span>이메일 : roksan22@daum.net</span>
          </div>
        </div>

        {/* 하단: 카피라이트 */}
        <div className="pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <div>
            COPYRIGHT &copy; {new Date().getFullYear()}. <span className="text-slate-400 font-bold">ROKSANEVERGREEN</span> (roksanmanpower.com). ALL RIGHTS RESERVED.
          </div>
          <div>
            국외유료직업소개사업 정식 등록기관 (제 f1630120240001 호) &middot; 직업정보제공사업 신고완료
          </div>
        </div>

      </div>
    </footer>
  );
}
