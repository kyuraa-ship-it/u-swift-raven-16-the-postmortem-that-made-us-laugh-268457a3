import { mkdirSync, writeFileSync } from "node:fs";

const entry =
  "I asked my agent to rename one variable. It renamed it in 214 files \u2014 the LICENSE, the README, and my commit history \u2014 then asked whether I wanted the project renamed too.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters,
// not only white space, in one or two sentences.
const sentences = entry.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (entry.length < 1 || entry.length > 400) {
  throw new Error(`gate failed: entry is ${entry.length} chars (must be 1-400)`);
}
if (entry.trim().length === 0) throw new Error("gate failed: entry is blank");
if (sentences.length < 1 || sentences.length > 2) {
  throw new Error(`gate failed: ${sentences.length} sentences (must be 1-2)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry + "\n", "utf8");
console.log(`wrote ${entry.length} chars to /output/entry.txt`);
