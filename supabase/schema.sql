-- 록산에버그린 (Roksan Evergreen) Supabase Database Schema

-- 1. 프로필 테이블 (Profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT CHECK (role IN ('job_seeker', 'employer', 'admin')) DEFAULT 'job_seeker',
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  language_pref TEXT DEFAULT 'ko',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 구인 공고 테이블 (Job Postings)
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  title TEXT NOT NULL,
  target_worker_type TEXT CHECK (target_worker_type IN ('korean', 'foreigner', 'all')) DEFAULT 'all',
  category TEXT NOT NULL, -- 룸메이드, 청소, 가사도우미, 영어도우미, 용접공, 유학생알바, 제조업, 간병인 등
  eligible_visas TEXT[] DEFAULT '{}', -- E-7, E-9, D-2, D-4, D-10, H-2, F-1, F-2, F-4, F-5, F-6 등
  region_sido TEXT NOT NULL, -- 제주, 서울, 경기, 부산, 전국 등
  region_detail TEXT,
  salary_type TEXT DEFAULT 'monthly', -- hourly, daily, monthly
  salary_amount TEXT NOT NULL,
  work_hours TEXT,
  description TEXT NOT NULL,
  contact_phone TEXT,
  status TEXT CHECK (status IN ('active', 'closed', 'paused')) DEFAULT 'active',
  views_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 구직 이력서 테이블 (Job Seeker Resumes)
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  worker_type TEXT CHECK (worker_type IN ('korean', 'foreigner')) DEFAULT 'foreigner',
  visa_type TEXT, -- E-7, E-9, D-2, F-4 등
  nationality TEXT DEFAULT '외국인',
  gender TEXT CHECK (gender IN ('남성', '여성', '무관')),
  age INT,
  desired_category TEXT NOT NULL,
  desired_region TEXT NOT NULL,
  korean_level TEXT, -- 상, 중, 하, 원어민 등
  introduction TEXT,
  contact_phone TEXT,
  status TEXT CHECK (status IN ('active', 'private')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 비자 및 취업 상담 문의 테이블 (Inquiries)
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  inquiry_type TEXT NOT NULL, -- '비자 발급/연장', '어학연수·유학', '기업 인력 지원', '기타 상담'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')) DEFAULT 'pending',
  admin_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 공통 읽기 정책 (모든 사용자 열람 가능)
CREATE POLICY "Public jobs are viewable by everyone" ON public.jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Public resumes are viewable by everyone" ON public.resumes FOR SELECT USING (status = 'active');

-- 문의 작성 정책 (누구나 문의 등록 가능)
CREATE POLICY "Anyone can create inquiry" ON public.inquiries FOR INSERT WITH CHECK (true);
