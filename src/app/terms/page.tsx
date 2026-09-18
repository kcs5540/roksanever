'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, ShieldAlert, CheckCircle2, Phone, Mail } from 'lucide-react';

export default function TermsPage() {
  const articles = [
    {
      num: 1,
      title: '제1조 (목적)',
      content: '이 약관은 록산에버그린(주)(이하 “회사”라 한다)에서 제공하는 구인·구직 인력 알선 및 비자 행정 관련 인터넷 서비스(이하 “서비스”라 한다)를 이용함에 있어 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.'
    },
    {
      num: 2,
      title: '제2조 (용어의 정의)',
      content: (
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>기업회원:</strong> 회사의 약관에 동의하고 사업자 또는 기업(단체) 자격으로 인력 구인을 위해 등록한 회원</li>
          <li><strong>개인회원:</strong> 회사의 약관에 동의하고 취업 및 일자리를 구하기 위해 이력서를 등록한 내·외국인 개인</li>
          <li><strong>서비스:</strong> 당 사이트에 제공하는 구인·구직 광고, 이력서 등록 및 열람, 비자 발급·행정 상담 주선 등 제반 서비스</li>
          <li><strong>이용자:</strong> 회원 및 비회원을 포함하여 당 사이트에 접속하여 서비스를 이용하는 모든 자</li>
        </ul>
      )
    },
    {
      num: 3,
      title: '제3조 (이용약관의 효력과 변경)',
      content: '이 약관은 이용자가 자료 등록, 조회 등 회사를 이용하는 순간부터 효력이 발생합니다. 약관이 변경될 경우 시행일자 및 개정사유를 명시하여 웹사이트에 공지하며, 회원이 변경된 약관에 동의하지 않는 경우 언제든지 탈퇴 및 등록 자료 삭제를 요청할 수 있습니다.'
    },
    {
      num: 4,
      title: '제4조 (회사의 의무)',
      content: '회사는 관련 법령(직업안정법, 출입국관리법 등)과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고 안정적인 구인구직 중개 서비스를 제공하기 위해 최선을 다합니다. 또한 이용자의 개인정보를 안전하게 보호하기 위한 보안 시스템을 구축 운영합니다.'
    },
    {
      num: 5,
      title: '제5조 (이용자의 의무 및 안전조치 준수)',
      content: (
        <div className="space-y-2">
          <p>이용자는 본 약관 및 회사가 정한 제반 규정을 성실히 준수하여야 합니다.</p>
          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-slate-800 text-xs leading-relaxed space-y-1.5">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>채용 및 취업 거래 시 필수 안전조치 규정</span>
            </div>
            <div>
              1. <strong>신원보증 및 허가증 확인:</strong> 사업자등록증 확인, 신분증 및 체류자격(비자 사본) 원본 확인, 연락처 상호 교환 등 안전조치를 반드시 선행해야 합니다.
            </div>
            <div>
              2. <strong>약속 불이행(펑크) 금지:</strong> 이용자 상호 간 면접 약속 파기나 고의적 계약 위반으로 회사 및 타 이용자에게 유무형의 피해를 주지 않아야 합니다.
            </div>
          </div>
        </div>
      )
    },
    {
      num: 6,
      title: '제6조 (허위구인광고 및 불법자료 게재 금지)',
      content: '회사는 직업안정법상 금지된 허위 구인광고, 성매매 및 음란성 자료, 명의도용, 불법 취업 알선 행위를 엄격히 금지합니다. 이를 위반한 이용자는 통보 없이 즉시 강제 탈퇴 및 등록 자료가 삭제되며, 민·형사상 법적 책임을 집니다.'
    },
    {
      num: 7,
      title: '제7조 (서비스 제공의 중지 및 이용 제한)',
      content: '회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다. 또한 약관을 위반한 회원에 대해 사전 통지 없이 서비스 이용을 제한할 수 있습니다.'
    },
    {
      num: 8,
      title: '제8조 (분쟁의 해결 및 관할법원)',
      content: '회사와 이용자 간에 발생한 전자상거래 및 직업소개 서비스 관련 분쟁에 관한 소송은 회사의 본사 소재지(제주특별자치도 제주시)를 관할하는 법원을 전속관할 법원으로 합니다.'
    }
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-24">
      {/* 상단 히어로 배너 */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-4 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            홈으로 돌아가기
          </Link>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
            <FileText className="w-4 h-4" />
            <span>ROKSAN EVERGREEN TERMS OF SERVICE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">서비스 이용약관</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            록산에버그린(주) 회원과 고객사의 권익 보호 및 건전한 채용 문화 정착을 위한 서비스 기본 운영 규정입니다.
          </p>
        </div>
      </div>

      {/* 약관 본문 카드 목록 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-5 text-xs sm:text-sm leading-relaxed">
        
        {articles.map((item) => (
          <div key={item.num} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center shrink-0">
                {item.num}
              </span>
              <span>{item.title}</span>
            </h2>
            <div className="text-slate-600 pt-1">
              {item.content}
            </div>
          </div>
        ))}

        {/* 고객센터 안내 카드 */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold text-emerald-400 mb-1">고객센터 & 분쟁해결 창구</div>
            <div className="text-lg font-black">약관 및 서비스 문의 안내</div>
            <p className="text-xs text-slate-400 mt-1">
              서비스 이용 중 문의사항이나 분쟁 건은 직통 고객센터로 연락 주시면 신속히 처리해 드립니다.
            </p>
          </div>
          <div className="text-xs space-y-1.5 sm:text-right shrink-0">
            <div className="font-bold text-emerald-400 text-sm">대표전화: 064-711-8578</div>
            <div className="text-slate-300">24시 상담 직통: 010-5731-8578</div>
            <div className="text-slate-400 font-mono">roksan22@daum.net</div>
          </div>
        </div>

        {/* 부칙 */}
        <div className="text-right text-xs text-slate-400 pt-2">
          공고일자: 2024년 08월 01일 &nbsp;|&nbsp; <strong>시행일자: 2024년 08월 14일</strong>
        </div>

      </div>
    </div>
  );
}
