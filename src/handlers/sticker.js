const { bold, code, section, safe } = require("../utils/format");
const { buildKeyboard, primaryButton } = require("../utils/buttons");

/**
 * handles any sticker sent to the bot
 * replies with full sticker metadata
 */
async function onSticker(ctx) {
  const s = ctx.message.sticker;
  if (!s) return;

  const lines = [
    section("sticker info"),
    "",
    `file id:        ${code(safe(s.file_id))}`,
    `file unique id: ${code(safe(s.file_unique_id))}`,
    `set name:       ${code(s.set_name ? safe(s.set_name) : "none")}`,
    `type:           ${code(s.is_animated ? "animated" : s.is_video ? "video" : "static")}`,
    `emoji:          ${s.emoji || "—"}`,
    `width:          ${code(String(s.width))}`,
    `height:         ${code(String(s.height))}`,
    `file size:      ${code(s.file_size ? (s.file_size / 1024).toFixed(1) + " kb" : "unknown")}`,
  ];

  const keyboard = buildKeyboard([
    [primaryButton({ text: "copy file id", callbackData: `copy_${s.file_id}` })],
  ]);

  await ctx.replyWithHTML(lines.join("\n"), {
    reply_markup: keyboard,
    reply_to_message_id: ctx.message.message_id,
  });
}

module.exports = { onSticker };
