export function validateURL(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}
