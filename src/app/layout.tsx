import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';

export const metadata: Metadata = {
  title: '록산에버그린(주) - 외국인·내국인 일자리 매칭 & 비자 발급 대행',
  description: '외국인 일자리 취업 알선, E7, E9, D2, F4 비자 발급 및 행정 대행, 호텔 룸메이드, 제조업, 유학생 아르바이트 종합 인력 플랫폼',
  keywords: 'foreign job, 비자발급대행, 외국인일자리, 호텔룸메이드, E7비자, F4비자, 유학생알바, 록산에버그린',
  openGraph: {
    title: '록산에버그린(주) - 글로벌 인력 매칭 플랫폼',
    description: '호텔/리조트, 제조업, 비자 행정 대행 전문',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <LanguageProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActionButtons />
        </LanguageProvider>
      </body>
    </html>
  );
}
