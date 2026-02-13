import { useState } from 'react';
import { usePageMeta } from '../utils/usePageMeta';
import { extractPlaylistId } from '../utils/urlParser';
import { fetchPlaylistVideoIds, fetchVideoDetails } from '../utils/youtubeApi';
import { formatDuration, calculateSpeedDurations } from '../utils/duration';
import type { VideoInfo, SpeedDuration } from '../types/youtube';

export default function PlaylistCalculatorPage() {
  usePageMeta(
    '유튜브 재생시간 계산기 - 재생목록 총 시간 계산',
    '유튜브 재생목록의 총 재생시간을 계산합니다. 배속별 시간 확인, 여러 영상 합산 계산까지 한번에.',
  );

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [speeds, setSpeeds] = useState<SpeedDuration[]>([]);
  const [unavailableCount, setUnavailableCount] = useState(0);
  const [showVideos, setShowVideos] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVideos([]);
    setTotalSeconds(0);
    setSpeeds([]);
    setUnavailableCount(0);
    setShowVideos(false);

    const playlistId = extractPlaylistId(url);
    if (!playlistId) {
      setError('올바른 유튜브 재생목록 URL을 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      const { videoIds, unavailableCount: unavail } =
        await fetchPlaylistVideoIds(playlistId);
      setUnavailableCount(unavail);

      if (videoIds.length === 0) {
        setError('재생 가능한 영상이 없습니다.');
        return;
      }

      const details = await fetchVideoDetails(videoIds);
      const total = details.reduce((sum, v) => sum + v.durationSeconds, 0);

      setVideos(details);
      setTotalSeconds(total);
      setSpeeds(calculateSpeedDurations(total));
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    const text = [
      `총 영상: ${videos.length}개`,
      `총 재생시간: ${formatDuration(totalSeconds)}`,
      '',
      ...speeds.map((s) => `${s.label} 배속: ${s.formatted}`),
    ].join('\n');

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">
        유튜브 재생목록 시간 계산기
      </h1>
      <p className="text-slate-500 mb-6">
        재생목록 URL을 입력하면 총 재생시간과 배속별 시간을 계산합니다.
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/playlist?list=..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            {loading ? '계산 중...' : '계산하기'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      {totalSeconds > 0 && (
        <div className="space-y-6">
          {/* 총 시간 카드 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">계산 결과</h2>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-sm border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
              >
                {copied ? '복사됨!' : '결과 복사'}
              </button>
            </div>

            <div className="text-3xl font-bold text-red-600 mb-1">
              {formatDuration(totalSeconds)}
            </div>
            <p className="text-slate-500 text-sm">
              총 {videos.length}개 영상
              {unavailableCount > 0 && (
                <span className="text-amber-600">
                  {' '}
                  (비공개/삭제 {unavailableCount}개 제외)
                </span>
              )}
            </p>
          </div>

          {/* 배속별 시간 */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              배속별 재생시간
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {speeds.map((s) => (
                <div
                  key={s.speed}
                  className={`p-3 rounded-lg text-center ${
                    s.speed === 1
                      ? 'bg-red-50 border-2 border-red-200'
                      : 'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="text-sm font-medium text-slate-500 mb-1">
                    {s.label}
                  </div>
                  <div
                    className={`font-semibold ${s.speed === 1 ? 'text-red-600' : 'text-slate-900'}`}
                  >
                    {s.formatted}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 영상 목록 */}
          <div className="rounded-lg border bg-white shadow-sm">
            <button
              onClick={() => setShowVideos(!showVideos)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900">
                영상 목록 ({videos.length}개)
              </span>
              <span className="text-slate-400 text-xl">
                {showVideos ? '▲' : '▼'}
              </span>
            </button>
            {showVideos && (
              <div className="border-t divide-y">
                {videos.map((video, i) => (
                  <div key={video.id} className="p-3 flex gap-3 items-center">
                    <span className="text-xs text-slate-400 w-6 text-right shrink-0">
                      {i + 1}
                    </span>
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="w-16 h-9 object-cover rounded shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-900 hover:text-red-600 line-clamp-1"
                      >
                        {video.title}
                      </a>
                      <p className="text-xs text-slate-400">{video.channelTitle}</p>
                    </div>
                    <span className="text-sm text-slate-600 font-mono shrink-0">
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
      <section className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          유튜브 재생목록 시간 계산기란?
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          유튜브 재생목록의 모든 영상 시간을 합산하여 총 재생시간을 알려드립니다.
          강의 시리즈, 음악 플레이리스트, 팟캐스트 모음 등 재생목록의 총 길이를
          미리 파악할 수 있어 학습 계획이나 시간 관리에 도움이 됩니다.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          1.25x, 1.5x, 1.75x, 2x 배속으로 들을 때 걸리는 시간도 함께
          계산합니다. 유튜브에서 직접 제공하지 않는 기능이라 특히 유용합니다.
        </p>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">사용 방법</h3>
        <ol className="text-slate-600 space-y-2 list-decimal list-inside">
          <li>유튜브에서 재생목록 페이지를 엽니다.</li>
          <li>주소창의 URL을 복사합니다.</li>
          <li>위 입력창에 붙여넣고 &quot;계산하기&quot;를 클릭합니다.</li>
          <li>총 재생시간과 배속별 시간을 확인합니다.</li>
        </ol>
      </section>
    </div>
  );
}
