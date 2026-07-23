import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const NUMBERS_FILE = path.join(DATA_DIR, "numbers.json");
const COUNTER_FILE = path.join(DATA_DIR, "counter.json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson<T>(filePath: string, defaultValue: T): T {
  ensureDir();
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue), "utf-8");
    return defaultValue;
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return defaultValue;
  }
}

function writeJson(filePath: string, data: unknown) {
  ensureDir();
  fs.writeFileSync(filePath, JSON.stringify(data), "utf-8");
}

export function getNumbers(): string[] {
  return readJson<string[]>(NUMBERS_FILE, []);
}

export function saveNumbers(numbers: string[]) {
  writeJson(NUMBERS_FILE, numbers);
}

export function getCounter(): number {
  return readJson<number>(COUNTER_FILE, 0);
}

export function incrementCounter(): number {
  let counter = getCounter();
  counter = (counter + 1) % 1000000;
  writeJson(COUNTER_FILE, counter);
  return counter;
}

export function resetCounter() {
  writeJson(COUNTER_FILE, 0);
}
