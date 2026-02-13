import { useState } from 'react';
import { usePageMeta } from '../utils/usePageMeta';
import { parseMultipleUrls } from '../utils/urlParser';
import { fetchPlaylistVideoIds, fetchVideoDetails } from '../utils/youtubeApi';
import { formatDuration, calculateSpeedDurations } from '../utils/duration';
import type { VideoInfo, SpeedDuration } from '../types/youtube';

const SPEED_OPTIONS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3] as const;

export default function MultiVideoCalculatorPage() {
  usePageMeta(
    '유튜브 영상 시간 합산 계산기 - 여러 영상 합계',
    '여러 유튜브 영상과 재생목록의 재생시간을 합산합니다. URL을 줄바꿈으로 구분하여 입력하세요.',
  );

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [speeds, setSpeeds] = useState<SpeedDuration[]>([]);
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const [invalidLines, setInvalidLines] = useState<string[]>([]);
  const [unavailableCount, setUnavailableCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVideos([]);
    setTotalSeconds(0);
    setSpeeds([]);
    setSelectedSpeed(1);
    setInvalidLines([]);
    setUnavailableCount(0);

    const { videoIds, playlistIds, invalidLines: invalid } =
      parseMultipleUrls(text);
    setInvalidLines(invalid);

    if (videoIds.length === 0 && playlistIds.length === 0) {
      setError('유효한 유튜브 영상 또는 재생목록 URL을 하나 이상 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
      // 재생목록에서 영상 ID 수집
      const allVideoIds = [...videoIds];
      let totalUnavailable = 0;

      for (const plId of playlistIds) {
        const { videoIds: plVideoIds, unavailableCount: unavail } =
          await fetchPlaylistVideoIds(plId);
        totalUnavailable += unavail;
        for (const vid of plVideoIds) {
          if (!allVideoIds.includes(vid)) allVideoIds.push(vid);
        }
      }

      setUnavailableCount(totalUnavailable);

      if (allVideoIds.length === 0) {
        setError('재생 가능한 영상이 없습니다.');
        return;
      }

      const details = await fetchVideoDetails(allVideoIds);
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
    const lines = [
      `총 영상: ${videos.length}개`,
      `총 재생시간: ${formatDuration(totalSeconds)}`,
      '',
      ...speeds.map((s) => `${s.label} 배속: ${s.formatted}`),
    ].join('\n');

    await navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSpeed = speeds.find((s) => s.speed === selectedSpeed);
  const avgSeconds =
    videos.length > 0 ? Math.round(totalSeconds / videos.length) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 입력 카드 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          유튜브 영상 시간 합산 계산기
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          영상 URL 또는 재생목록 URL을 한 줄에 하나씩 입력하면 총 재생시간을 합산합니다
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            영상 / 재생목록 URL 목록
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`https://www.youtube.com/watch?v=...\nhttps://youtu.be/...\nhttps://www.youtube.com/playlist?list=...`}
            rows={6}
            className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-sm font-mono bg-slate-50 focus:bg-white resize-y focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors mb-4"
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-base"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                분석 중...
              </span>
            ) : (
              '합산 계산하기'
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      {invalidLines.length > 0 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-700">
          <p className="font-medium text-sm mb-2">
            인식할 수 없는 URL ({invalidLines.length}개)
          </p>
          <ul className="text-xs space-y-1">
            {invalidLines.map((line, i) => (
              <li key={i} className="truncate font-mono text-amber-600">
                {line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {totalSeconds > 0 && (
        <div className="mt-8 space-y-6">
          {/* 배속 선택 탭 */}
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-3">
              재생 속도
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 p-1.5 bg-slate-100 rounded-xl">
              {SPEED_OPTIONS.map((speed) => (
                <button
                  key={speed}
                  onClick={() => setSelectedSpeed(speed)}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedSpeed === speed
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {speed === 1 ? '1배속' : `${speed}x`}
                </button>
              ))}
            </div>
          </div>

          {/* 분석 결과 통계 카드 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-slate-900">
                분석 결과
              </h2>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500"
              >
                {copied ? '복사 완료' : '결과 복사'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-red-50 p-5 text-center">
                <p className="text-xs font-medium text-red-400 mb-1">총 영상</p>
                <p className="text-2xl font-bold text-red-600">
                  {videos.length}
                  <span className="text-base font-medium ml-0.5">개</span>
                </p>
                {unavailableCount > 0 && (
                  <p className="text-xs text-red-400 mt-1">
                    +{unavailableCount}개 비공개
                  </p>
                )}
              </div>
              <div className="rounded-xl bg-blue-50 p-5 text-center">
                <p className="text-xs font-medium text-blue-400 mb-1">
                  시청 시간
                  {selectedSpeed !== 1 && (
                    <span className="ml-1">({selectedSpeed}x 기준)</span>
                  )}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {currentSpeed
                    ? currentSpeed.formatted
                    : formatDuration(totalSeconds)}
                </p>
              </div>
              <div className="rounded-xl bg-violet-50 p-5 text-center">
                <p className="text-xs font-medium text-violet-400 mb-1">
                  평균 길이
                  {selectedSpeed !== 1 && (
                    <span className="ml-1">({selectedSpeed}x 기준)</span>
                  )}
                </p>
                <p className="text-2xl font-bold text-violet-600">
                  {formatDuration(Math.round(avgSeconds / selectedSpeed))}
                </p>
              </div>
            </div>
          </div>

          {/* 영상 목록 */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 font-semibold text-slate-900 text-sm border-b">
              영상 목록 ({videos.length}개)
            </div>
            <div className="divide-y divide-slate-100">
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
          </div>
        </div>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          여러 영상 시간 합산하기
        </h2>
        <p className="text-slate-500 leading-relaxed">
          개별 영상 URL과 재생목록 URL을 섞어서 입력할 수 있습니다.
          재생목록을 입력하면 포함된 모든 영상의 시간을 자동으로 합산합니다.
        </p>
        <p className="text-slate-500 leading-relaxed">
          youtube.com/watch, youtu.be 단축 URL, youtube.com/shorts, embed URL,
          youtube.com/playlist 등 다양한 형식을 지원합니다.
        </p>
      </section>
    </div>
  );
}
