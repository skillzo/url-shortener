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

router.post("/encode", encodeUrl);
router.post("/decode", decodeUrl);
router.get("/statistic/:shortId", getStatistics);
router.get("/list", listUrls);
router.get("/search", searchUrls);

// Redirection route
router.get("/:shortId", redirectToOriginal);

export default router;
