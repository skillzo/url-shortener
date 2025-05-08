// src/__tests__/url.service.test.ts
import * as urlService from "../services/url.service";

describe("URL Service", () => {
  it("should create a short URL from a long URL", () => {
    const longUrl = "https://example.com";
    const result = urlService.createShortUrl(longUrl);

    expect(result).toHaveProperty("shortId");
    expect(result).toHaveProperty("shortUrl");
    expect(result.longUrl).toBe(longUrl);
    expect(result.visitCount).toBe(0);
  });

  it("should retrieve the original URL from a short URL", () => {
    const longUrl = "https://example.com/test";
    const { shortUrl } = urlService.createShortUrl(longUrl);

    const result = urlService.getOriginalUrl(shortUrl);
    expect(result?.longUrl).toBe(longUrl);
  });

  it("should return statistics for a short URL", () => {
    const { shortId } = urlService.createShortUrl("https://example.com/stats");
    const stats = urlService.getUrlStats(shortId);

    expect(stats).toHaveProperty("longUrl");
    expect(stats).toHaveProperty("visitCount");
    expect(typeof stats?.createdAt).toBe("string");
  });

  it("should increase visit count on redirect", () => {
    const { shortId, longUrl } = urlService.createShortUrl(
      "https://example.com/redirect"
    );
    const redirected = urlService.redirectToLongUrl(shortId);

    expect(redirected).toBe(longUrl);

    const stats = urlService.getUrlStats(shortId);
    expect(stats?.visitCount).toBe(1);
  });

  it("should list all URLs", () => {
    const all = urlService.getAllUrls();
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBeGreaterThan(0);
  });

  it("should search URLs by query", () => {
    const query = "example";
    urlService.createShortUrl("https://example.com/search-me");
    const result = urlService.searchLongUrls(query);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].longUrl).toContain(query);
  });
});
