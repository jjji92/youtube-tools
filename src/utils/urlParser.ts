export function extractPlaylistId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    return parsed.searchParams.get('list');
  } catch {
    // list= 파라미터만 있는 경우
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }
}

export function extractVideoId(url: string): string | null {
  const trimmed = url.trim();

  // youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtube.com/embed/VIDEO_ID
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // 11자 ID만 입력한 경우
  const idOnly = trimmed.match(/^[a-zA-Z0-9_-]{11}$/);
  if (idOnly) return idOnly[0];

  return null;
}

export function parseMultipleUrls(text: string): {
  videoIds: string[];
  playlistIds: string[];
  invalidLines: string[];
} {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const videoIds: string[] = [];
  const playlistIds: string[] = [];
  const invalidLines: string[] = [];

  for (const line of lines) {
    const playlistId = extractPlaylistId(line);
    if (playlistId) {
      if (!playlistIds.includes(playlistId)) playlistIds.push(playlistId);
      continue;
    }
    const videoId = extractVideoId(line);
    if (videoId) {
      if (!videoIds.includes(videoId)) videoIds.push(videoId);
    } else {
      invalidLines.push(line);
    }
  }

  return { videoIds, playlistIds, invalidLines };
}
