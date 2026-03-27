import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function YoutubeShortcutsPage() {
  const { t } = useLanguage();

  usePageMeta(t('youtubeShortcuts.pageTitle'), t('youtubeShortcuts.pageDesc'));

  const playbackKeys = [
    [t('youtubeShortcuts.s1k1key'), t('youtubeShortcuts.s1k1desc')],
    [t('youtubeShortcuts.s1k2key'), t('youtubeShortcuts.s1k2desc')],
    [t('youtubeShortcuts.s1k3key'), t('youtubeShortcuts.s1k3desc')],
    [t('youtubeShortcuts.s1k4key'), t('youtubeShortcuts.s1k4desc')],
    [t('youtubeShortcuts.s1k5key'), t('youtubeShortcuts.s1k5desc')],
    [t('youtubeShortcuts.s1k6key'), t('youtubeShortcuts.s1k6desc')],
  ];

  const speedKeys = [
    [t('youtubeShortcuts.s2k1key'), t('youtubeShortcuts.s2k1desc')],
    [t('youtubeShortcuts.s2k2key'), t('youtubeShortcuts.s2k2desc')],
    [t('youtubeShortcuts.s2k3key'), t('youtubeShortcuts.s2k3desc')],
    [t('youtubeShortcuts.s2k4key'), t('youtubeShortcuts.s2k4desc')],
  ];

  const screenKeys = [
    [t('youtubeShortcuts.s3k1key'), t('youtubeShortcuts.s3k1desc')],
    [t('youtubeShortcuts.s3k2key'), t('youtubeShortcuts.s3k2desc')],
    [t('youtubeShortcuts.s3k3key'), t('youtubeShortcuts.s3k3desc')],
    [t('youtubeShortcuts.s3k4key'), t('youtubeShortcuts.s3k4desc')],
    [t('youtubeShortcuts.s3k5key'), t('youtubeShortcuts.s3k5desc')],
    [t('youtubeShortcuts.s3k6key'), t('youtubeShortcuts.s3k6desc')],
  ];

  const proTips = [
    { title: t('youtubeShortcuts.s4Tip1Title'), desc: t('youtubeShortcuts.s4Tip1Desc') },
    { title: t('youtubeShortcuts.s4Tip2Title'), desc: t('youtubeShortcuts.s4Tip2Desc') },
    { title: t('youtubeShortcuts.s4Tip3Title'), desc: t('youtubeShortcuts.s4Tip3Desc') },
  ];

  const KeyTable = ({ rows }: { rows: string[][] }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([key, desc], i) => (
            <tr key={i} className="border-b border-slate-50">
              <td className="py-3 pr-4 w-44">
                <kbd className="inline-block bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded text-xs border border-slate-200">
                  {key}
                </kbd>
              </td>
              <td className="py-3 text-slate-600">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('youtubeShortcuts.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{t('youtubeShortcuts.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('youtubeShortcuts.intro')}</p>

      {/* 기본 재생 단축키 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">{t('youtubeShortcuts.s1Title')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeShortcuts.s1Desc')}</p>
        <KeyTable rows={playbackKeys} />
      </section>

      {/* 배속 & 볼륨 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">{t('youtubeShortcuts.s2Title')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeShortcuts.s2Desc')}</p>
        <KeyTable rows={speedKeys} />
      </section>

      {/* 화면 & 자막 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('youtubeShortcuts.s3Title')}</h2>
        <KeyTable rows={screenKeys} />
      </section>

      {/* 꿀팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('youtubeShortcuts.s4Title')}</h2>
        <div className="space-y-4">
          {proTips.map((tip, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('youtubeShortcuts.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('youtubeShortcuts.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('youtubeShortcuts.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
