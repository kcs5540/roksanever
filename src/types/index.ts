export interface Job {
  id: string;
  company_name: string;
  title: string;
  target_worker_type: 'korean' | 'foreigner' | 'all';
  category: string;
  eligible_visas: string[];
  region_sido: string;
  region_detail?: string;
  salary_type: 'hourly' | 'daily' | 'monthly';
  salary_amount: string;
  work_hours?: string;
  description: string;
  contact_phone?: string;
  status: 'active' | 'closed' | 'paused';
  views_count: number;
  created_at: string;
}

export interface Resume {
  id: string;
  title: string;
  worker_type: 'korean' | 'foreigner';
  visa_type?: string;
  nationality: string;
  gender: '남성' | '여성' | '무관';
  age?: number;
  desired_category: string;
  desired_region: string;
  korean_level?: string;
  introduction?: string;
  contact_phone?: string;
  status: 'active' | 'private';
  created_at: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  inquiry_type: string;
  title: string;
  content: string;
  created_at?: string;
}
