import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Vercel Cron Job 또는 외부 무료 핑 서비스가 주기적으로 호출하는 Keep-Alive 엔드포인트
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ ok: false, message: 'Supabase client not initialized' }, { status: 500 });
    }

    // Supabase DB에 가장 가벼운 핑 쿼리 실행 (1개의 레코드 카운트 조회)
    const { count, error } = await supabase
      .from('roksan_members')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      message: 'Supabase keep-alive ping successful! Database is active.',
      member_count: count
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
