import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function YoutubeForStudyPage() {
  const { t } = useLanguage();

  usePageMeta(t('youtubeForStudy.pageTitle'), t('youtubeForStudy.pageDesc'));

  const steps = [
    { title: t('youtubeForStudy.s2Step1Title'), desc: t('youtubeForStudy.s2Step1Desc') },
    { title: t('youtubeForStudy.s2Step2Title'), desc: t('youtubeForStudy.s2Step2Desc') },
    { title: t('youtubeForStudy.s2Step3Title'), desc: t('youtubeForStudy.s2Step3Desc') },
    { title: t('youtubeForStudy.s2Step4Title'), desc: t('youtubeForStudy.s2Step4Desc') },
    { title: t('youtubeForStudy.s2Step5Title'), desc: t('youtubeForStudy.s2Step5Desc') },
  ];

  const subjects = [
    { title: t('youtubeForStudy.s3C1Title'), desc: t('youtubeForStudy.s3C1Desc'), icon: '💻' },
    { title: t('youtubeForStudy.s3C2Title'), desc: t('youtubeForStudy.s3C2Desc'), icon: '🗣️' },
    { title: t('youtubeForStudy.s3C3Title'), desc: t('youtubeForStudy.s3C3Desc'), icon: '📋' },
    { title: t('youtubeForStudy.s3C4Title'), desc: t('youtubeForStudy.s3C4Desc'), icon: '💰' },
  ];

  const focusTips = [
    { title: t('youtubeForStudy.s4T1Title'), desc: t('youtubeForStudy.s4T1Desc') },
    { title: t('youtubeForStudy.s4T2Title'), desc: t('youtubeForStudy.s4T2Desc') },
    { title: t('youtubeForStudy.s4T3Title'), desc: t('youtubeForStudy.s4T3Desc') },
  ];

  const mistakes = [
    t('youtubeForStudy.s5Mis1'),
    t('youtubeForStudy.s5Mis2'),
    t('youtubeForStudy.s5Mis3'),
    t('youtubeForStudy.s5Mis4'),
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('youtubeForStudy.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{t('youtubeForStudy.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('youtubeForStudy.intro')}</p>

      {/* 혼공이 어려운 이유 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('youtubeForStudy.s1Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('youtubeForStudy.s1P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('youtubeForStudy.s1P2')}</p>
      </section>

      {/* 5단계 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeForStudy.s2Title')}</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 과목별 전략 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeForStudy.s3Title')}</h2>
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

      {/* 집중력 팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeForStudy.s4Title')}</h2>
        <div className="space-y-4">
          {focusTips.map((tip, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 흔한 실수 */}
      <section className="mb-10 rounded-2xl border border-amber-100 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">{t('youtubeForStudy.s5Title')}</h2>
        <ul className="space-y-3">
          {mistakes.map((m, i) => (
            <li key={i} className="text-slate-600 text-sm leading-relaxed">{m}</li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('youtubeForStudy.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeForStudy.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('youtubeForStudy.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
