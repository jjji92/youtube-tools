import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  usePageMeta(
    t('about.pageTitle'),
    t('about.pageDesc'),
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('about.heading')}</h1>

      <div className="space-y-6">
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            {t('about.whatIsTitle')}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            {t('about.whatIsP1')}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {t('about.whatIsP2')}
          </p>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">{t('about.featuresTitle')}</h2>
          <ul className="text-slate-600 space-y-2">
            {(['feature1', 'feature2', 'feature3', 'feature4', 'feature5'] as const).map((key) => (
              <li key={key} className="flex gap-2">
                <span className="text-red-500 shrink-0">&#10003;</span>
                <span>{t(`about.${key}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            {t('about.techTitle')}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-2">
            {t('about.techP1')}
          </p>
          <p className="text-slate-600 leading-relaxed">
            {t('about.techP2')}
          </p>
        </section>

        <div className="text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            {t('about.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
