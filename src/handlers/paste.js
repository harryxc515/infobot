const Paste = require("../models/Paste");
const { bold, code, link, section, safe } = require("../utils/format");
const { buildKeyboard, linkButton, dangerButton } = require("../utils/buttons");

const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`;

/**
 * /paste <text>  or  reply to a message with /paste
 * saves the text and returns a shareable link
 */
async function cmdPaste(ctx) {
  let content = ctx.message.reply_to_message?.text || ctx.match?.trim();

  if (!content) {
    return ctx.replyWithHTML(
      `send ${code("/paste")} followed by your text,\nor reply to any message with ${code("/paste")}.`
    );
  }

  if (content.length > 4000) {
    return ctx.replyWithHTML("text is too long. max 4000 characters.");
  }

  try {
    const paste = await Paste.createPaste(content, ctx.from.id);
    const url = `${BASE_URL}/paste/${paste.code}`;

    const keyboard = buildKeyboard([
      [linkButton({ text: "open link", url })],
    ]);

    await ctx.replyWithHTML(
      [
        section("paste created"),
        "",
        `link: ${link("click here", url)}`,
        `code: ${code(safe(paste.code))}`,
        "",
        `characters: ${code(String(content.length))}`,
      ].join("\n"),
      { reply_markup: keyboard }
    );
  } catch (err) {
    console.error("[paste] error:", err.message);
    await ctx.reply("failed to create paste. please try again.");
  }
}

module.exports = { cmdPaste };
