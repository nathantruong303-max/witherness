# Witherness AI starter

A dark-theme chat interface with a Node.js backend that calls the OpenAI Responses API. Chat history is saved only in the current browser using localStorage in this starter.

## Requirements
- Node.js 22 or newer
- An OpenAI API key with API access/billing enabled

## Run locally
1. Extract the ZIP.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Put your API key in `.env` as `OPENAI_API_KEY=...`. Never put the key in `public/index.html` or commit `.env` to GitHub.
6. Run `npm start`.
7. Open http://localhost:3000

## Notes before public launch
- This is a starter, not a production-ready service.
- Conversations are stored in each browser, not in a shared account/database.
- Add authentication, per-user database storage, request rate limiting, usage limits, abuse monitoring, and a privacy policy before opening it to the public.
- API usage can cost money. Set usage limits/alerts in your API account and never share your API key.
- Deploy the Node server to a host that supports Node.js, set `OPENAI_API_KEY` as a server environment variable, and connect your domain after deployment.
