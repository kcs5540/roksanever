'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Bell, 
  Newspaper, 
  ThumbsUp, 
  Phone, 
  Search, 
  PenTool, 
  ChevronRight, 
  Eye, 
  User, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Lock,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Award,
  ShieldCheck,
  X
} from 'lucide-react';

interface CommunityPost {
  id: number;
  category: '공지사항' | '비자·출입국뉴스' | '취업·근무후기' | '자유게시판' | '질문과답변';
  title: string;
  author: string;
  authorRole?: string;
  date: string;
  views: number;
  likes: number;
  commentsCount: number;
  isNotice?: boolean;
  isHot?: boolean;
  summary: string;
  tags?: string[];
  content?: string;
}

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 1,
    category: '공지사항',
    title: '록산에버그린(주) 신규 웹 플랫폼 오픈 및 다국어·빠른 상담 서비스 안내',
    author: '록산에버그린 운영팀',
    authorRole: '관리자',
    date: '2026-03-16',
    views: 890,
    likes: 42,
    commentsCount: 6,
    isNotice: true,
    summary: '구인기업과 외국인 근로자, 유학생 모두가 신뢰할 수 있는 모던 구인구직 및 비자 행정 통합 플랫폼이 오픈되었습니다.',
    tags: ['공지', '플랫폼오픈', '고객센터'],
    content: `안녕하세요, 록산에버그린(주) 대표 김찬식입니다.
저희 록산에버그린은 제주를 비롯한 전국 각지의 우수한 기업과 성실한 외국인 근로자·유학생을 잇는 가교 역할을 성실히 수행해오고 있습니다.

이번 신규 웹 플랫폼 오픈을 통해:
1. 전국 18개 시도별 맞춤 구인/구직 실시간 필터링
2. 외국인 유학생(D-2) 합법 시간제 취업 전용관 운영
3. E-7, F-4, H-2 등 전문 비자 행정 및 출입국 민원 1:1 비밀상담
4. 24시간 긴급 직통 전화(010-5731-8578) 상담 지원

언제나 구인기업과 근로자 여러분의 성공적인 내일을 위해 최선을 다하겠습니다. 많은 이용과 성원 부탁드립니다.`
  },
  {
    id: 2,
    category: '비자·출입국뉴스',
    title: '[출입국 최신] 2026년 외국인 유학생(D-2) 시간제 취업(아르바이트) 허가 기준 완화 총정리',
    author: '비자전문상담팀',
    authorRole: '행정지원',
    date: '2026-03-14',
    views: 1250,
    likes: 78,
    commentsCount: 15,
    isHot: true,
    summary: '법무부 출입국 외국인정책본부 최신 지침에 따른 유학생 주중/주말 허용시간 및 신규 허용 업종 상세 안내',
    tags: ['D-2비자', '시간제취업', '출입국행정', '법무부'],
    content: `2026년 법무부 최신 지침에 따른 외국인 유학생(D-2) 시간제 취업(아르바이트) 가이드입니다.

주요 변경점:
1. 한국어능력(TOPIK 4급 이상 또는 사회통합프로그램 이수자) 보유 시 주중 허용시간 우대 (학부생 최대 25~30시간/주)
2. 방학 기간(여름·겨울) 중에는 근로시간 무제한 근무 허용 (단, 시간제취업확인서 사전 신고 필수)
3. 호텔 룸메이드, 하우스키핑, 제조업 일부 단순노무 직종의 경우 제한 조건 사전 출입국 방문 확인 필수
4. 불법 취업 시 출입국관리법에 의거 강제출국 및 비자 연장 불이익이 발생하므로 반드시 유학생 담당관 서명과 출입국 체류허가 스티커를 교부받으셔야 합니다.

궁금하신 점은 록산에버그린 비자상담센터(010-5731-8578)로 문의주시면 서류 작성을 도와드립니다.`
  },
  {
    id: 3,
    category: '비자·출입국뉴스',
    title: '[기업필독] E-7-1 전문인력 및 숙련기능인력(E-7-4) 쿼터 확대 및 고용추천서 발급 절차',
    author: '록산 행정연구원',
    authorRole: '비자자문',
    date: '2026-03-10',
    views: 940,
    likes: 35,
    commentsCount: 8,
    summary: '제조업, 조선업, 뿌리산업체 대상 외국인 숙련인력 합법 장기체류를 위한 E-7 전환 요건 안내',
    tags: ['E-7', 'E-7-4', '외국인고용', '비자추천서'],
    content: `제조업, 조선업, 호텔업계 대표님들을 위한 E-7 비자 추천 안내입니다.

외국인 근로자가 성실히 일하고 있더라도 비자 만료 시 본국 귀국 위험이 있습니다.
E-7-4(숙련기능인력) 점수제 비자로 전환하면 최대 장기체류 및 가족 초청이 가능합니다.

- 근속 연수 4년 이상 E-9 근로자 대상
- 한국어 능력(TOPIK 2급 이상) 및 연봉 기준 충족 요건
- 기업 고용 추천서 및 주무관청 발급 대행 문의 환영`
  },
  {
    id: 4,
    category: '취업·근무후기',
    title: '[근무후기] 제주 특급호텔 룸메이드 6개월 근무 후기 (기숙사/식사 만족!)',
    author: '응웬*안 (베트남)',
    authorRole: '구직회원',
    date: '2026-03-08',
    views: 710,
    likes: 54,
    commentsCount: 11,
    summary: '록산에버그린을 통해 제주 중문 리조트에 취업한 외국인 근로자의 생생한 실제 근무 경험담입니다.',
    tags: ['호텔취업', '제주도', '룸메이드', '실제후기'],
    content: `처음 한국에 와서 어디서 일해야 할지 막막했는데, 록산에버그린 김 소장님께서 친절하게 호텔 담당자분과 연결해주셨습니다.

- 기숙사: 2인 1실로 에어컨과 난방 잘되고 세탁기도 깨끗합니다.
- 식사: 직원 식당에서 삼시 세끼 무료 제공되어서 식비가 전혀 안 듭니다.
- 업무 분위기: 한국인 반장님들이 친절하게 베딩하는 요령을 가르쳐주셔서 2주 만에 적응했습니다.

월급도 매달 10일에 정확하게 통장으로 입금되고 잔업 수당도 1분 단위로 계산해줘서 부모님께 돈도 보냈습니다. 도움 주신 록산에버그린에 진심으로 감사드립니다!`
  },
  {
    id: 5,
    category: '취업·근무후기',
    title: '[유학생후기] D-2 유학생 주말 리조트 F&B 식음료 홀서빙 아르바이트 꿀팁',
    author: '왕* (중국유학생)',
    authorRole: '유학생',
    date: '2026-03-05',
    views: 640,
    likes: 39,
    commentsCount: 7,
    summary: '시간제 취업허가증 서류 준비 과정부터 주말 셔틀버스 이용, 실무 팁까지 아낌없이 공유합니다.',
    tags: ['D-2', '알바후기', '홀서빙', '합법알바'],
    content: `학교 다니면서 주말에 용돈 벌고 한국어도 연습하고 싶어서 록산에버그린 유학생 취업관을 통해 리조트 주말 연회장 서빙 알바를 시작했습니다.

가장 중요한 건 학교 유학생지원센터에서 '시간제취업확인서'에 도장 받고 출입국에 사전 신고하는 것입니다!
록산에버그린에서 표준근로계약서 양식과 사업자등록증 사본을 바로 준비해주셔서 학교 승인받기 쉬웠습니다.
주말 8시간씩 일하니 월 80만원 이상 모을 수 있어서 학비에 큰 도움이 되고 있습니다.`
  },
  {
    id: 6,
    category: '자유게시판',
    title: '제주도 외국인 근로자 은행 계좌 개설 및 해외 송금 시 필요한 서류 질문',
    author: '알렉산더 (우즈벡)',
    authorRole: '일반회원',
    date: '2026-03-02',
    views: 430,
    likes: 18,
    commentsCount: 5,
    summary: '외국인등록증 발급 전 여권만으로 계좌 개설이 가능한 은행 지점 정보 및 해외 송금 팁을 공유해주세요.',
    tags: ['외국인금융', '계좌개설', '해외송금']
  },
  {
    id: 7,
    category: '질문과답변',
    title: 'F-4 재외동포 비자인데 건설현장이나 농장 일자리 취업에 제한이 있나요?',
    author: '박*철 (재외동포)',
    authorRole: '일반회원',
    date: '2026-02-28',
    views: 520,
    likes: 22,
    commentsCount: 9,
    summary: 'F-4 단순 노무 제한 업종에 해당하는지 여부와 합법적으로 취업 가능한 관련 직종에 대한 질문입니다.',
    tags: ['F-4비자', '취업제한', '단순노무']
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  // 글쓰기 모달 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [writeForm, setWriteForm] = useState({
    category: '자유게시판' as CommunityPost['category'],
    title: '',
    author: '',
    authorRole: '일반회원',
    content: '',
    tags: ''
  });

  const categories = ['전체', '공지사항', '비자·출입국뉴스', '취업·근무후기', '자유게시판', '질문과답변'];

  // 필터링된 게시글 목록
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // 새 글 등록 핸들러
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!writeForm.title.trim() || !writeForm.content.trim() || !writeForm.author.trim()) {
      alert('작성자명, 제목, 내용을 모두 입력해주세요.');
      return;
    }

    const tagList = writeForm.tags
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newPost: CommunityPost = {
      id: Date.now(),
      category: writeForm.category,
      title: writeForm.title,
      author: writeForm.author,
      authorRole: writeForm.authorRole,
      date: new Date().toISOString().split('T')[0],
      views: 1,
      likes: 0,
      commentsCount: 0,
      summary: writeForm.content.slice(0, 80) + (writeForm.content.length > 80 ? '...' : ''),
      content: writeForm.content,
      tags: tagList.length > 0 ? tagList : ['커뮤니티']
    };

    setPosts([newPost, ...posts]);
    setIsWriteModalOpen(false);
    setWriteForm({
      category: '자유게시판',
      title: '',
      author: '',
      authorRole: '일반회원',
      content: '',
      tags: ''
    });
    alert('새로운 글이 성공적으로 등록되었습니다.');
  };

  // 좋아요 클릭
  const handleLike = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
  };

  return (
    <div className="bg-[#f4f7f6] min-h-screen pb-20">
      
      {/* 1. 상단 페이지 히어로 헤더 */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white py-12 px-4 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>록산에버그린 열린 소통 광장</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                커뮤니티 &middot; 정보광장
              </h1>
              <p className="text-emerald-100/90 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                출입국 비자 최신 소식, 합법 취업 성공 후기, 생활 정보 및 구인기업 공지사항을 자유롭게 나누는 열린 소통 공간입니다.
              </p>
            </div>

            {/* 빠른 글쓰기 버튼 */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-105"
              >
                <PenTool className="w-4 h-4" />
                <span>이야기 나누기 (글쓰기)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 메인 컨테이너 (그리드 레이아웃: 좌측 3컬럼 사이드바 + 우측 9컬럼 게시판) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* =========================================================
              [좌측 사이드바: 3컬럼] 카테고리 메뉴, 인기 키워드, 공식 상담 박스
             ========================================================= */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            
            {/* 1) 카테고리 필터 카드 */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>게시판 카테고리</span>
                </div>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  {posts.length}개 글
                </span>
              </div>
              <div className="p-2 space-y-1">
                {categories.map((cat) => {
                  const count = cat === '전체' 
                    ? posts.length 
                    : posts.filter(p => p.category === cat).length;
                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isSelected 
                          ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-slate-300'}`} />
                        <span>{cat}</span>
                      </div>
                      <span className={`text-[11px] px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2) 실시간 인기 토픽 & 키워드 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>주목받는 인기 태그</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['#D-2시간제취업', '#E-7비자전환', '#제주호텔룸메이드', '#숙식제공', '#외국인등록증', '#TOPIK합격', '#출입국신고', '#합법근로'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag.replace('#', ''))}
                    className="text-[11px] font-semibold bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-lg transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 3) 긴급 상담 안내 배너 (지정된 규격 010-5731-8578 & roksan22@daum.net 완벽 적용) */}
            <div className="bg-[#f7fafc] rounded-2xl border border-slate-200/80 p-6 text-center shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>
              <p className="text-xs font-bold text-slate-700 leading-snug mb-2">
                구직&middot;구인 희망시<br />
                포스팅 또는 <span className="text-emerald-700 font-extrabold">록산에버그린</span>으로<br />
                연락주세요!
              </p>
              <div className="text-base sm:text-lg font-black text-emerald-800 tracking-tight mt-2">
                <span className="text-emerald-600">T. </span>010-5731-8578
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">
                <span className="text-emerald-700">E-mail. </span>
                <a href="mailto:roksan22@daum.net" className="hover:underline text-slate-800">
                  roksan22@daum.net
                </a>
              </div>
              <a
                href="tel:010-5731-8578"
                className="mt-4 block w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
              >
                전화 상담 바로 연결
              </a>
            </div>

            {/* 4) 출입국 및 고용노동부 공식 링크 바로가기 */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xs text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>유관기관 공식 서비스 바로가기</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="https://www.hikorea.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between group">
                    <span>하이코리아 (Hi Korea 체류신고)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                  </a>
                </li>
                <li>
                  <a href="https://www.eps.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between group">
                    <span>고용허가제 (EPS 공식사이트)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                  </a>
                </li>
                <li>
                  <a href="https://www.work.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center justify-between group">
                    <span>워크넷 (고용노동부 구인구직)</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400" />
                  </a>
                </li>
              </ul>
            </div>

          </aside>

          {/* =========================================================
              [우측 메인: 9컬럼] 검색바, 게시글 리스트, 상세 보기
             ========================================================= */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            
            {/* 검색 & 카테고리 요약 바 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-800">
                  [{selectedCategory}]
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  총 <strong className="text-emerald-700">{filteredPosts.length}</strong>개의 게시물이 있습니다.
                </span>
              </div>

              {/* 검색 인풋 */}
              <div className="w-full sm:w-80 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="제목, 내용, 작성자, 태그 검색..."
                  className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* 게시글 목록 */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                  <MessageCircle className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="font-bold text-base">검색된 게시물이 없습니다.</p>
                  <p className="text-xs text-slate-400 mt-1">다른 검색어나 카테고리를 선택해보세요.</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.isNotice && (
                          <span className="bg-rose-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Bell className="w-3 h-3" /> 필독공지
                          </span>
                        )}
                        {post.isHot && (
                          <span className="bg-amber-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> 인기뉴스
                          </span>
                        )}
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md ${
                          post.category === '공지사항' 
                            ? 'bg-rose-50 text-rose-700' 
                            : post.category === '비자·출입국뉴스'
                            ? 'bg-blue-50 text-blue-700'
                            : post.category === '취업·근무후기'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {post.category}
                        </span>
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
                          {post.title}
                        </h2>
                      </div>

                      <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {post.summary}
                    </p>

                    {/* 태그 목록 */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {post.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 하단 메타정보: 작성자, 조회수, 좋아요, 댓글 */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {post.author}
                        </span>
                        {post.authorRole && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-medium">
                            {post.authorRole}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {post.views}
                        </span>
                        <button
                          onClick={(e) => handleLike(post.id, e)}
                          className="flex items-center gap-1 hover:text-rose-500 transition"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {post.likes}
                        </button>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {post.commentsCount}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

          </main>

        </div>
      </div>

      {/* =========================================================
          [게시글 상세 보기 모달]
         ========================================================= */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* 상단 헤더 */}
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold bg-emerald-500 text-slate-950 px-2.5 py-0.5 rounded-full">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-slate-400">{selectedPost.date}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {selectedPost.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800">
                <span>작성자: <strong>{selectedPost.author}</strong></span>
                <span>조회수: {selectedPost.views}</span>
                <span>좋아요: {selectedPost.likes}</span>
              </div>
            </div>

            {/* 본문 내용 */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line font-medium bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                {selectedPost.content || selectedPost.summary}
              </div>

              {selectedPost.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedPost.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 댓글 및 피드백 영역 */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-bold flex items-center gap-1.5 text-slate-800">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    댓글 ({selectedPost.commentsCount})
                  </span>
                  <button 
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>좋아요 {selectedPost.likes}</span>
                  </button>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-500 text-center">
                  건전한 커뮤니티 문화를 위해 배려하는 마음으로 작성해주세요.
                </div>
              </div>
            </div>

            {/* 하단 닫기 */}
            <div className="bg-slate-100 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          [글쓰기 모달]
         ========================================================= */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-emerald-700 text-white p-6 relative">
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute right-5 top-5 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <PenTool className="w-4 h-4 text-emerald-300" />
                <span className="text-xs font-bold text-emerald-200">록산 열린광장</span>
              </div>
              <h3 className="text-xl font-black text-white">커뮤니티 글쓰기</h3>
              <p className="text-xs text-emerald-100 mt-1">취업 후기, 비자 질문, 정보 공유 등 자유롭게 작성해주세요.</p>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">카테고리 선택 *</label>
                  <select
                    value={writeForm.category}
                    onChange={(e) => setWriteForm({ ...writeForm, category: e.target.value as CommunityPost['category'] })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-semibold"
                  >
                    <option value="자유게시판">자유게시판</option>
                    <option value="취업·근무후기">취업·근무후기</option>
                    <option value="질문과답변">질문과답변</option>
                    <option value="비자·출입국뉴스">비자·출입국뉴스</option>
                    <option value="공지사항">공지사항 (관리자용)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">작성자 닉네임 *</label>
                  <input
                    type="text"
                    value={writeForm.author}
                    onChange={(e) => setWriteForm({ ...writeForm, author: e.target.value })}
                    placeholder="예: 김취업 (베트남)"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">글 제목 *</label>
                <input
                  type="text"
                  value={writeForm.title}
                  onChange={(e) => setWriteForm({ ...writeForm, title: e.target.value })}
                  placeholder="제목을 입력하세요"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">내용 *</label>
                <textarea
                  rows={6}
                  value={writeForm.content}
                  onChange={(e) => setWriteForm({ ...writeForm, content: e.target.value })}
                  placeholder="내용을 자유롭고 상세하게 작성해주세요."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">태그 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={writeForm.tags}
                  onChange={(e) => setWriteForm({ ...writeForm, tags: e.target.value })}
                  placeholder="예: 호텔취업, 기숙사제공, D-2"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
                >
                  게시글 등록하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
