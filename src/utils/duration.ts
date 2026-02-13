import type { SpeedDuration } from '../types/youtube';
import type { Lang } from '../i18n/translations';

const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3] as const;

export function parseISO8601Duration(iso: string): number {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatDuration(totalSeconds: number, lang: Lang = 'ko'): string {
  if (totalSeconds <= 0) return lang === 'ko' ? '0초' : '0s';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const parts: string[] = [];
  if (lang === 'ko') {
    if (hours > 0) parts.push(`${hours}시간`);
    if (minutes > 0) parts.push(`${minutes}분`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}초`);
  } else {
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  }
  return parts.join(' ');
}

export function formatDurationHMS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const pad = (n: number) => n.toString().padStart(2, '0');

  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
}

export function calculateSpeedDurations(totalSeconds: number, lang: Lang = 'ko'): SpeedDuration[] {
  return SPEEDS.map((speed) => {
    const secs = Math.round(totalSeconds / speed);
    return {
      speed,
      label: `${speed}x`,
      seconds: secs,
      formatted: formatDuration(secs, lang),
    };
  });
}
