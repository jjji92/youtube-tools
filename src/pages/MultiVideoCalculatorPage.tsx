import { useState } from 'react';
import { usePageMeta } from '../utils/usePageMeta';
import { parseMultipleVideoUrls } from '../utils/urlParser';
import { fetchVideoDetails } from '../utils/youtubeApi';
import { formatDuration, calculateSpeedDurations } from '../utils/duration';
import type { VideoInfo, SpeedDuration } from '../types/youtube';

export default function MultiVideoCalculatorPage() {
  usePageMeta(
    '유튜브 영상 시간 합산 계산기 - 여러 영상 합계',
    '여러 유튜브 영상의 재생시간을 합산합니다. URL을 줄바꿈으로 구분하여 입력하세요.',
  );

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [speeds, setSpeeds] = useState<SpeedDuration[]>([]);
  const [invalidLines, setInvalidLines] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVideos([]);
    setTotalSeconds(0);
    setSpeeds([]);
    setInvalidLines([]);

    const { videoIds, invalidLines: invalid } = parseMultipleVideoUrls(text);
    setInvalidLines(invalid);

    if (videoIds.length === 0) {
      setError('유효한 유튜브 영상 URL을 하나 이상 입력해주세요.');
      return;
    }

    setLoading(true);
    try {
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
        유튜브 영상 시간 합산 계산기
      </h1>
      <p className="text-slate-500 mb-6">
        여러 영상의 URL을 입력하면 총 재생시간을 합산합니다. (줄바꿈으로 구분)
      </p>

      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`https://www.youtube.com/watch?v=...\nhttps://youtu.be/...\nhttps://www.youtube.com/watch?v=...`}
          rows={6}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent mb-3"
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '계산 중...' : '합산 계산하기'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      {invalidLines.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 mb-6">
          <p className="font-medium mb-1">인식할 수 없는 URL ({invalidLines.length}개)</p>
          <ul className="text-sm space-y-0.5">
            {invalidLines.map((line, i) => (
              <li key={i} className="truncate font-mono">{line}</li>
            ))}
          </ul>
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
            <p className="text-slate-500 text-sm">총 {videos.length}개 영상</p>
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
            <div className="p-4 font-semibold text-slate-900 border-b">
              영상 목록 ({videos.length}개)
            </div>
            <div className="divide-y">
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
          </div>
        </div>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-12 prose prose-slate max-w-none">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          여러 영상 시간 합산하기
        </h2>
        <p className="text-slate-600 leading-relaxed mb-4">
          재생목록에 포함되지 않은 개별 영상들의 시간을 합산하고 싶을 때 사용합니다.
          영상 URL을 한 줄에 하나씩 입력하면 전체 합계를 계산합니다.
        </p>
        <p className="text-slate-600 leading-relaxed">
          youtube.com/watch, youtu.be 단축 URL, youtube.com/shorts, embed URL 등
          다양한 형식을 지원합니다.
        </p>
      </section>
    </div>
  );
}
