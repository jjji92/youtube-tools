import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function StudySchedulePage() {
  const { t } = useLanguage();

  usePageMeta(t('studySchedule.pageTitle'), t('studySchedule.pageDesc'));

  const steps = [
    { title: t('studySchedule.s2Step1Title'), desc: t('studySchedule.s2Step1Desc') },
    { title: t('studySchedule.s2Step2Title'), desc: t('studySchedule.s2Step2Desc') },
    { title: t('studySchedule.s2Step3Title'), desc: t('studySchedule.s2Step3Desc') },
    { title: t('studySchedule.s2Step4Title'), desc: t('studySchedule.s2Step4Desc') },
    { title: t('studySchedule.s2Step5Title'), desc: t('studySchedule.s2Step5Desc') },
  ];

  const tableRows = [
    [t('studySchedule.s3Row1deadline'), t('studySchedule.s3Row1daily')],
    [t('studySchedule.s3Row2deadline'), t('studySchedule.s3Row2daily')],
    [t('studySchedule.s3Row3deadline'), t('studySchedule.s3Row3daily')],
  ];

  const tips = [
    t('studySchedule.s4Tip1'),
    t('studySchedule.s4Tip2'),
    t('studySchedule.s4Tip3'),
    t('studySchedule.s4Tip4'),
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/tips" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">
        {t('studySchedule.backLink')}
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">{t('studySchedule.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('studySchedule.intro')}</p>

      {/* 섹션 1: 왜 필요한가 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">{t('studySchedule.s1Title')}</h2>
        <p className="text-slate-600 leading-relaxed mb-3">{t('studySchedule.s1P1')}</p>
        <p className="text-slate-600 leading-relaxed">{t('studySchedule.s1P2')}</p>
      </section>

      {/* 섹션 2: 5단계 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('studySchedule.s2Title')}</h2>
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

      {/* 섹션 3: 실전 예시 표 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">{t('studySchedule.s3Title')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('studySchedule.s3Desc')}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 pr-4 font-semibold text-slate-700">{t('studySchedule.s3ColDeadline')}</th>
                <th className="text-left py-2 font-semibold text-slate-700">{t('studySchedule.s3ColDaily')}</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map(([deadline, daily], i) => (
                <tr key={i} className="border-b border-slate-50">
                  <td className="py-3 pr-4">
                    <span className="inline-block bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded text-sm">
                      {deadline}
                    </span>
                  </td>
                  <td className="py-3 text-slate-700 font-medium">{daily}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 섹션 4: 팁 */}
      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-5">{t('studySchedule.s4Title')}</h2>
        <ul className="space-y-3">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('studySchedule.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('studySchedule.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('studySchedule.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
