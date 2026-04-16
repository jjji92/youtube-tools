import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function OnlineCoursesTipsPage() {
  const { t } = useLanguage();

  usePageMeta(t('onlineCourseTips.pageTitle'), t('onlineCourseTips.pageDesc'));

  const planRows = [
    t('onlineCourseTips.s9Row1'),
    t('onlineCourseTips.s9Row2'),
    t('onlineCourseTips.s9Row3'),
  ];

  const methods = [
    {
      num: 1,
      title: t('onlineCourseTips.s2Title'),
      p1: t('onlineCourseTips.s2P1'),
      p2: t('onlineCourseTips.s2P2'),
      color: 'border-red-100 bg-red-50',
    },
    {
      num: 2,
      title: t('onlineCourseTips.s3Title'),
      p1: t('onlineCourseTips.s3P1'),
      p2: t('onlineCourseTips.s3P2'),
      color: 'border-blue-100 bg-blue-50',
    },
    {
      num: 3,
      title: t('onlineCourseTips.s4Title'),
      p1: t('onlineCourseTips.s4P1'),
      p2: t('onlineCourseTips.s4P2'),
      color: 'border-violet-100 bg-violet-50',
    },
    {
      num: 4,
      title: t('onlineCourseTips.s5Title'),
      p1: t('onlineCourseTips.s5P1'),
      p2: t('onlineCourseTips.s5P2'),
      color: 'border-emerald-100 bg-emerald-50',
    },
    {
      num: 5,
      title: t('onlineCourseTips.s6Title'),
      p1: t('onlineCourseTips.s6P1'),
      p2: t('onlineCourseTips.s6P2'),
      color: 'border-amber-100 bg-amber-50',
    },
    {
      num: 6,
      title: t('onlineCourseTips.s7Title'),
      p1: t('onlineCourseTips.s7P1'),
      p2: t('onlineCourseTips.s7P2'),
      color: 'border-slate-200 bg-white',
    },
    {
      num: 7,
      title: t('onlineCourseTips.s8Title'),
      p1: t('onlineCourseTips.s8P1'),
      p2: t('onlineCourseTips.s8P2'),
      color: 'border-slate-200 bg-white',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('onlineCourseTips.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
        {t('onlineCourseTips.heading')}
      </h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('onlineCourseTips.intro')}</p>

      {/* 섹션 1: 왜 어려운가 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('onlineCourseTips.s1Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('onlineCourseTips.s1P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('onlineCourseTips.s1P2')}</p>
      </section>

      {/* 7가지 방법 */}
      <div className="space-y-5 mb-10">
        {methods.map((method) => (
          <section
            key={method.num}
            className={`rounded-2xl border ${method.color} p-6 shadow-sm`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                {method.num}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{method.title}</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-3 text-sm">{method.p1}</p>
            <p className="text-slate-600 leading-relaxed text-sm">{method.p2}</p>
          </section>
        ))}
      </div>

      {/* 실전 플랜 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">{t('onlineCourseTips.s9Title')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('onlineCourseTips.s9Desc')}</p>
        <div className="space-y-3">
          {planRows.map((row, i) => (
            <div key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="flex-shrink-0 bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-xs mt-0.5 whitespace-nowrap">
                {i + 1}주차
              </span>
              <span>{row}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('onlineCourseTips.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('onlineCourseTips.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('onlineCourseTips.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
