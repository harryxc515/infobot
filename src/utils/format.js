/**
 * formatting helpers
 * uses html parse mode for telegraf
 */

function bold(text) {
  return `<b>${text}</b>`;
}

function code(text) {
  return `<code>${text}</code>`;
}

function pre(text) {
  return `<pre>${text}</pre>`;
}

function link(label, url) {
  return `<a href="${url}">${label}</a>`;
}

function italic(text) {
  return `<i>${text}</i>`;
}

function mono(text) {
  return `<code>${text}</code>`;
}

/**
 * safe html - escapes < > & to avoid telegram parse errors
 */
function safe(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * section header with unicode dash line
 */
function section(title) {
  const line = "\u2500".repeat(20);
  return `${line}\n${bold(title)}\n${line}`;
}

module.exports = { bold, code, pre, link, italic, mono, safe, section };
