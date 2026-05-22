import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function YoutubeChannelGuidePage() {
  const { t } = useLanguage();

  usePageMeta(t('youtubeChannelGuide.pageTitle'), t('youtubeChannelGuide.pageDesc'));

  const checklist = [
    t('youtubeChannelGuide.s2C1'),
    t('youtubeChannelGuide.s2C2'),
    t('youtubeChannelGuide.s2C3'),
    t('youtubeChannelGuide.s2C4'),
    t('youtubeChannelGuide.s2C5'),
    t('youtubeChannelGuide.s2C6'),
  ];

  const subjects = [
    { title: t('youtubeChannelGuide.s3Card1Title'), desc: t('youtubeChannelGuide.s3Card1Desc'), icon: '💻' },
    { title: t('youtubeChannelGuide.s3Card2Title'), desc: t('youtubeChannelGuide.s3Card2Desc'), icon: '🗣️' },
    { title: t('youtubeChannelGuide.s3Card3Title'), desc: t('youtubeChannelGuide.s3Card3Desc'), icon: '📋' },
    { title: t('youtubeChannelGuide.s3Card4Title'), desc: t('youtubeChannelGuide.s3Card4Desc'), icon: '💰' },
  ];

  const avoidTypes = [
    { title: t('youtubeChannelGuide.s4T1Title'), desc: t('youtubeChannelGuide.s4T1Desc') },
    { title: t('youtubeChannelGuide.s4T2Title'), desc: t('youtubeChannelGuide.s4T2Desc') },
    { title: t('youtubeChannelGuide.s4T3Title'), desc: t('youtubeChannelGuide.s4T3Desc') },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('youtubeChannelGuide.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{t('youtubeChannelGuide.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('youtubeChannelGuide.intro')}</p>

      {/* 왜 채널 선택이 중요한가 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('youtubeChannelGuide.s1Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('youtubeChannelGuide.s1P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('youtubeChannelGuide.s1P2')}</p>
      </section>

      {/* 체크리스트 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeChannelGuide.s2Title')}</h2>
        <ul className="space-y-3">
          {checklist.map((item, i) => (
            <li key={i} className="text-slate-600 text-sm leading-relaxed">{item}</li>
          ))}
        </ul>
      </section>

      {/* 분야별 선별 기준 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeChannelGuide.s3Title')}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {subjects.map((s, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-2xl mb-3 block">{s.icon}</span>
              <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 피해야 할 채널 */}
      <section className="mb-10 rounded-2xl border border-red-100 bg-red-50 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-5">{t('youtubeChannelGuide.s4Title')}</h2>
        <div className="space-y-5">
          {avoidTypes.map((item, i) => (
            <div key={i}>
              <h3 className="font-bold text-slate-900 mb-1 text-sm">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 채널 발견하는 법 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('youtubeChannelGuide.s5Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3 text-sm">{t('youtubeChannelGuide.s5P1')}</p>
        <p className="text-slate-600 leading-relaxed mb-3 text-sm">{t('youtubeChannelGuide.s5P2')}</p>
        <p className="text-slate-600 leading-relaxed text-sm">{t('youtubeChannelGuide.s5P3')}</p>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('youtubeChannelGuide.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeChannelGuide.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('youtubeChannelGuide.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
