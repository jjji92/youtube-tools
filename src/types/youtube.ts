// YouTube Data API v3 응답 타입

export interface YouTubePlaylistItemsResponse {
  nextPageToken?: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: YouTubePlaylistItem[];
}

export interface YouTubePlaylistItem {
  snippet: {
    title: string;
    resourceId: { videoId: string };
  };
  status?: {
    privacyStatus: string;
  };
}

export interface YouTubeVideosResponse {
  items: YouTubeVideoItem[];
}

export interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      default: { url: string };
    };
  };
  contentDetails: {
    duration: string; // ISO 8601 (PT1H2M3S)
  };
}

// 앱 내부 타입

export interface VideoInfo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  durationSeconds: number;
  durationFormatted: string;
}

export interface PlaylistResult {
  videos: VideoInfo[];
  totalSeconds: number;
  totalFormatted: string;
  videoCount: number;
  unavailableCount: number;
}

export interface SpeedDuration {
  speed: number;
  label: string;
  seconds: number;
  formatted: string;
}
