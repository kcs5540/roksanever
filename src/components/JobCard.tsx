'use client';

import React from 'react';
import Link from 'next/link';
import { Job } from '@/types';
import { MapPin, Banknote, Calendar, ChevronRight, CheckCircle2, Globe2 } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group flex flex-col justify-between">
      <div>
        {/* 상단 뱃지 영역 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              {job.category}
            </span>
            {job.target_worker_type === 'foreigner' && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 flex items-center gap-1">
                <Globe2 className="w-3 h-3" /> 외국인 가능
              </span>
            )}
            {job.target_worker_type === 'all' && (
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                내/외국인 무관
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {job.created_at}
          </span>
        </div>

        {/* 회사명 */}
        <div className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
          <span>{job.company_name}</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />
        </div>

        {/* 공고 제목 */}
        <Link href={`/jobs/${job.id}`}>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-3 leading-snug">
            {job.title}
          </h3>
        </Link>

        {/* 비자 태그 목록 */}
        {job.eligible_visas && job.eligible_visas.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="text-[11px] font-semibold text-slate-400 self-center">비자:</span>
            {job.eligible_visas.map((visa, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
              >
                {visa}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 하단 급여 & 위치 및 바로가기 */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <Banknote className="w-4 h-4" />
            <span>{job.salary_amount}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{job.region_sido} {job.region_detail || ''}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <a
            href={`tel:${job.contact_phone || '064-711-8578'}`}
            className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            전화 문의
          </a>
          <Link
            href={`/jobs/${job.id}`}
            className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center justify-center gap-1 shadow-sm"
          >
            <span>상세보기</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
