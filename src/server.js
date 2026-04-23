const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "running",
    bot: process.env.BOT_USERNAME || "telegram-bot",
    uptime: Math.floor(process.uptime()) + "s",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

function startServer() {
  app.listen(PORT, () => {
    console.log(`[server] listening on port ${PORT}`);
  });
}

module.exports = { startServer };
