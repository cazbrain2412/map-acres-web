import { promises as fs } from "fs";
import path from "path";

export type HomePayload = any;

const filePath = path.join(process.cwd(), "data", "home.json");

export async function readHome(): Promise<HomePayload> {
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function writeHome(payload: HomePayload): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf-8");
}

