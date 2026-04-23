/**
 * button styles utility
 * ported from button_styles.py (pyrogram) to telegraf (node.js)
 *
 * telegraf uses { text, callback_data, url } objects for inline buttons.
 * this module mirrors the python helper api: primary, success, danger buttons
 * with unicode prefix labels so they stand out without emoji.
 */

const PREFIX = {
  primary: "\u25b6",   // filled triangle  ▶
  success: "\u2714",   // check mark       ✔
  danger:  "\u26a0",   // warning sign     ⚠
  info:    "\u2139",   // info             ℹ
  link:    "\u21aa",   // link arrow       ↪
};

/**
 * base inline button builder
 * @param {object} opts - { text, callbackData?, url? }
 * @returns {{ text: string, callback_data?: string, url?: string }}
 */
function inlineButton({ text, callbackData, url }) {
  if (url) return { text, url };
  return { text, callback_data: callbackData };
}

/**
 * primary action button  ▶ label
 */
function primaryButton({ text, callbackData, url }) {
  return inlineButton({ text: `${PREFIX.primary} ${text}`, callbackData, url });
}

/**
 * success / confirm button  ✔ label
 */
function successButton({ text, callbackData, url }) {
  return inlineButton({ text: `${PREFIX.success} ${text}`, callbackData, url });
}

/**
 * danger / destructive button  ⚠ label
 */
function dangerButton({ text, callbackData, url }) {
  return inlineButton({ text: `${PREFIX.danger} ${text}`, callbackData, url });
}

/**
 * info button  ℹ label
 */
function infoButton({ text, callbackData, url }) {
  return inlineButton({ text: `${PREFIX.info} ${text}`, callbackData, url });
}

/**
 * url / link button  ↪ label
 */
function linkButton({ text, url }) {
  return inlineButton({ text: `${PREFIX.link} ${text}`, url });
}

/**
 * build an inline keyboard markup from rows of button arrays
 * @param {Array<Array<object>>} rows
 * @returns {{ inline_keyboard: Array<Array<object>> }}
 */
function buildKeyboard(rows) {
  return { inline_keyboard: rows };
}

module.exports = {
  inlineButton,
  primaryButton,
  successButton,
  dangerButton,
  infoButton,
  linkButton,
  buildKeyboard,
};
