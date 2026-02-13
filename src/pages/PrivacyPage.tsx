import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  usePageMeta(
    t('privacy.pageTitle'),
    t('privacy.pageDesc'),
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('privacy.heading')}</h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-6 text-slate-600 leading-relaxed">
        <p>{t('common.effectiveDate')}</p>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('privacy.s1Title')}
          </h2>
          <p>{t('privacy.s1Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('privacy.s2Title')}
          </h2>
          <p>{t('privacy.s2Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('privacy.s3Title')}
          </h2>
          <p>
            {t('privacy.s3Text1')}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:underline"
            >
              {t('privacy.s3Link')}
            </a>
            {t('privacy.s3Text2')}
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('privacy.s4Title')}
          </h2>
          <p>{t('privacy.s4Text')}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            {t('privacy.s5Title')}
          </h2>
          <p>{t('privacy.s5Text')}</p>
        </section>
      </div>
    </div>
  );
}
