const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//const generateShortCode = require("../utils/generateShortCode");

module.exports = async function generateShortCode() {
  const { customAlphabet } = await import('nanoid');
  const nanoid = customAlphabet(alphabet, 6);
  return nanoid();
};