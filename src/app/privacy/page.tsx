'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Building2 } from 'lucide-react';

export default function PrivacyPage() {
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
            <ShieldCheck className="w-4 h-4" />
            <span>ROKSAN EVERGREEN PRIVACY POLICY</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">개인정보처리방침</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            록산에버그린(주)는 정보주체의 자유와 권리 보호를 서약하며, 개인정보보호법 및 관계 법령을 철저히 준수합니다.
          </p>
        </div>
      </div>

      {/* 본문 약관 카드 컨테이너 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6 text-xs sm:text-sm leading-relaxed">
        
        {/* 전문 인트로 카드 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <p className="font-semibold text-slate-800">
            <strong>록산에버그린(주)</strong>(이하 “회사”라 한다)는 이용자들의 개인정보보호를 매우 중요시하며, 이용자가 회사의 서비스를 이용함과 동시에 온라인상에서 회사에 제공한 개인정보가 보호받을 수 있도록 최선을 다하고 있습니다.
          </p>
          <p className="text-slate-600">
            이에 회사는 『개인정보 보호법』, 『통신비밀보호법』, 『전기통신사업법』 및 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』 등 정보통신서비스제공자가 준수하여야 할 관련 법규상의 개인정보보호 규정을 준수하며, 본 개인정보처리방침을 통하여 이용자들이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려 드립니다.
          </p>
          
          {/* 목차 */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mt-4">
            <div className="text-xs font-bold text-emerald-700 mb-2.5">[ 개인정보처리방침 주요 목차 ]</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div>1. 수집하는 개인정보 항목 및 수집방법</div>
              <div>2. 개인정보의 수집 및 이용목적</div>
              <div>3. 개인정보의 보유 및 이용기간</div>
              <div>4. 개인정보의 파기 절차 및 방법</div>
              <div>5. 개인정보의 제3자 제공</div>
              <div>6. 정보주체의 권리와 그 행사방법</div>
              <div>7. 쿠키(Cookie)의 운영 및 거부 방법</div>
              <div>8. 개인정보 보호책임자 및 담당자 연락처</div>
            </div>
          </div>
        </div>

        {/* 1. 수집 항목 및 방법 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">1</span>
            수집하는 개인정보의 항목 및 수집방법
          </h2>
          <p className="text-slate-600">
            회사는 회원가입, 구인구직 등록, 비자 및 취업 행정 상담, 불량이용 방지 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div>
              <strong className="text-slate-800">· 필수항목:</strong> 성명, 연락처(휴대전화/유선), 희망 근무지역, 희망 직종(호텔·제조·물류 등), 체류자격(비자유형), 국적
            </div>
            <div>
              <strong className="text-slate-800">· 기업회원/구인등록 시:</strong> 회사명(상호), 사업자등록번호, 담당자 성명 및 연락처, 사업장 소재지
            </div>
            <div>
              <strong className="text-slate-800">· 서비스 이용과정에서 자동 생성 수집:</strong> IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록
            </div>
          </div>
        </div>

        {/* 2. 수집 및 이용 목적 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">2</span>
            개인정보의 수집 및 이용목적
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li><strong>구인·구직 서비스 제공:</strong> 적합 인재 추천 및 매칭, 구인공고 등록 및 이력서 열람, 채용 면접 주선</li>
            <li><strong>비자 및 출입국 행정 상담:</strong> E-7, E-9, D-2, F-4 등 체류자격 적격성 검토 및 비자 발급·연장 행정 상담 대행</li>
            <li><strong>회원 관리:</strong> 본인 확인, 개인식별, 부정 이용 방지와 비인가 사용 방지, 고지사항 전달 및 분쟁 해결을 위한 기록 보존</li>
          </ul>
        </div>

        {/* 3. 보유 및 이용기간 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">3</span>
            개인정보의 보유 및 이용기간
          </h2>
          <p className="text-slate-600">
            원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 부정/불량이용 방지 및 관계 법령에 따라 보존할 필요가 있는 경우 해당 법정 기간 동안 안전하게 보관합니다.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700">
            <div>· 직업안정법 관련 대장 및 구인·구직 신청서: <strong>3년</strong></div>
            <div>· 계약 또는 청약철회, 대금결제 및 재화 공급에 관한 기록: <strong>5년</strong></div>
            <div>· 소비자의 불만 또는 분쟁처리에 관한 기록: <strong>3년</strong></div>
            <div>· 웹사이트 방문 기록 (통신비밀보호법): <strong>3개월</strong></div>
          </div>
        </div>

        {/* 4. 파기 절차 및 방법 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">4</span>
            개인정보의 파기 절차 및 방법
          </h2>
          <p className="text-slate-600">
            전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법(데이터베이스 영구 삭제)을 사용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각합니다.
          </p>
        </div>

        {/* 5. 제3자 제공 */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center">5</span>
            개인정보의 제3자 제공
          </h2>
          <p className="text-slate-600">
            회사는 정보주체의 동의가 있거나 법률의 특별한 규정에 해당하는 경우에만 개인정보를 제3자(채용 희망 기업 또는 비자 심사 행정기관)에게 제공하며, 본래의 수집 목적 범위를 초과하여 제공하지 않습니다.
          </p>
        </div>

        {/* 6. 개인정보 보호책임자 */}
        <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700" />
            개인정보 보호책임자 및 관리 연락처
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-slate-400 font-bold mb-1">개인정보 보호책임자</div>
              <div className="font-bold text-slate-900 text-sm">김 찬 식 (대표이사)</div>
              <div className="text-slate-600 mt-1">소속: 록산에버그린 주식회사</div>
            </div>
            <div>
              <div className="text-slate-400 font-bold mb-1">직통 문의 및 권익 상담</div>
              <div className="font-bold text-emerald-700 text-sm">064-711-8578 / 010-5731-8578</div>
              <div className="text-slate-600 mt-1">이메일: roksan22@daum.net</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 border-t border-emerald-200/60">
            기타 개인정보 침해에 대한 신고나 상담이 필요한 경우 개인정보분쟁조정위원회(1833-6972) 또는 대검찰청 사이버수사과(1301), 경찰청 사이버수사국(182)으로 문의하실 수 있습니다.
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
