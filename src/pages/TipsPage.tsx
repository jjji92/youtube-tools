import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import { useLanguage } from '../i18n/LanguageContext';

export default function TipsPage() {
  const { t } = useLanguage();

  usePageMeta(t('tips.pageTitle'), t('tips.pageDesc'));

  const cards = [
    {
      title: t('tips.card1Title'),
      desc: t('tips.card1Desc'),
      link: t('tips.card1Link'),
      icon: '⚡',
      color: 'from-red-50 to-orange-50 border-red-100',
      iconBg: 'bg-red-100 text-red-600',
    },
    {
      title: t('tips.card2Title'),
      desc: t('tips.card2Desc'),
      link: t('tips.card2Link'),
      icon: '📚',
      color: 'from-blue-50 to-indigo-50 border-blue-100',
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      title: t('tips.card3Title'),
      desc: t('tips.card3Desc'),
      link: t('tips.card3Link'),
      icon: '⌨️',
      color: 'from-violet-50 to-purple-50 border-violet-100',
      iconBg: 'bg-violet-100 text-violet-600',
    },
    {
      title: t('tips.card4Title'),
      desc: t('tips.card4Desc'),
      link: t('tips.card4Link'),
      icon: '💬',
      color: 'from-emerald-50 to-teal-50 border-emerald-100',
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      title: t('tips.card5Title'),
      desc: t('tips.card5Desc'),
      link: t('tips.card5Link'),
      icon: '📅',
      color: 'from-amber-50 to-yellow-50 border-amber-100',
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      title: t('tips.card6Title'),
      desc: t('tips.card6Desc'),
      link: t('tips.card6Link'),
      icon: '🎓',
      color: 'from-cyan-50 to-sky-50 border-cyan-100',
      iconBg: 'bg-cyan-100 text-cyan-600',
    },
    {
      title: t('tips.card7Title'),
      desc: t('tips.card7Desc'),
      link: t('tips.card7Link'),
      icon: '🏆',
      color: 'from-rose-50 to-pink-50 border-rose-100',
      iconBg: 'bg-rose-100 text-rose-600',
    },
    {
      title: t('tips.card8Title'),
      desc: t('tips.card8Desc'),
      link: t('tips.card8Link'),
      icon: '📖',
      color: 'from-teal-50 to-green-50 border-teal-100',
      iconBg: 'bg-teal-100 text-teal-600',
    },
    {
      title: t('tips.card9Title'),
      desc: t('tips.card9Desc'),
      link: t('tips.card9Link'),
      icon: '🔍',
      color: 'from-orange-50 to-amber-50 border-orange-100',
      iconBg: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">{t('tips.heading')}</h1>
      <p className="text-slate-500 leading-relaxed mb-10">{t('tips.intro')}</p>

      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {cards.map((card) => (
          <Link
            key={card.link}
            to={card.link}
            className={`rounded-2xl border bg-gradient-to-br ${card.color} p-6 hover:shadow-md transition-shadow group`}
          >
            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-xl mb-4 ${card.iconBg}`}>
              {card.icon}
            </span>
            <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
              {card.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            <span className="inline-block mt-4 text-sm font-medium text-red-600 group-hover:underline">
              자세히 보기 →
            </span>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-2">{t('tips.ctaTitle')}</h2>
        <p className="text-slate-500 text-sm mb-5">{t('tips.ctaDesc')}</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm"
        >
          {t('tips.ctaBtn')}
        </Link>
      </div>
    </div>
  );
}
