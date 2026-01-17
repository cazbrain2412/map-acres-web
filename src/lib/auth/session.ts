import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";

export async function getSession() {
  const store = await cookies();
  const token = store.get("ma_admin_token")?.value || "";
  return token ? verifyJwt(token) : null;
}

