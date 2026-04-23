const { bold, code, section, safe } = require("../utils/format");

async function cmdId(ctx) {
  const u = ctx.from;
  await ctx.replyWithHTML(
    [
      section("your id"),
      "",
      `user id:    ${code(String(u.id))}`,
      `username:   ${u.username ? code("@" + safe(u.username)) : "none"}`,
      `first name: ${code(safe(u.first_name || ""))}`,
      `language:   ${code(u.language_code || "unknown")}`,
      `bot:        ${code(String(!!u.is_bot))}`,
    ].join("\n"),
    { reply_to_message_id: ctx.message.message_id }
  );
}

async function cmdInfo(ctx) {
  const chat = ctx.chat;
  const isGroup = ["group", "supergroup", "channel"].includes(chat.type);

  const lines = [
    section("chat info"),
    "",
    `chat id:   ${code(String(chat.id))}`,
    `type:      ${code(chat.type)}`,
  ];

  if (isGroup) {
    lines.push(`title:     ${code(safe(chat.title || ""))}`);
    if (chat.username) lines.push(`username:  ${code("@" + safe(chat.username))}`);
  } else {
    lines.push(`name:      ${code(safe(ctx.from.first_name || ""))}`);
  }

  if (ctx.message.reply_to_message) {
    const r = ctx.message.reply_to_message;
    lines.push("", bold("replied message:"));
    lines.push(`  message id: ${code(String(r.message_id))}`);
    if (r.from) lines.push(`  from id:    ${code(String(r.from.id))}`);
    if (r.sticker) lines.push(`  sticker id: ${code(safe(r.sticker.file_id))}`);
    if (r.document) lines.push(`  file id:    ${code(safe(r.document.file_id))}`);
    if (r.photo) {
      const p = r.photo.at(-1);
      lines.push(`  photo id:   ${code(safe(p.file_id))}`);
    }
  }

  await ctx.replyWithHTML(lines.join("\n"), {
    reply_to_message_id: ctx.message.message_id,
  });
}

module.exports = { cmdId, cmdInfo };
