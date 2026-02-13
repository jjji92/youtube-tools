import { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

const PlaylistCalculatorPage = lazy(() => import('./pages/PlaylistCalculatorPage'));
const MultiVideoCalculatorPage = lazy(() => import('./pages/MultiVideoCalculatorPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

const NAV_ITEMS = [
  { to: '/', label: '재생목록 계산' },
  { to: '/multi', label: '영상 합산' },
  { to: '/guide', label: '가이드' },
  { to: '/faq', label: 'FAQ' },
];

function Loading() {
  return <div className="text-center py-12 text-slate-400">로딩 중...</div>;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-red-600 hover:text-red-700 shrink-0">
            YT 재생시간
          </Link>
          <nav className="flex gap-1 overflow-x-auto ml-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                  location.pathname === item.to
                    ? 'bg-red-50 text-red-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-8">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<PlaylistCalculatorPage />} />
            <Route path="/multi" element={<MultiVideoCalculatorPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-slate-500">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3">
            <Link to="/" className="hover:text-slate-700">재생목록 계산</Link>
            <Link to="/multi" className="hover:text-slate-700">영상 합산</Link>
            <Link to="/guide" className="hover:text-slate-700">가이드</Link>
            <Link to="/faq" className="hover:text-slate-700">FAQ</Link>
            <Link to="/about" className="hover:text-slate-700">소개</Link>
            <Link to="/terms" className="hover:text-slate-700">이용약관</Link>
            <Link to="/privacy" className="hover:text-slate-700">개인정보처리방침</Link>
          </div>
          <p className="text-slate-400">&copy; 2026 유튜브 재생시간 계산기. YouTube와 관련이 없는 독립 서비스입니다.</p>
        </div>
      </footer>
    </div>
  );
}
