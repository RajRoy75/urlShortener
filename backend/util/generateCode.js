const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function generateCode(length = 6) {
  let code = "";
  const max = chars.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * max);
    code += chars[randomIndex];
  }

  return code;
}
