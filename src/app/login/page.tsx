'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Building2, User, Lock, Mail, Phone, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [userType, setUserType] = useState<'individual' | 'corporate'>('individual');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      alert(tab === 'login' ? '로그인되었습니다.' : '회원가입이 완료되었습니다.');
    }, 400);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-20">
      {/* 상단 헤더 */}
      <div className="bg-slate-900 text-white py-10 px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-3 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            홈으로 돌아가기
          </Link>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>록산에버그린 회원 서비스</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {tab === 'login' ? '회원 로그인' : '신규 회원가입'}
          </h1>
        </div>
      </div>

      {/* 폼 카드 컨테이너 */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          
          {/* 로그인 / 회원가입 탭 전환 */}
          <div className="flex rounded-2xl bg-slate-100 p-1 mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition ${
                tab === 'login' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`flex-1 py-2.5 text-xs font-black rounded-xl transition ${
                tab === 'register' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              회원가입
            </button>
          </div>

          {/* 회원 구분 선택 (개인/구직자 vs 기업/구인처) */}
          <div className="flex items-center gap-2 mb-5">
            <button
              type="button"
              onClick={() => setUserType('individual')}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                userType === 'individual' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>개인 · 구직회원</span>
            </button>
            <button
              type="button"
              onClick={() => setUserType('corporate')}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                userType === 'corporate' ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>기업 · 구인회원</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {userType === 'individual' ? '이름 (성명)' : '회사명 (상호)'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={userType === 'individual' ? '홍길동 또는 영문명' : '록산호텔(주)'}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                아이디 또는 이메일
              </label>
              <input
                type="text"
                required
                placeholder="아이디 또는 email@example.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                비밀번호
              </label>
              <input
                type="password"
                required
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            {tab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처 (휴대폰 번호)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
                  />
                </div>

                {userType === 'corporate' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      사업자등록번호
                    </label>
                    <input
                      type="text"
                      placeholder="000-00-00000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
                    />
                  </div>
                )}

                <div className="pt-2 text-[11px] text-slate-500 leading-relaxed">
                  가입 시 <Link href="/terms" className="text-emerald-700 font-bold underline">이용약관</Link> 및 <Link href="/privacy" className="text-emerald-700 font-bold underline">개인정보처리방침</Link>에 동의하게 됩니다.
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md active:scale-95 mt-2"
            >
              {tab === 'login' ? '로그인하기' : '회원가입 완료하기'}
            </button>
          </form>

          {/* 하단 안내 */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-700 transition">
              홈으로
            </Link>
            <span className="text-slate-300">|</span>
            <a href="tel:064-711-8578" className="hover:text-emerald-700 transition">
              고객센터 (064-711-8578)
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-400">로딩 중...</div>}>
      <LoginContent />
    </Suspense>
  );
}
