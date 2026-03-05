import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function PlaylistStudyPage() {
  const { t } = useLanguage();

  usePageMeta(t('playlistStudy.pageTitle'), t('playlistStudy.pageDesc'));

  const steps = [
    { title: t('playlistStudy.s2Step1Title'), desc: t('playlistStudy.s2Step1Desc') },
    { title: t('playlistStudy.s2Step2Title'), desc: t('playlistStudy.s2Step2Desc') },
    { title: t('playlistStudy.s2Step3Title'), desc: t('playlistStudy.s2Step3Desc') },
    { title: t('playlistStudy.s2Step4Title'), desc: t('playlistStudy.s2Step4Desc') },
  ];

  const cards = [
    { title: t('playlistStudy.s3Card1Title'), desc: t('playlistStudy.s3Card1Desc'), icon: '💻' },
    { title: t('playlistStudy.s3Card2Title'), desc: t('playlistStudy.s3Card2Desc'), icon: '🌐' },
    { title: t('playlistStudy.s3Card3Title'), desc: t('playlistStudy.s3Card3Desc'), icon: '🎓' },
  ];

  const timeTips = [
    t('playlistStudy.s4Tip1'),
    t('playlistStudy.s4Tip2'),
    t('playlistStudy.s4Tip3'),
    t('playlistStudy.s4Tip4'),
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('playlistStudy.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{t('playlistStudy.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('playlistStudy.intro')}</p>

      {/* 섹션 1 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('playlistStudy.s1Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('playlistStudy.s1P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('playlistStudy.s1P2')}</p>
      </section>

      {/* 섹션 2: 재생목록 구성법 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('playlistStudy.s2Title')}</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 3: 장르별 활용법 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('playlistStudy.s3Title')}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-2xl mb-3 block">{card.icon}</span>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">{card.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 4: 시간 관리 팁 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('playlistStudy.s4Title')}</h2>
        <ul className="space-y-3">
          {timeTips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('playlistStudy.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('playlistStudy.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('playlistStudy.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
