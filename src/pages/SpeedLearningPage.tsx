import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function SpeedLearningPage() {
  const { lang, t } = useLanguage();

  usePageMeta(t('speedLearning.pageTitle'), t('speedLearning.pageDesc'));

  const speedRows = [
    [t('speedLearning.s2Row1Speed'), t('speedLearning.s2Row1Desc')],
    [t('speedLearning.s2Row2Speed'), t('speedLearning.s2Row2Desc')],
    [t('speedLearning.s2Row3Speed'), t('speedLearning.s2Row3Desc')],
    [t('speedLearning.s2Row4Speed'), t('speedLearning.s2Row4Desc')],
    [t('speedLearning.s2Row5Speed'), t('speedLearning.s2Row5Desc')],
  ];

  const tips = [
    { title: t('speedLearning.s3Tip1Title'), desc: t('speedLearning.s3Tip1Desc') },
    { title: t('speedLearning.s3Tip2Title'), desc: t('speedLearning.s3Tip2Desc') },
    { title: t('speedLearning.s3Tip3Title'), desc: t('speedLearning.s3Tip3Desc') },
    { title: t('speedLearning.s3Tip4Title'), desc: t('speedLearning.s3Tip4Desc') },
  ];

  const timeRows = lang === 'ko'
    ? [
        ['1.0x', '10시간 0분', '—'],
        ['1.25x', '8시간 0분', '2시간 절약'],
        ['1.5x', '6시간 40분', '3시간 20분 절약'],
        ['1.75x', '5시간 43분', '4시간 17분 절약'],
        ['2.0x', '5시간 0분', '5시간 절약'],
      ]
    : [
        ['1.0x', '10h 0m', '—'],
        ['1.25x', '8h 0m', 'Save 2h'],
        ['1.5x', '6h 40m', 'Save 3h 20m'],
        ['1.75x', '5h 43m', 'Save 4h 17m'],
        ['2.0x', '5h 0m', 'Save 5h'],
      ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('speedLearning.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{t('speedLearning.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('speedLearning.intro')}</p>

      {/* 섹션 1 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('speedLearning.s1Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('speedLearning.s1P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('speedLearning.s1P2')}</p>
      </section>

      {/* 섹션 2: 추천 배속 표 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('speedLearning.s2Title')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 pr-4 font-semibold text-slate-700 w-20">{t('speedLearning.s4ColSpeed')}</th>
                <th className="text-left py-2 font-semibold text-slate-700">{t('guide.section1Step1')}</th>
              </tr>
            </thead>
            <tbody>
              {speedRows.map(([speed, desc]) => (
                <tr key={speed} className="border-b border-slate-50">
                  <td className="py-3 pr-4">
                    <span className="inline-block bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-sm">
                      {speed}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 3: 팁 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('speedLearning.s3Title')}</h2>
        <div className="space-y-4">
          {tips.map((tip, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 섹션 4: 시간 절약 표 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">{t('speedLearning.s4Title')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('speedLearning.s4Desc')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 pr-4 font-semibold text-slate-700">{t('speedLearning.s4ColSpeed')}</th>
                <th className="text-left py-2 pr-4 font-semibold text-slate-700">{t('speedLearning.s4ColTime')}</th>
                <th className="text-left py-2 font-semibold text-slate-700">{t('speedLearning.s4ColSave')}</th>
              </tr>
            </thead>
            <tbody>
              {timeRows.map((row, i) => (
                <tr key={i} className={`border-b border-slate-50 ${i === 0 ? 'text-slate-400' : 'text-slate-700'}`}>
                  <td className="py-3 pr-4 font-bold">{row[0]}</td>
                  <td className="py-3 pr-4">{row[1]}</td>
                  <td className={`py-3 font-medium ${i > 0 ? 'text-green-600' : ''}`}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 5: 주의사항 */}
      <section className="mb-10 rounded-2xl border border-amber-100 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-3">{t('speedLearning.s5Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3 text-sm">{t('speedLearning.s5P1')}</p>
        <p className="text-slate-600 leading-relaxed text-sm">{t('speedLearning.s5P2')}</p>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('speedLearning.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('speedLearning.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('speedLearning.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
