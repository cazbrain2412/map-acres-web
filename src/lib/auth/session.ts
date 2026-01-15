import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";

export async function getSession() {
  const store = await cookies();
  const token = store.get("mapacres_token")?.value || "";
  const payload = token ? verifyJwt(token) : null;
  return payload;
}

