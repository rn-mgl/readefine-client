import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

// Define the substitution key
const CIPHER_KEY = {
  0: "X",
  1: "V",
  2: "Q",
  3: "F",
  4: "K",
  5: "N",
  6: "E",
  7: "H",
  8: "I",
  9: "P",
};

const DECIPHER_KEY = {
  X: 0,
  V: 1,
  Q: 2,
  F: 3,
  K: 4,
  N: 5,
  E: 6,
  H: 7,
  I: 8,
  P: 9,
};

// Cipher function
export const cipher = (primaryKey) => {
  // Convert the primary key to a string
  const primaryKeyStr = String(primaryKey);

  const randomId = nanoid();

  // Apply the substitution cipher
  const cipherText = Array.from(primaryKeyStr, (char) => CIPHER_KEY[char]).join("");

  return randomId + "_" + cipherText;
};

// Decipher function
export const decipher = (encodedText) => {
  // Reverse the substitution cipher
  const key = encodedText.split("_")[1];

  const primaryKeyStr = Array.from(key, (char) => DECIPHER_KEY[char]).join("");

  return parseInt(primaryKeyStr);
};
