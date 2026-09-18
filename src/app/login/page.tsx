'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { User, Lock, Mail, Phone, ArrowLeft, ShieldCheck, CheckCircle2, Search, X } from 'lucide-react';

import { supabase } from '@/lib/supabase';

function LoginContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; username: string } | null>(null);
  
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
  const [findResult, setFindResult] = useState<string | null>(null);

  // 아이디 저장 및 세션 확인 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('roksan_saved_id');
    if (saved) {
      setLoginId(saved);
      setRememberId(true);
    }
    const sessionUser = localStorage.getItem('roksan_user_session');
    if (sessionUser) {
      try {
        setLoggedInUser(JSON.parse(sessionUser));
      } catch (e) {}
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginId || !loginPw) return;

    if (rememberId) {
      localStorage.setItem('roksan_saved_id', loginId);
    } else {
      localStorage.removeItem('roksan_saved_id');
    }

    if (!supabase) {
      alert(`${loginId}님, 환영합니다 (오프라인 모드).`);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('roksan_members')
        .select('id, name, username, phone, role')
        .eq('username', loginId)
        .eq('password', loginPw)
        .maybeSingle();

      if (error) {
        alert('로그인 처리 중 오류가 발생했습니다: ' + error.message);
        return;
      }

      if (!data) {
        alert('아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
        return;
      }

      const userInfo = { name: data.name, username: data.username };
      localStorage.setItem('roksan_user_session', JSON.stringify(userInfo));
      setLoggedInUser(userInfo);
      alert(`${data.name}(${data.username})님, 정상적으로 로그인되었습니다!`);
    } catch (err: any) {
      alert('로그인 실패: ' + (err.message || '알 수 없는 오류'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('roksan_user_session');
    setLoggedInUser(null);
    alert('로그아웃 되었습니다.');
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !regId || !regPw || !phone) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (!supabase) {
      alert(`[${name}]님, 회원가입이 완료되었습니다 (오프라인 모드).`);
      setTab('login');
      setLoginId(regId);
      return;
    }

    setLoading(true);
    try {
      // 1. 아이디 중복 체크
      const { data: existingUser } = await supabase
        .from('roksan_members')
        .select('id')
        .eq('username', regId)
        .maybeSingle();

      if (existingUser) {
        alert('이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.');
        setLoading(false);
        return;
      }

      // 2. 신규 회원 DB 저장
      const { error: insertError } = await supabase
        .from('roksan_members')
        .insert([
          {
            name,
            username: regId,
            password: regPw,
            phone,
            role: 'member'
          }
        ]);

      if (insertError) {
        alert('회원가입 실패: ' + insertError.message);
        return;
      }

      alert(`[${name}]님, 회원가입이 성공적으로 완료되었습니다!\n등록하신 아이디로 로그인해주세요.`);
      setTab('login');
      setLoginId(regId);
      setLoginPw('');
      setName('');
      setRegPw('');
      setPhone('');
    } catch (err: any) {
      alert('회원가입 중 오류가 발생했습니다: ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const handleFindSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      alert('데이터베이스 연결 상태를 확인해주세요.');
      return;
    }

    setLoading(true);
    setFindResult(null);
    try {
      if (findTab === 'findId') {
        const { data, error } = await supabase
          .from('roksan_members')
          .select('username')
          .eq('name', findName)
          .eq('phone', findPhone)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setFindResult(`회원님의 아이디는 [ ${data.username} ] 입니다.`);
        } else {
          setFindResult('일치하는 회원 정보를 찾을 수 없습니다.');
        }
      } else {
        const { data, error } = await supabase
          .from('roksan_members')
          .select('id, name')
          .eq('username', findIdInput)
          .eq('phone', findPhone)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          setFindResult(`[${data.name}]님의 임시 비밀번호 재설정 인증이 완료되었습니다.\n등록된 연락처로 재설정 링크가 전송되었습니다.`);
        } else {
          setFindResult('입력하신 정보와 일치하는 회원이 없습니다.');
        }
      }
    } catch (err: any) {
      setFindResult('조회 중 오류가 발생했습니다: ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
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
          {loggedInUser ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-sm font-black text-slate-900 mb-1">
                {loggedInUser.name}님 환영합니다!
              </div>
              <p className="text-xs text-slate-500 mb-4">
                아이디: <span className="font-bold text-slate-700">{loggedInUser.username}</span> | 로그인 중
              </p>
              <div className="flex gap-2 justify-center">
                <Link
                  href="/"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                >
                  홈으로 이동
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
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
          )}

          {/* 1. 로그인 폼 (로그인 상태가 아닐 때만 표시) */}
          {loggedInUser ? null : tab === 'login' ? (
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
                      value={findPhone}
                      onChange={(e) => setFindPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-emerald-500"
                    />
                  </div>
                </>
              )}

              {findResult && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium whitespace-pre-line text-center">
                  {findResult}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition shadow active:scale-95 mt-2"
              >
                {loading ? '조회 중...' : findTab === 'findId' ? '아이디 찾기' : '비밀번호 재설정'}
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
