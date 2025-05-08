import { Request, Response } from "express";
import * as urlService from "../services/url.service";

export function encodeUrl(req: Request, res: Response) {
  const { longUrl } = req.body;
  const result = urlService.createShortUrl(longUrl);
  res.json(result);
}

export function decodeUrl(req: Request, res: Response) {
  const { shortUrl } = req.body;
  const result = urlService.getOriginalUrl(shortUrl);
  res.json(result);
}

export function getStatistics(req: Request, res: Response) {
  const { shortId } = req.params;
  const stat = urlService.getUrlStats(shortId);
  res.json(stat);
}

export function listUrls(_: Request, res: Response) {
  const urls = urlService.getAllUrls();
  res.json(urls);
}

export function searchUrls(req: Request, res: Response) {
  const { q } = req.query;
  if (typeof q !== "string" || q.length < 3) {
    return res
      .status(400)
      .json({ error: "Query must be at least 3 characters" });
  }
  const results = urlService.searchLongUrls(q);
  res.json(results);
}

export function redirectToOriginal(req: Request, res: Response) {
  const { shortId } = req.params;
  const longUrl = urlService.redirectToLongUrl(shortId);
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
}
