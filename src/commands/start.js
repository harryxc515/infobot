const { bold, code, section } = require("../utils/format");
const { buildKeyboard, primaryButton, infoButton } = require("../utils/buttons");
const User = require("../models/User");

async function cmdStart(ctx) {
  try {
    await User.upsertUser(ctx);
  } catch (_) {}

  const name = ctx.from.first_name || "user";

  const keyboard = buildKeyboard([
    [
      primaryButton({ text: "help", callbackData: "help_main" }),
      infoButton({ text: "about", callbackData: "about" }),
    ],
  ]);

  await ctx.replyWithHTML(
    [
      section("welcome"),
      "",
      `hello, ${bold(name)}.`,
      "",
      "this bot provides:",
      "  \u25cf sticker file id reader",
      "  \u25cf text \u2192 shareable link (paste)",
      "  \u25cf emoji unicode analyser",
      "  \u25cf file / media info",
      "",
      `type ${code("/help")} to see all commands.`,
    ].join("\n"),
    { reply_markup: keyboard }
  );
}

async function cmdHelp(ctx) {
  const commands = [
    ["/start", "show welcome message"],
    ["/help", "list all commands"],
    ["/paste <text>", "convert text to shareable link"],
    ["/emoji <text>", "analyse emoji in text"],
    ["/emojiid <emoji>", "get unicode codepoint of emoji"],
    ["/id", "get your telegram user id"],
    ["/info", "get chat / user info"],
    ["/stickerid", "send a sticker to get its file id"],
  ];

  const lines = commands.map(([cmd, desc]) => `${code(cmd.padEnd(22))} ${desc}`);

  await ctx.replyWithHTML(
    [section("commands"), "", ...lines].join("\n")
  );
}

module.exports = { cmdStart, cmdHelp };
