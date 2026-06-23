/** Pure TMDB image-URL helpers — safe to import from client components. */

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export function posterUrl(path: string | null, size = "w500"): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}

export function backdropUrl(path: string | null, size = "w1280"): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null;
}
