import { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDuration } from '../utils/duration';
import {
  buildDailySchedule,
  daysNeededForDailyMinutes,
  effectiveDailySecondsForTargetDays,
} from '../utils/schedule';
import type { VideoInfo } from '../types/youtube';

interface StudySchedulerProps {
  videos: VideoInfo[];
  totalSeconds: number;
  selectedSpeed: number;
}

type Mode = 'byDate' | 'byDaily';

function todayPlusDays(days: number): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  return d;
}

function daysUntil(dateStr: string): number {
  if (!dateStr) return 0;
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export default function StudyScheduler({ videos, totalSeconds, selectedSpeed }: StudySchedulerProps) {
  const { lang, t } = useLanguage();

  const [mode, setMode] = useState<Mode>('byDate');
  const [targetDate, setTargetDate] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState('');
  const [buffer, setBuffer] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const [copied, setCopied] = useState(false);

  const targetDays = mode === 'byDate' ? daysUntil(targetDate) : 0;
  const dailyMinutesNum = mode === 'byDaily' ? parseFloat(dailyMinutes) || 0 : 0;

  const result = useMemo(() => {
    if (mode === 'byDate') {
      if (targetDays < 1) return null;
      const effectiveDailySeconds = effectiveDailySecondsForTargetDays(
        totalSeconds,
        selectedSpeed,
        targetDays,
        buffer,
      );
      const dailyMinutesNeeded = Math.ceil(effectiveDailySeconds / 60);
      const schedule = buildDailySchedule(videos, effectiveDailySeconds, selectedSpeed);
      return { dailyMinutesNeeded, schedule, daysNeeded: targetDays };
    }

    if (dailyMinutesNum <= 0) return null;
    const daysNeeded = daysNeededForDailyMinutes(totalSeconds, selectedSpeed, dailyMinutesNum, buffer);
    const effectiveDailySeconds = dailyMinutesNum * 60 * (buffer ? 0.8 : 1);
    const schedule = buildDailySchedule(videos, effectiveDailySeconds, selectedSpeed);
    return { dailyMinutesNeeded: dailyMinutesNum, schedule, daysNeeded };
  }, [mode, targetDays, dailyMinutesNum, buffer, totalSeconds, selectedSpeed, videos]);

  const completionDateStr = useMemo(() => {
    if (!result || mode !== 'byDaily') return '';
    return todayPlusDays(result.daysNeeded).toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, [result, mode, lang]);

  const handleCopySchedule = async () => {
    if (!result) return;
    const lines = [
      `${t('studyScheduler.title')} (${result.daysNeeded}${t('studyScheduler.daysUnit')})`,
      ...result.schedule.map(
        (d) =>
          `Day ${d.day}: ${d.videos.length}${t('studyScheduler.videosUnit')} (${formatDuration(Math.round(d.seconds), lang)})`,
      ),
    ].join('\n');
    await navigator.clipboard.writeText(lines);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xl">📅</span>
        <h2 className="text-base font-semibold text-slate-900">{t('studyScheduler.title')}</h2>
      </div>
      <p className="text-sm text-slate-400 mb-5">{t('studyScheduler.subtitle')}</p>

      {/* 모드 토글 */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode('byDate')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'byDate' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          {t('studyScheduler.modeByDate')}
        </button>
        <button
          type="button"
          onClick={() => setMode('byDaily')}
          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'byDaily' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          {t('studyScheduler.modeByDaily')}
        </button>
      </div>

      {/* 입력 */}
      {mode === 'byDate' ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('studyScheduler.dateLabel')}
          </label>
          <input
            type="date"
            value={targetDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
          />
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t('studyScheduler.dailyMinutesLabel')}
          </label>
          <input
            type="number"
            min={1}
            value={dailyMinutes}
            onChange={(e) => setDailyMinutes(e.target.value)}
            placeholder={t('studyScheduler.dailyMinutesPlaceholder')}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors"
          />
        </div>
      )}

      {/* 버퍼 체크박스 */}
      <label className="flex items-start gap-2 mb-5 cursor-pointer">
        <input
          type="checkbox"
          checked={buffer}
          onChange={(e) => setBuffer(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-red-600"
        />
        <span className="text-sm text-slate-600">
          <span className="font-medium">{t('studyScheduler.bufferLabel')}</span>
          <span className="block text-xs text-slate-400 mt-0.5">{t('studyScheduler.bufferHint')}</span>
        </span>
      </label>

      {/* 결과 */}
      {result ? (
        <div className="space-y-4">
          <div className="rounded-xl bg-red-50 p-4 text-sm text-slate-700 leading-relaxed">
            {mode === 'byDate' ? (
              <p>
                {t('studyScheduler.resultByDatePrefix')}{' '}
                <strong className="text-red-600">
                  {result.dailyMinutesNeeded}
                  {t('studyScheduler.minutesUnit')}
                </strong>{' '}
                {t('studyScheduler.resultByDateSuffix')}
              </p>
            ) : (
              <p>
                {t('studyScheduler.resultByDailyPrefix')}{' '}
                <strong className="text-red-600">
                  {result.daysNeeded}
                  {t('studyScheduler.daysUnit')}
                </strong>{' '}
                {t('studyScheduler.resultByDailyMid')}{' '}
                <strong className="text-red-600">{completionDateStr}</strong>
                {t('studyScheduler.resultByDailySuffix')}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="w-full px-4 py-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowSchedule(!showSchedule)}
                className="flex-1 flex items-center justify-between text-left"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {t('studyScheduler.scheduleToggle')} ({result.schedule.length}{t('studyScheduler.daysUnit')})
                </span>
                <svg
                  className={`w-4 h-4 text-slate-400 transition-transform ${showSchedule ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleCopySchedule}
                className="ml-3 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 shrink-0"
              >
                {copied ? t('common.copied') : t('studyScheduler.copyBtn')}
              </button>
            </div>
            {showSchedule && (
              <div className="border-t divide-y divide-slate-100">
                {result.schedule.map((d) => (
                  <div key={d.day} className="px-4 py-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-800">
                        Day {d.day}
                      </span>
                      <span className="text-xs text-slate-400">
                        {d.videos.length}{t('studyScheduler.videosUnit')} · {formatDuration(Math.round(d.seconds), lang)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {d.videos.map((v) => v.title).join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-400">
          {mode === 'byDate' ? t('studyScheduler.emptyDateHint') : t('studyScheduler.emptyDailyHint')}
        </p>
      )}
    </div>
  );
}
