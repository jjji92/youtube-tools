import { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useLanguage } from './i18n/LanguageContext';

const PlaylistCalculatorPage = lazy(() => import('./pages/PlaylistCalculatorPage'));
const MultiVideoCalculatorPage = lazy(() => import('./pages/MultiVideoCalculatorPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

export default function App() {
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const NAV_ITEMS = [
    { to: '/', label: t('nav.playlist') },
    { to: '/multi', label: t('nav.multi') },
    { to: '/guide', label: t('nav.guide') },
    { to: '/faq', label: t('nav.faq') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-red-600 hover:text-red-700 shrink-0">
            {t('nav.brand')}
          </Link>
          <div className="flex items-center gap-1 ml-4">
            <nav className="flex gap-1 overflow-x-auto">
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
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="ml-2 flex items-center gap-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
              aria-label="Toggle language"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.559" />
              </svg>
              <span className="font-medium">{lang === 'ko' ? 'EN' : 'KO'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-8">
        <Suspense fallback={<div className="text-center py-12 text-slate-400">{t('common.loading')}</div>}>
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
            <Link to="/" className="hover:text-slate-700">{t('nav.playlist')}</Link>
            <Link to="/multi" className="hover:text-slate-700">{t('nav.multi')}</Link>
            <Link to="/guide" className="hover:text-slate-700">{t('nav.guide')}</Link>
            <Link to="/faq" className="hover:text-slate-700">{t('nav.faq')}</Link>
            <Link to="/about" className="hover:text-slate-700">{t('nav.about')}</Link>
            <Link to="/terms" className="hover:text-slate-700">{t('nav.terms')}</Link>
            <Link to="/privacy" className="hover:text-slate-700">{t('nav.privacy')}</Link>
          </div>
          <p className="text-slate-400">{t('common.footer')}</p>
        </div>
      </footer>
    </div>
  );
}
