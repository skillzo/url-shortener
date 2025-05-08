import { nanoid } from "nanoid";
import { UrlEntry } from "../types";

const store = new Map<string, UrlEntry>();

const BASE_URL = "http://short.est";

export function createShortUrl(longUrl: string): UrlEntry {
  const shortId = nanoid(6);
  const shortUrl = `${BASE_URL}/${shortId}`;
  const entry: UrlEntry = {
    longUrl,
    shortUrl,
    shortId,
    createdAt: new Date(),
    visitCount: 0,
  };
  store.set(shortId, entry);
  return entry;
}

export function getOriginalUrl(shortUrl: string): UrlEntry | undefined {
  const shortId = shortUrl.split("/").pop();
  if (shortId && store.has(shortId)) {
    return store.get(shortId);
  }
  return undefined;
}

export function getUrlStats(shortId: string): Partial<UrlEntry> | undefined {
  const entry = store.get(shortId);
  if (!entry) return undefined;
  return {
    shortUrl: entry.shortUrl,
    longUrl: entry.longUrl,
    createdAt: entry.createdAt,
    visitCount: entry.visitCount,
  };
}

export function getAllUrls(): UrlEntry[] {
  return Array.from(store.values());
}

export function searchLongUrls(query: string): UrlEntry[] {
  return Array.from(store.values()).filter((entry) =>
    entry.longUrl.toLowerCase().includes(query.toLowerCase())
  );
}

export function redirectToLongUrl(shortId: string): string | null {
  const entry = store.get(shortId);
  if (entry) {
    entry.visitCount++;
    return entry.longUrl;
  }
  return null;
}
