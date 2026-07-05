/**
 * Security utilities for the web client.
 * Currently provides simple sanitisation for user‑provided strings.
 */

/**
 * Escape HTML special characters to prevent injection when rendering user input.
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
