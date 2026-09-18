'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { User, Lock, Mail, Phone, ArrowLeft, ShieldCheck, CheckCircle2, Search, X } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  
  // 로그인 폼 상태
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [rememberId, setRememberId] = useState(false);

  // 회원가입 폼 상태 (개인/기업 구별 없는 단일 통합 가입)
  const [name, setName] = useState('');
  const [regId, setRegId] = useState('');
  const [regPw, setRegPw] = useState('');
  const [phone, setPhone] = useState('');

  // 아이디 / 비밀번호 찾기 모달 상태
  const [findModalOpen, setFindModalOpen] = useState(false);
  const [findTab, setFindTab] = useState<'findId' | 'findPw'>('findId');
  const [findName, setFindName] = useState('');
  const [findPhone, setFindPhone] = useState('');
  const [findIdInput, setFindIdInput] = useState('');

  // 아이디 저장 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('roksan_saved_id');
    if (saved) {
      setLoginId(saved);
      setRememberId(true);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rememberId) {
      localStorage.setItem('roksan_saved_id', loginId);
    } else {
      localStorage.removeItem('roksan_saved_id');
    }
    alert(`${loginId}님, 정상적으로 로그인되었습니다.`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`[${name}]님, 회원가입이 완료되었습니다!\n로그인 후 즉시 이용 가능합니다.`);
    setTab('login');
    setLoginId(regId);
  };

  const handleFindSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (findTab === 'findId') {
      alert(`[${findName}]님의 연락처(${findPhone})로 등록된 아이디 정보를 안전하게 조회하여 안내드렸습니다.`);
    } else {
      alert(`아이디 [${findIdInput}]에 등록된 연락처로 임시 비밀번호 재설정 링크가 발송되었습니다.`);
    }
    setFindModalOpen(false);
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
            <span>록산에버그린 통합 회원 서비스</span>
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

          {/* 1. 로그인 폼 */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  아이디 또는 이메일
                </label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="아이디 또는 이메일 입력"
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
                  value={loginPw}
                  onChange={(e) => setLoginPw(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              {/* 아이디 저장 & 아이디/비밀번호 찾기 한 줄 배치 */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={rememberId}
                    onChange={(e) => setRememberId(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 accent-emerald-600"
                  />
                  <span>아이디 저장</span>
                </label>

                <div className="flex items-center gap-2 text-slate-400">
                  <button
                    type="button"
                    onClick={() => {
                      setFindTab('findId');
                      setFindModalOpen(true);
                    }}
                    className="text-slate-600 hover:text-emerald-700 font-medium transition"
                  >
                    아이디 찾기
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => {
                      setFindTab('findPw');
                      setFindModalOpen(true);
                    }}
                    className="text-slate-600 hover:text-emerald-700 font-medium transition"
                  >
                    비밀번호 찾기
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md active:scale-95 mt-4"
              >
                로그인
              </button>
            </form>
          ) : (
            /* 2. 초간단 단일 통합 회원가입 폼 (개인/기업 복잡한 구별 없음) */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  이름 또는 상호명
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름(외국인 성명) 또는 기업 상호명"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  아이디
                </label>
                <input
                  type="text"
                  required
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  placeholder="사용할 아이디 입력"
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
                  value={regPw}
                  onChange={(e) => setRegPw(e.target.value)}
                  placeholder="비밀번호 설정"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  연락처 (휴대폰 번호)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div className="pt-2 text-[11px] text-slate-500 leading-relaxed">
                가입 시 <Link href="/terms" className="text-emerald-700 font-bold underline">이용약관</Link> 및 <Link href="/privacy" className="text-emerald-700 font-bold underline">개인정보처리방침</Link>에 동의하게 됩니다.
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow-md active:scale-95 mt-2"
              >
                회원가입 완료
              </button>
            </form>
          )}

          {/* 하단 고객센터 안내 */}
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

      {/* 아이디 / 비밀번호 찾기 모달 팝업 */}
      {findModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setFindModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex rounded-xl bg-slate-100 p-1 mb-5 border border-slate-200">
              <button
                type="button"
                onClick={() => setFindTab('findId')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  findTab === 'findId' ? 'bg-white text-emerald-800 shadow-2xs font-black' : 'text-slate-500'
                }`}
              >
                아이디 찾기
              </button>
              <button
                type="button"
                onClick={() => setFindTab('findPw')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  findTab === 'findPw' ? 'bg-white text-emerald-800 shadow-2xs font-black' : 'text-slate-500'
                }`}
              >
                비밀번호 찾기
              </button>
            </div>

            <form onSubmit={handleFindSubmit} className="space-y-3.5">
              {findTab === 'findId' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      이름 또는 상호명
                    </label>
                    <input
                      type="text"
                      required
                      value={findName}
                      onChange={(e) => setFindName(e.target.value)}
                      placeholder="가입 시 등록한 이름"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      등록된 휴대폰 번호
                    </label>
                    <input
                      type="tel"
                      required
                      value={findPhone}
                      onChange={(e) => setFindPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      가입 아이디
                    </label>
                    <input
                      type="text"
                      required
                      value={findIdInput}
                      onChange={(e) => setFindIdInput(e.target.value)}
                      placeholder="아이디를 입력하세요"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      등록된 휴대폰 번호
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition shadow active:scale-95 mt-2"
              >
                {findTab === 'findId' ? '아이디 찾기' : '비밀번호 재설정'}
              </button>
            </form>
          </div>
        </div>
      )}
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
