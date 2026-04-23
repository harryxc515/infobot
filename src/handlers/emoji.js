const { analyseEmoji, replaceEmojiWithCode } = require("../utils/emoji");
const { code, section } = require("../utils/format");
const { buildKeyboard, infoButton } = require("../utils/buttons");

/**
 * /emoji <text>
 * analyses emoji in the given text
 */
async function cmdEmoji(ctx) {
  const text = ctx.message.reply_to_message?.text || ctx.match?.trim();

  if (!text) {
    return ctx.replyWithHTML(
      `send ${code("/emoji")} followed by text containing emoji,\nor reply to a message with ${code("/emoji")}.`
    );
  }

  const report = analyseEmoji(text);
  const replaced = replaceEmojiWithCode(text);

  const keyboard = buildKeyboard([
    [infoButton({ text: "what is this", callbackData: "help_emoji" })],
  ]);

  await ctx.replyWithHTML(
    [
      section("emoji analyser"),
      "",
      report,
      "",
      "<b>text with codepoints:</b>",
      `<code>${replaced}</code>`,
    ].join("\n"),
    { reply_markup: keyboard }
  );
}

/**
 * /emojiid <single emoji>
 * returns the unicode codepoint of one emoji
 */
async function cmdEmojiId(ctx) {
  const { toCodepoint, extractEmoji } = require("../utils/emoji");
  const raw = ctx.match?.trim();
  if (!raw) {
    return ctx.replyWithHTML(`usage: ${code("/emojiid")} followed by one emoji.`);
  }
  const found = extractEmoji(raw);
  if (!found.length) {
    return ctx.reply("no emoji detected in your input.");
  }
  const lines = found.map((em) => `${em}  \u2192  ${code(toCodepoint(em))}`);
  await ctx.replyWithHTML(lines.join("\n"));
}

module.exports = { cmdEmoji, cmdEmojiId };
