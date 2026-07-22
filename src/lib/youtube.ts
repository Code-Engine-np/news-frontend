const YOUTUBE_URL_RE =
  /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

/**
 * Extracts a YouTube video ID from any common URL format:
 *   youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID,
 *   youtube-nocookie.com/embed/ID
 */
export function extractYouTubeVideoId(url: string): string | undefined {
  return YOUTUBE_URL_RE.exec(url)?.[1];
}

/** hqdefault is always available; maxresdefault may 404 for older videos. */
export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/** Privacy-enhanced embed URL with minimal player chrome. */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}
