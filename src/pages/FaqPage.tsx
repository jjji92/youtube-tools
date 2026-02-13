import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

const FAQ_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;

export default function FaqPage() {
  const { t } = useLanguage();

  usePageMeta(
    t('faq.pageTitle'),
    t('faq.pageDesc'),
  );

  const faqs = FAQ_KEYS.map((n) => ({
    q: t(`faq.q${n}` as 'faq.q1'),
    a: t(`faq.a${n}` as 'faq.a1'),
  }));

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('faq.heading')}</h1>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="rounded-lg border bg-white shadow-sm group">
            <summary className="p-4 cursor-pointer font-medium text-slate-900 hover:bg-slate-50 transition-colors list-none flex items-center justify-between">
              <span>{faq.q}</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform">&blacktriangledown;</span>
            </summary>
            <div className="px-4 pb-4 text-slate-600 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-lg border bg-white shadow-sm text-center">
        <p className="text-slate-600 mb-3">{t('faq.otherQuestions')}</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/guide"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            {t('faq.viewGuide')}
          </Link>
          <Link
            to="/"
            className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm text-slate-700"
          >
            {t('faq.goToCalc')}
          </Link>
        </div>
      </div>

      {/* FAQ 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
