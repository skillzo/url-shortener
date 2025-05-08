# 🔗 ShortLink - URL Shortener

A simple in-memory URL shortener built with TypeScript + Express.

---

## ✨ Features

- 🔐 Encode long URLs into short URLs
- 🔓 Decode short URLs back to original
- 📊 Track visits and show URL stats
- 📃 List all URLs with metadata
- 🔍 Search URLs by long URL

---

## 🏗 Project Structure

src/
├── app.ts
├── server.ts
├── routes/
├── controllers/
├── services/
├── types/
└── tests/

## 📦 Setup

```bash
npm install
npm run dev


## Run Tests
bash
Copy
Edit
npm test

📚 API Routes
POST /api/encode
payload: { "longUrl": "https://indicina.co" }

POST /api/decode
payload: { "shortUrl": "http://short.est/GeAi9K" }

GET /api/statistic/:shortId
Returns stats like visit count and creation time.

GET /api/list
Lists all stored short URLs.

GET /api/search?q=exam
Searches all long URLs with at least 3 characters in the query.

GET /:shortId
Redirects to the original long URL.

```
