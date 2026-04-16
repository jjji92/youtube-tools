import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function YoutubeCompleteGuidePage() {
  const { t } = useLanguage();

  usePageMeta(t('youtubeCompleteGuide.pageTitle'), t('youtubeCompleteGuide.pageDesc'));

  const channelCriteria = [
    { title: t('youtubeCompleteGuide.s2C1Title'), desc: t('youtubeCompleteGuide.s2C1Desc') },
    { title: t('youtubeCompleteGuide.s2C2Title'), desc: t('youtubeCompleteGuide.s2C2Desc') },
    { title: t('youtubeCompleteGuide.s2C3Title'), desc: t('youtubeCompleteGuide.s2C3Desc') },
  ];

  const tripleCombo = [
    { title: t('youtubeCompleteGuide.s3Step1Title'), desc: t('youtubeCompleteGuide.s3Step1Desc') },
    { title: t('youtubeCompleteGuide.s3Step2Title'), desc: t('youtubeCompleteGuide.s3Step2Desc') },
    { title: t('youtubeCompleteGuide.s3Step3Title'), desc: t('youtubeCompleteGuide.s3Step3Desc') },
  ];

  const focusTips = [
    { title: t('youtubeCompleteGuide.s4T1Title'), desc: t('youtubeCompleteGuide.s4T1Desc') },
    { title: t('youtubeCompleteGuide.s4T2Title'), desc: t('youtubeCompleteGuide.s4T2Desc') },
    { title: t('youtubeCompleteGuide.s4T3Title'), desc: t('youtubeCompleteGuide.s4T3Desc') },
  ];

  const traps = [
    { title: t('youtubeCompleteGuide.s6T1Title'), desc: t('youtubeCompleteGuide.s6T1Desc') },
    { title: t('youtubeCompleteGuide.s6T2Title'), desc: t('youtubeCompleteGuide.s6T2Desc') },
    { title: t('youtubeCompleteGuide.s6T3Title'), desc: t('youtubeCompleteGuide.s6T3Desc') },
  ];

  const routineSteps = [
    t('youtubeCompleteGuide.s7Step1'),
    t('youtubeCompleteGuide.s7Step2'),
    t('youtubeCompleteGuide.s7Step3'),
    t('youtubeCompleteGuide.s7Step4'),
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('youtubeCompleteGuide.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
        {t('youtubeCompleteGuide.heading')}
      </h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('youtubeCompleteGuide.intro')}</p>

      {/* 섹션 1: 왜 유튜브인가 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('youtubeCompleteGuide.s1Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('youtubeCompleteGuide.s1P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('youtubeCompleteGuide.s1P2')}</p>
      </section>

      {/* 섹션 2: 좋은 채널 찾기 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeCompleteGuide.s2Title')}</h2>
        <div className="space-y-4">
          {channelCriteria.map((item, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 3: 3종 세트 */}
      <section className="mb-10 rounded-2xl border border-red-100 bg-red-50 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-3">{t('youtubeCompleteGuide.s3Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-5 text-sm">{t('youtubeCompleteGuide.s3P1')}</p>
        <div className="space-y-4">
          {tripleCombo.map((step, i) => (
            <div key={i} className="rounded-xl bg-white border border-red-100 p-4">
              <h3 className="font-bold text-slate-900 mb-1 text-sm">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 4: 집중 환경 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeCompleteGuide.s4Title')}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {focusTips.map((tip, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2 text-sm">{tip.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 5: 액티브 러닝 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('youtubeCompleteGuide.s5Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('youtubeCompleteGuide.s5P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('youtubeCompleteGuide.s5P2')}</p>
      </section>

      {/* 섹션 6: 함정 */}
      <section className="mb-10 rounded-2xl border border-amber-100 bg-amber-50 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeCompleteGuide.s6Title')}</h2>
        <div className="space-y-4">
          {traps.map((trap, i) => (
            <div key={i} className="rounded-xl bg-white border border-amber-100 p-4">
              <h3 className="font-bold text-slate-900 mb-1 text-sm">{trap.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{trap.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 7: 실전 루틴 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">{t('youtubeCompleteGuide.s7Title')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeCompleteGuide.s7Desc')}</p>
        <div className="space-y-3">
          {routineSteps.map((step, i) => (
            <div key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('youtubeCompleteGuide.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeCompleteGuide.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('youtubeCompleteGuide.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
