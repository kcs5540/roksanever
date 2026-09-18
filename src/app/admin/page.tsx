'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  CheckCircle, 
  Lock, 
  LogIn, 
  LogOut, 
  Eye, 
  UserCheck, 
  Phone, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Member {
  id: string;
  name: string;
  username: string;
  phone: string;
  role: string;
  created_at: string;
}

interface Job {
  id: string;
  title: string;
  target?: string;
  category?: string;
  region?: string;
  salary?: string;
  created_at?: string;
}

interface Resume {
  id: string;
  title: string;
  name?: string;
  gender?: string;
  age?: string;
  visa?: string;
  category?: string;
  region?: string;
  created_at?: string;
}

interface VisaInquiry {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  inquiry_type?: string;
  title?: string;
  content?: string;
  status?: string;
  created_at?: string;
}

export default function AdminPage() {
  // 인증 상태
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminUser, setAdminUser] = useState<string>('');
  const [loginInputId, setLoginInputId] = useState('');
  const [loginInputPw, setLoginInputPw] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // 탭 상태: 'members' | 'jobs' | 'resumes' | 'visas'
  const [currentTab, setCurrentTab] = useState<'members' | 'jobs' | 'resumes' | 'visas'>('members');

  // 데이터 목록 상태
  const [members, setMembers] = useState<Member[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [visas, setVisas] = useState<VisaInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. 관리자 세션 체크 (최초 로드 시)
  useEffect(() => {
    const saved = localStorage.getItem('roksan_admin_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.role === 'admin') {
          setIsAdminAuth(true);
          setAdminUser(parsed.username || 'admin');
        }
      } catch (e) {}
    }
  }, []);

  // 2. 인증 성공 후 데이터 로드
  useEffect(() => {
    if (isAdminAuth) {
      fetchCurrentTabData();
    }
  }, [isAdminAuth, currentTab]);

  const fetchCurrentTabData = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      if (currentTab === 'members') {
        const { data, error } = await supabase
          .from('roksan_members')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setMembers(data);
      } else if (currentTab === 'jobs') {
        const { data, error } = await supabase
          .from('roksan_jobs')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setJobs(data);
      } else if (currentTab === 'resumes') {
        const { data, error } = await supabase
          .from('roksan_resumes')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setResumes(data);
      } else if (currentTab === 'visas') {
        const { data, error } = await supabase
          .from('roksan_visas')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) setVisas(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 관리자 로그인 핸들러
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginInputId || !loginInputPw) return;

    if (!supabase) {
      if (loginInputId === 'admin' && loginInputPw === 'admin1234') {
        setIsAdminAuth(true);
        setAdminUser('admin');
        localStorage.setItem('roksan_admin_session', JSON.stringify({ username: 'admin', role: 'admin' }));
      } else {
        setAuthError('오프라인 모드: 아이디(admin) 또는 비밀번호가 올바르지 않습니다.');
      }
      return;
    }

    setLoginLoading(true);
    try {
      const { data, error } = await supabase
        .from('roksan_members')
        .select('*')
        .eq('username', loginInputId)
        .eq('password', loginInputPw)
        .maybeSingle();

      if (error) {
        setAuthError('인증 확인 중 오류가 발생했습니다: ' + error.message);
        return;
      }

      if (!data) {
        setAuthError('아이디 또는 비밀번호가 일치하지 않습니다.');
        return;
      }

      if (data.role !== 'admin') {
        setAuthError('관리자 권한(role: admin)이 부여된 계정만 접속할 수 있습니다.');
        return;
      }

      // 관리자 로그인 성공
      setIsAdminAuth(true);
      setAdminUser(data.username);
      localStorage.setItem('roksan_admin_session', JSON.stringify({ username: data.username, role: 'admin' }));
    } catch (err: any) {
      setAuthError('로그인 실패: ' + (err.message || ''));
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('roksan_admin_session');
    setIsAdminAuth(false);
    setAdminUser('');
  };

  // 삭제 핸들러 (회원, 구인, 구직, 상담문의 공통)
  const handleDeleteItem = async (table: string, id: string, nameOrTitle: string) => {
    if (!confirm(`[${nameOrTitle}] 항목을 정말 삭제하시겠습니까?\n삭제 후 복구할 수 없습니다.`)) {
      return;
    }

    if (!supabase) return;

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) {
        alert('삭제 실패: ' + error.message);
      } else {
        alert('성공적으로 삭제되었습니다.');
        fetchCurrentTabData();
      }
    } catch (err: any) {
      alert('삭제 중 오류: ' + err.message);
    }
  };

  // 회원 역할 변경 (member <-> admin)
  const handleToggleRole = async (member: Member) => {
    const newRole = member.role === 'admin' ? 'member' : 'admin';
    if (!confirm(`[${member.name}] 회원의 권한을 '${newRole}'(으)로 변경하시겠습니까?`)) {
      return;
    }

    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('roksan_members')
        .update({ role: newRole })
        .eq('id', member.id);

      if (error) {
        alert('권한 변경 실패: ' + error.message);
      } else {
        alert(`[${member.name}] 회원의 권한이 '${newRole}'(으)로 변경되었습니다.`);
        fetchCurrentTabData();
      }
    } catch (err: any) {
      alert('오류 발생: ' + err.message);
    }
  };

  // 1. 관리자 미인증 시 로그인 화면
  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-emerald-500/30 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-white">관리자 시스템 접속</h1>
            <p className="text-xs text-slate-400 mt-1">
              록산에버그린 통합 관리자 전용 대시보드입니다.
            </p>
          </div>

          {authError && (
            <div className="mb-5 p-3.5 bg-red-900/40 border border-red-500/50 rounded-xl flex items-start gap-2.5 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                관리자 아이디
              </label>
              <input
                type="text"
                required
                value={loginInputId}
                onChange={(e) => setLoginInputId(e.target.value)}
                placeholder="관리자 ID (기본: admin)"
                className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                비밀번호
              </label>
              <input
                type="password"
                required
                value={loginInputPw}
                onChange={(e) => setLoginInputPw(e.target.value)}
                placeholder="관리자 비밀번호"
                className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs rounded-xl transition shadow-lg mt-2 flex items-center justify-center gap-2"
            >
              {loginLoading ? '인증 확인 중...' : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>관리자 대시보드 로그인</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-700/80 text-center text-xs text-slate-500">
            <Link href="/" className="hover:text-emerald-400 transition">
              &larr; 일반 사용자 홈페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. 관리자 인증 완료 후 대시보드 메인 화면
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 pb-24">
      {/* 상단 관리자 네비게이션 헤더 */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-black flex items-center gap-2">
                <span>록산에버그린 통합 관리자 대시보드</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                  v2.0 CLOUD
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                접속자: <strong className="text-emerald-400">{adminUser}</strong> (최고관리자)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>사이트 바로보기</span>
            </Link>
            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-red-500/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      {/* 메인 컨테이너 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 상단 4대 핵심 관리 탭 버튼 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <button
            onClick={() => setCurrentTab('members')}
            className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
              currentTab === 'members'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${currentTab === 'members' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium opacity-80">회원 관리</div>
              <div className="text-lg font-black">{members.length > 0 ? `${members.length}명` : '회원 목록'}</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('jobs')}
            className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
              currentTab === 'jobs'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${currentTab === 'jobs' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium opacity-80">구인공고 관리</div>
              <div className="text-lg font-black">{jobs.length > 0 ? `${jobs.length}건` : '구인 목록'}</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('resumes')}
            className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
              currentTab === 'resumes'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${currentTab === 'resumes' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium opacity-80">인재 이력서 관리</div>
              <div className="text-lg font-black">{resumes.length > 0 ? `${resumes.length}건` : '구직 목록'}</div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('visas')}
            className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
              currentTab === 'visas'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className={`p-2.5 rounded-xl ${currentTab === 'visas' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-medium opacity-80">비자/상담 문의</div>
              <div className="text-lg font-black">{visas.length > 0 ? `${visas.length}건` : '문의 목록'}</div>
            </div>
          </button>
        </div>

        {/* 상단 검색 및 새로고침 바 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 아이디, 제목 검색..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={fetchCurrentTabData}
              disabled={loading}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>새로고침</span>
            </button>
          </div>
        </div>

        {/* 테이블 컨텐츠 카드 */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          {/* 1. 회원 관리 테이블 */}
          {currentTab === 'members' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">성명 / 상호명</th>
                    <th className="py-3.5 px-4">아이디 (Username)</th>
                    <th className="py-3.5 px-4">연락처</th>
                    <th className="py-3.5 px-4">권한 등급</th>
                    <th className="py-3.5 px-4">가입일시</th>
                    <th className="py-3.5 px-4 text-center">관리 액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {members.filter(m => m.name.includes(searchTerm) || m.username.includes(searchTerm) || m.phone.includes(searchTerm)).map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        {m.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                        {m.username}
                      </td>
                      <td className="py-3.5 px-4">
                        {m.phone}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                          m.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {m.role === 'admin' ? '최고관리자' : '일반회원'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {m.created_at ? new Date(m.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleRole(m)}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-[11px] transition"
                            title="권한 변경"
                          >
                            등급전환
                          </button>
                          <button
                            onClick={() => handleDeleteItem('roksan_members', m.id, `${m.name}(${m.username})`)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="회원 삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {members.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        등록된 회원이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 2. 구인공고 관리 테이블 */}
          {currentTab === 'jobs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">채용공고 제목</th>
                    <th className="py-3.5 px-4">대상/직종</th>
                    <th className="py-3.5 px-4">근무지역</th>
                    <th className="py-3.5 px-4">급여 조건</th>
                    <th className="py-3.5 px-4">등록일</th>
                    <th className="py-3.5 px-4 text-center">관리 액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.filter(j => (j.title || '').includes(searchTerm)).map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm truncate">
                        <Link href={`/jobs/${j.id}`} target="_blank" className="hover:text-emerald-600 hover:underline">
                          {j.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-bold text-[11px] mr-1">
                          {j.target || '외국인'}
                        </span>
                        <span>{j.category || '기타'}</span>
                      </td>
                      <td className="py-3.5 px-4">{j.region || '전국'}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{j.salary || '-'}</td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {j.created_at ? new Date(j.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDeleteItem('roksan_jobs', j.id, j.title)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="공고 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        등록된 구인공고가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. 구직 이력서 관리 테이블 */}
          {currentTab === 'resumes' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">이력서 제목 / 희망직종</th>
                    <th className="py-3.5 px-4">인재 정보 (성명/성별/나이)</th>
                    <th className="py-3.5 px-4">비자 종류</th>
                    <th className="py-3.5 px-4">희망지역</th>
                    <th className="py-3.5 px-4">등록일</th>
                    <th className="py-3.5 px-4 text-center">관리 액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {resumes.filter(r => (r.title || '').includes(searchTerm) || (r.name || '').includes(searchTerm)).map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm truncate">
                        <Link href={`/resumes/${r.id}`} target="_blank" className="hover:text-emerald-600 hover:underline">
                          {r.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4">
                        {r.name || '구직자'} ({r.gender || '무관'} / {r.age || '-'})
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold text-[11px]">
                          {r.visa || 'E-9/F-4'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">{r.region || '전국'}</td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDeleteItem('roksan_resumes', r.id, r.title || r.name || '이력서')}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="이력서 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {resumes.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        등록된 구직 이력서가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* 4. 비자 / 상담 문의 관리 테이블 */}
          {currentTab === 'visas' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">상담 제목 / 문의내용</th>
                    <th className="py-3.5 px-4">신청자명</th>
                    <th className="py-3.5 px-4">연락처 / 이메일</th>
                    <th className="py-3.5 px-4">문의 구분</th>
                    <th className="py-3.5 px-4">접수일시</th>
                    <th className="py-3.5 px-4 text-center">관리 액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visas.filter(v => (v.title || '').includes(searchTerm) || (v.name || '').includes(searchTerm) || (v.phone || '').includes(searchTerm)).map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm">
                        <div>{v.title || '상담 문의'}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{v.content}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {v.name || '익명'}
                      </td>
                      <td className="py-3.5 px-4">
                        <div>{v.phone || '-'}</div>
                        <div className="text-[10px] text-slate-400">{v.email || '-'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-bold text-[11px]">
                          {v.inquiry_type || '비자상담'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {v.created_at ? new Date(v.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleDeleteItem('roksan_visas', v.id, v.title || v.name || '문의')}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="상담내역 삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {visas.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        접수된 비자/상담 문의가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
