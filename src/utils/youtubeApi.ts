import type {
  YouTubePlaylistItemsResponse,
  YouTubeVideosResponse,
  VideoInfo,
} from '../types/youtube';
import { parseISO8601Duration, formatDurationHMS } from './duration';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string;
const API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function fetchPlaylistVideoIds(
  playlistId: string,
): Promise<{ videoIds: string[]; unavailableCount: number }> {
  const videoIds: string[] = [];
  let unavailableCount = 0;
  let pageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: 'snippet,status',
      playlistId,
      maxResults: '50',
      key: API_KEY,
    });
    if (pageToken) params.set('pageToken', pageToken);

    const res = await fetch(`${API_BASE}/playlistItems?${params}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        err.error?.message || `재생목록을 불러올 수 없습니다 (${res.status})`,
      );
    }

    const data: YouTubePlaylistItemsResponse = await res.json();

    for (const item of data.items) {
      const status = item.status?.privacyStatus;
      if (status === 'private' || status === 'privacyStatusUnspecified') {
        unavailableCount++;
      } else {
        videoIds.push(item.snippet.resourceId.videoId);
      }
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return { videoIds, unavailableCount };
}

export async function fetchVideoDetails(
  videoIds: string[],
): Promise<VideoInfo[]> {
  const results: VideoInfo[] = [];

  // 50개씩 배치 처리
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      id: batch.join(','),
      key: API_KEY,
    });

    const res = await fetch(`${API_BASE}/videos?${params}`);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(
        err.error?.message || `영상 정보를 불러올 수 없습니다 (${res.status})`,
      );
    }

    const data: YouTubeVideosResponse = await res.json();

    for (const item of data.items) {
      const durationSeconds = parseISO8601Duration(
        item.contentDetails.duration,
      );
      results.push({
        id: item.id,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.default.url,
        durationSeconds,
        durationFormatted: formatDurationHMS(durationSeconds),
      });
    }
  }

  return results;
}
