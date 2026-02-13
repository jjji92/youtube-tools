import { useState } from 'react';
import { usePageMeta } from '../utils/usePageMeta';
import { extractPlaylistId } from '../utils/urlParser';
import { fetchPlaylistVideoIds, fetchVideoDetails } from '../utils/youtubeApi';
import { formatDuration } from '../utils/duration';
import { useLanguage } from '../i18n/LanguageContext';
import type { VideoInfo } from '../types/youtube';

export default function PlaylistCalculatorPage() {
  const { lang, t } = useLanguage();

  usePageMeta(
    t('playlist.pageTitle'),
    t('playlist.pageDesc'),
  );

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [unavailableCount, setUnavailableCount] = useState(0);
  const [showVideos, setShowVideos] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVideos([]);
    setTotalSeconds(0);
    setSelectedSpeed(1);
    setUnavailableCount(0);
    setShowVideos(false);

    const playlistId = extractPlaylistId(url);
    if (!playlistId) {
      setError(t('playlist.invalidUrl'));
      return;
    }

    setLoading(true);
    try {
      const { videoIds, unavailableCount: unavail } =
        await fetchPlaylistVideoIds(playlistId);
      setUnavailableCount(unavail);

      if (videoIds.length === 0) {
        setError(t('common.noPlayableVideos'));
        return;
      }

      const details = await fetchVideoDetails(videoIds);
      const total = details.reduce((sum, v) => sum + v.durationSeconds, 0);

      setVideos(details);
      setTotalSeconds(total);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const lines = [
      `${t('playlist.copyTotal')}: ${videos.length}${t('common.videoCount')}`,
      `${t('playlist.copyTime')}: ${formatDuration(totalSeconds, lang)}`,
      `${selectedSpeed}x ${t('playlist.copySpeed')}: ${formatDuration(Math.round(totalSeconds / selectedSpeed), lang)}`,
    ].join('\n');

    await navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const adjustedSeconds = Math.round(totalSeconds / selectedSpeed);
  const avgSeconds =
    videos.length > 0
      ? Math.round(totalSeconds / videos.length / selectedSpeed)
      : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 입력 카드 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          {t('playlist.heading')}
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          {t('playlist.subtitle')}
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('playlist.label')}
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={t('playlist.placeholder')}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-base bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors mb-4"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('common.analyzing')}
              </span>
            ) : (
              t('playlist.submit')
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {totalSeconds > 0 && (
        <div className="mt-8 space-y-6">
          {/* 배속 슬라이더 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">
                {t('common.speed')}
              </h2>
              <span className="text-2xl font-bold text-slate-900">
                {selectedSpeed}x
              </span>
            </div>
            <div className="relative h-4 flex items-center">
              <div className="absolute inset-x-0 h-2 bg-slate-200 rounded-full" />
              <div
                className="absolute left-0 h-2 bg-red-100 rounded-full"
                style={{ width: `${((selectedSpeed - 0.25) / 3.75) * 100}%` }}
              />
              <div
                className="absolute w-4 h-4 bg-red-600 rounded-full shadow-md -translate-x-1/2 pointer-events-none z-10"
                style={{ left: `${((selectedSpeed - 0.25) / 3.75) * 100}%` }}
              />
              <input
                type="range"
                min="0.25"
                max="4"
                step="0.25"
                value={selectedSpeed}
                onChange={(e) => setSelectedSpeed(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
            </div>
            <div className="relative mt-3 h-4 text-xs text-slate-400">
              <span className="absolute left-0">0.25x</span>
              <span className="absolute -translate-x-1/2" style={{ left: '20%' }}>1x</span>
              <span className="absolute -translate-x-1/2" style={{ left: '46.67%' }}>2x</span>
              <span className="absolute -translate-x-1/2" style={{ left: '73.33%' }}>3x</span>
              <span className="absolute right-0">4x</span>
            </div>
          </div>

          {/* 분석 결과 통계 카드 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-900">
                {t('common.results')}
              </h2>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500"
              >
                {copied ? t('common.copied') : t('common.copyResult')}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-red-50 p-5 text-center">
                <p className="text-xs font-medium text-red-400 mb-1">{t('common.totalVideos')}</p>
                <p className="text-2xl font-bold text-red-600">
                  {videos.length}
                  <span className="text-base font-medium ml-0.5">{t('common.videoCount')}</span>
                </p>
                {unavailableCount > 0 && (
                  <p className="text-xs text-red-400 mt-1">
                    +{unavailableCount}{t('common.privateCount')}
                  </p>
                )}
              </div>
              <div className="rounded-xl bg-blue-50 p-5 text-center">
                <p className="text-xs font-medium text-blue-400 mb-1">
                  {t('common.watchTime')}
                  {selectedSpeed !== 1 && (
                    <span className="ml-1">({selectedSpeed}x)</span>
                  )}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatDuration(adjustedSeconds, lang)}
                </p>
              </div>
              <div className="rounded-xl bg-violet-50 p-5 text-center">
                <p className="text-xs font-medium text-violet-400 mb-1">
                  {t('common.avgLength')}
                  {selectedSpeed !== 1 && (
                    <span className="ml-1">({selectedSpeed}x)</span>
                  )}
                </p>
                <p className="text-2xl font-bold text-violet-600">
                  {formatDuration(avgSeconds, lang)}
                </p>
              </div>
            </div>
          </div>

          {/* 영상 목록 */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => setShowVideos(!showVideos)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900 text-sm">
                {t('common.videoList')} ({videos.length}{t('common.videoCount')})
              </span>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform ${showVideos ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showVideos && (
              <div className="border-t divide-y divide-slate-100">
                {videos.map((video, i) => (
                  <div
                    key={video.id}
                    className="px-6 py-3 flex gap-3 items-center hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs text-slate-300 w-6 text-right shrink-0 font-mono">
                      {i + 1}
                    </span>
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="w-20 h-11 object-cover rounded-lg shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-800 hover:text-red-600 line-clamp-1 font-medium"
                      >
                        {video.title}
                      </a>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {video.channelTitle}
                      </p>
                    </div>
                    <span className="text-sm text-slate-500 font-mono shrink-0 bg-slate-100 px-2 py-0.5 rounded">
                      {video.durationFormatted}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          {t('playlist.seoTitle')}
        </h2>
        <p className="text-slate-500 leading-relaxed">
          {t('playlist.seoP1')}
        </p>
        <p className="text-slate-500 leading-relaxed">
          {t('playlist.seoP2')}
        </p>
        <h3 className="text-lg font-semibold text-slate-900 pt-2">{t('playlist.seoHowTo')}</h3>
        <ol className="text-slate-500 space-y-2 list-decimal list-inside">
          <li>{t('playlist.seoStep1')}</li>
          <li>{t('playlist.seoStep2')}</li>
          <li>{t('playlist.seoStep3')}</li>
          <li>{t('playlist.seoStep4')}</li>
        </ol>
      </section>
    </div>
  );
}
