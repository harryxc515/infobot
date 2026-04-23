/**
 * emoji utilities
 * - parse emoji from text
 * - get unicode codepoints
 * - convert text emoji to unicode representations
 */

const EMOJI_REGEX =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;

/**
 * extract all emoji from a string
 * @param {string} text
 * @returns {string[]}
 */
function extractEmoji(text) {
  return text.match(EMOJI_REGEX) || [];
}

/**
 * get unicode codepoint(s) of a character / emoji
 * @param {string} char
 * @returns {string}  e.g. "U+1F600"
 */
function toCodepoint(char) {
  const points = [];
  for (const cp of char) {
    points.push("U+" + cp.codePointAt(0).toString(16).toUpperCase().padStart(4, "0"));
  }
  return points.join(" ");
}

/**
 * build a detail line for one emoji
 * @param {string} em
 * @returns {string}
 */
function emojiInfo(em) {
  const cp = toCodepoint(em);
  return `${em}  codepoint: ${cp}`;
}

/**
 * analyse all emoji in a text block and return formatted report
 * @param {string} text
 * @returns {string}
 */
function analyseEmoji(text) {
  const found = extractEmoji(text);
  if (!found.length) return "no emoji found in the text.";
  const unique = [...new Set(found)];
  const lines = unique.map((em) => emojiInfo(em));
  return `found ${found.length} emoji (${unique.length} unique):\n\n` + lines.join("\n");
}

/**
 * replace every emoji in text with its U+XXXX codepoint label
 * @param {string} text
 * @returns {string}
 */
function replaceEmojiWithCode(text) {
  return text.replace(EMOJI_REGEX, (em) => `[${toCodepoint(em)}]`);
}

module.exports = { extractEmoji, toCodepoint, emojiInfo, analyseEmoji, replaceEmojiWithCode };
