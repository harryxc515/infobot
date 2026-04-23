# telegram info bot

multi-function telegram bot with sticker id, text-to-link paste, and emoji utilities.

## features

- sticker file id reader (send any sticker to get its ids)
- text to shareable link (/paste)
- emoji unicode analyser (/emoji, /emojiid)
- user / chat info (/id, /info)
- mongodb user tracking
- render.com ready deployment

## commands

| command | description |
|---|---|
| /start | welcome message |
| /help | list all commands |
| /id | your telegram user id |
| /info | chat or user info |
| /paste <text> | save text, get a shareable link |
| /emoji <text> | analyse emoji in text |
| /emojiid <emoji> | get unicode codepoint |
| /stickerid | prompt to send a sticker |

## setup

1. clone the repo
2. copy `.env.example` to `.env` and fill in your values
3. install dependencies: `npm install`
4. run locally: `npm run dev`

## environment variables

| variable | required | description |
|---|---|---|
| BOT_TOKEN | yes | telegram bot token from @botfather |
| MONGODB_URI | yes | mongodb connection string |
| PORT | no | server port (default 3000) |
| ADMIN_IDS | no | comma-separated admin user ids |
| BOT_USERNAME | no | bot username without @ |

## deploy to render

1. push repo to github
2. create a new web service on render.com
3. connect your repo
4. render will auto-detect `render.yaml`
5. add env variables in the render dashboard
6. deploy

## project structure

```
tgbot/
  config/
    db.js              mongodb connection
  src/
    commands/
      start.js         /start, /help
      info.js          /id, /info
    handlers/
      sticker.js       sticker file id reader
      paste.js         text to link
      emoji.js         emoji analyser
    models/
      User.js          user schema
      Paste.js         paste schema
    utils/
      buttons.js       inline keyboard helpers (ported from button_styles.py)
      emoji.js         emoji parsing and codepoint utils
      format.js        html formatting helpers
    index.js           bot entry point
    server.js          express keep-alive server
  render.yaml          render deployment config
  package.json
  .env.example
```
