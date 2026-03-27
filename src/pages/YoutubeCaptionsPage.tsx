import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function YoutubeCaptionsPage() {
  const { t } = useLanguage();

  usePageMeta(t('youtubeCaptions.pageTitle'), t('youtubeCaptions.pageDesc'));

  const steps = [
    t('youtubeCaptions.s1Step1'),
    t('youtubeCaptions.s1Step2'),
    t('youtubeCaptions.s1Step3'),
    t('youtubeCaptions.s1Step4'),
  ];

  const learningCards = [
    { title: t('youtubeCaptions.s3Card1Title'), desc: t('youtubeCaptions.s3Card1Desc'), icon: '🗣️' },
    { title: t('youtubeCaptions.s3Card2Title'), desc: t('youtubeCaptions.s3Card2Desc'), icon: '🔤' },
    { title: t('youtubeCaptions.s3Card3Title'), desc: t('youtubeCaptions.s3Card3Desc'), icon: '📝' },
  ];

  const tips = [
    t('youtubeCaptions.s4Tip1'),
    t('youtubeCaptions.s4Tip2'),
    t('youtubeCaptions.s4Tip3'),
    t('youtubeCaptions.s4Tip4'),
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('youtubeCaptions.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{t('youtubeCaptions.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('youtubeCaptions.intro')}</p>

      {/* 섹션 1: 자막 켜는 방법 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeCaptions.s1Title')}</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4 text-sm text-slate-600 leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 섹션 2: 자동 번역 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('youtubeCaptions.s2Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('youtubeCaptions.s2P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('youtubeCaptions.s2P2')}</p>
      </section>

      {/* 섹션 3: 외국어 학습 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeCaptions.s3Title')}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {learningCards.map((card, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-2xl mb-3 block">{card.icon}</span>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">{card.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 4: 팁 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeCaptions.s4Title')}</h2>
        <ul className="space-y-3">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('youtubeCaptions.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeCaptions.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('youtubeCaptions.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
