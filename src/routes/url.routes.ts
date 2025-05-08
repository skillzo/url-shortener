import { Router } from "express";

import {
  encodeUrl,
  decodeUrl,
  getStatistics,
  listUrls,
  redirectToOriginal,
  searchUrls,
} from "../controllers/url.controller";

const router = Router();

/**
 * @swagger
 * /api/encode:
 *   post:
 *     summary: Encode a long URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Short URL created
 */
router.post("/encode", encodeUrl);

/**
 * @swagger
 * /api/decode:
 *   post:
 *     summary: Decode a short URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shortUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Original URL returned
 */
router.post("/decode", decodeUrl);

/**
 * @swagger
 * /api/statistic/{shortId}:
 *   get:
 *     summary: Get statistics of a short URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Statistics returned
 */
router.get("/statistic/:shortId", getStatistics);

/**
 * @swagger
 * /api/list:
 *   get:
 *     summary: List all shortened URLs
 *     responses:
 *       200:
 *         description: List of URLs
 */
router.get("/list", listUrls);

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search long URLs by query string
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filtered URLs
 */

router.get("/search", searchUrls);

// Redirection route

/**
 * @swagger
 * /{shortId}:
 *   get:
 *     summary: Redirect to the original URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect
 */
router.get("/:shortId", redirectToOriginal);

export default router;
