import type { VideoInfo } from '../types/youtube';

export interface DaySchedule {
  day: number;
  videos: VideoInfo[];
  seconds: number;
}

export const STUDY_BUFFER_RATIO = 0.8;

export function buildDailySchedule(
  videos: VideoInfo[],
  dailySeconds: number,
  speed: number,
): DaySchedule[] {
  if (dailySeconds <= 0 || videos.length === 0) return [];

  const schedule: DaySchedule[] = [];
  let currentVideos: VideoInfo[] = [];
  let currentSeconds = 0;

  for (const video of videos) {
    const adjusted = video.durationSeconds / speed;
    if (currentVideos.length > 0 && currentSeconds + adjusted > dailySeconds) {
      schedule.push({ day: schedule.length + 1, videos: currentVideos, seconds: currentSeconds });
      currentVideos = [];
      currentSeconds = 0;
    }
    currentVideos.push(video);
    currentSeconds += adjusted;
  }
  if (currentVideos.length > 0) {
    schedule.push({ day: schedule.length + 1, videos: currentVideos, seconds: currentSeconds });
  }
  return schedule;
}

/** 목표 완료일까지 남은 일수를 기준으로, 하루에 필요한 시청 시간(초)을 계산합니다. */
export function effectiveDailySecondsForTargetDays(
  totalSeconds: number,
  speed: number,
  targetDays: number,
  buffer: boolean,
): number {
  const usableDays = Math.max(1, buffer ? Math.floor(targetDays * STUDY_BUFFER_RATIO) : targetDays);
  return totalSeconds / speed / usableDays;
}

/** 하루 학습 가능 시간을 기준으로, 완료까지 필요한 일수를 계산합니다. */
export function daysNeededForDailyMinutes(
  totalSeconds: number,
  speed: number,
  dailyMinutes: number,
  buffer: boolean,
): number {
  const dailySeconds = dailyMinutes * 60 * (buffer ? STUDY_BUFFER_RATIO : 1);
  if (dailySeconds <= 0) return 0;
  return Math.ceil(totalSeconds / speed / dailySeconds);
}
