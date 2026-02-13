import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  usePageMeta(
    t('terms.pageTitle'),
    t('terms.pageDesc'),
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('terms.heading')}</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-6 text-slate-600 leading-relaxed">
        <p>{t('common.effectiveDate')}</p>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('terms.s1Title')}
          </h2>
          <p>{t('terms.s1Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('terms.s2Title')}
          </h2>
          <p>{t('terms.s2Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('terms.s3Title')}
          </h2>
          <p>{t('terms.s3Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('terms.s4Title')}
          </h2>
          <p>{t('terms.s4Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('terms.s5Title')}
          </h2>
          <p>{t('terms.s5Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('terms.s6Title')}
          </h2>
          <p>{t('terms.s6Text')}</p>
        </section>
      </div>
    </div>
  );
}
