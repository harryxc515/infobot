require("dotenv").config();

const { Telegraf } = require("telegraf");
const { connectDB } = require("../config/db");
const { startServer } = require("./server");

const { cmdStart, cmdHelp } = require("./commands/start");
const { cmdId, cmdInfo } = require("./commands/info");
const { cmdPaste } = require("./handlers/paste");
const { cmdEmoji, cmdEmojiId } = require("./handlers/emoji");
const { onSticker } = require("./handlers/sticker");

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("[bot] BOT_TOKEN is not set. check your .env file.");
  process.exit(1);
}

const bot = new Telegraf(token);

// ── middleware: log every update ──────────────────────────────────────────────
bot.use(async (ctx, next) => {
  const user = ctx.from ? `@${ctx.from.username || ctx.from.id}` : "unknown";
  const type = ctx.updateType;
  console.log(`[update] ${type} from ${user}`);
  return next();
});

// ── commands ──────────────────────────────────────────────────────────────────
bot.start(cmdStart);
bot.help(cmdHelp);
bot.command("id", cmdId);
bot.command("info", cmdInfo);
bot.command("paste", (ctx) => {
  ctx.match = ctx.message.text.replace(/^\/paste\s*/, "");
  return cmdPaste(ctx);
});
bot.command("emoji", (ctx) => {
  ctx.match = ctx.message.text.replace(/^\/emoji\s*/, "");
  return cmdEmoji(ctx);
});
bot.command("emojiid", (ctx) => {
  ctx.match = ctx.message.text.replace(/^\/emojiid\s*/, "");
  return cmdEmojiId(ctx);
});
bot.command("stickerid", (ctx) =>
  ctx.replyWithHTML("send me a sticker and i will show its file id.")
);

// ── message handlers ──────────────────────────────────────────────────────────
bot.on("sticker", onSticker);

// ── callback queries ──────────────────────────────────────────────────────────
bot.on("callback_query", async (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === "help_main") {
    await ctx.answerCbQuery();
    return cmdHelp(ctx);
  }
  if (data === "about") {
    await ctx.answerCbQuery("multi-function telegram bot");
    return;
  }
  if (data === "help_emoji") {
    await ctx.answerCbQuery("shows unicode codepoints for each emoji found in your text");
    return;
  }
  if (data.startsWith("copy_")) {
    const fileId = data.slice(5);
    await ctx.answerCbQuery(`file id: ${fileId}`, { show_alert: true });
    return;
  }

  await ctx.answerCbQuery();
});

// ── error handler ─────────────────────────────────────────────────────────────
bot.catch((err, ctx) => {
  console.error(`[error] update ${ctx.updateType}:`, err.message);
});

// ── boot ──────────────────────────────────────────────────────────────────────
(async () => {
  await connectDB();
  startServer();

  await bot.launch();
  console.log("[bot] polling started");
})();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
