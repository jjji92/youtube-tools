import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function GuidePage() {
  const { t } = useLanguage();

  usePageMeta(
    t('guide.pageTitle'),
    t('guide.pageDesc'),
  );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('guide.heading')}</h1>

      <div className="space-y-8">
        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t('guide.section1Title')}
          </h2>
          <ol className="text-slate-600 space-y-3 list-decimal list-inside">
            <li>
              {t('guide.section1Step1')}
              <p className="text-sm text-slate-400 ml-5 mt-1">
                {t('guide.section1Step1Hint')}
              </p>
            </li>
            <li>{t('guide.section1Step2')}</li>
            <li>
              <Link to="/" className="text-red-600 hover:underline">{t('guide.section1Step3Link')}</Link>
              {t('guide.section1Step3Suffix')}
            </li>
            <li>{t('guide.section1Step4')}</li>
          </ol>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t('guide.section2Title')}
          </h2>
          <ol className="text-slate-600 space-y-3 list-decimal list-inside">
            <li>{t('guide.section2Step1')}</li>
            <li>
              <Link to="/multi" className="text-red-600 hover:underline">{t('guide.section2Step2Link')}</Link>
              {t('guide.section2Step2Suffix')}
            </li>
            <li>{t('guide.section2Step3')}</li>
            <li>{t('guide.section2Step4')}</li>
          </ol>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t('guide.urlFormatsTitle')}
          </h2>
          <div className="space-y-2 text-sm font-mono text-slate-600">
            <p className="text-base font-sans font-medium text-slate-700 mb-3">{t('guide.urlPlaylist')}</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/playlist?list=PLxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/watch?v=xxx&list=PLxxxxxx</p>

            <p className="text-base font-sans font-medium text-slate-700 mt-4 mb-3">{t('guide.urlVideo')}</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/watch?v=xxxxxxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://youtu.be/xxxxxxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/shorts/xxxxxxxxxxx</p>
            <p className="bg-slate-50 p-2 rounded">https://www.youtube.com/embed/xxxxxxxxxxx</p>
          </div>
        </section>

        <section className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {t('guide.speedTitle')}
          </h2>
          <p className="text-slate-600 mb-3">
            {t('guide.speedDesc')}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-4 text-slate-500">{t('guide.speedColSpeed')}</th>
                  <th className="py-2 text-slate-500">{t('guide.speedColTime')}</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr className="border-b"><td className="py-2 pr-4">1x</td><td>60{t('guide.speedMin')}</td></tr>
                <tr className="border-b"><td className="py-2 pr-4">1.25x</td><td>48{t('guide.speedMin')}</td></tr>
                <tr className="border-b"><td className="py-2 pr-4">1.5x</td><td>40{t('guide.speedMin')}</td></tr>
                <tr className="border-b"><td className="py-2 pr-4">1.75x</td><td>{t('guide.speedAbout')} 34{t('guide.speedMin')}</td></tr>
                <tr><td className="py-2 pr-4">2x</td><td>30{t('guide.speedMin')}</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
