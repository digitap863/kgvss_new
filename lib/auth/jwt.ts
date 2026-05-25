import { createHmac, timingSafeEqual } from "node:crypto";

import { env } from "@/lib/env";

export type AdminTokenPayload = {
  sub: string;
  email: string;
  role: "admin";
  exp: number;
};

function base64Url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function sign(value: string) {
  return base64Url(createHmac("sha256", env.jwtSecret).update(value).digest());
}

export function createAdminToken(payload: Omit<AdminTokenPayload, "exp">) {
  const body: AdminTokenPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const content = base64Url(JSON.stringify(body));
  const signature = sign(`${header}.${content}`);

  return `${header}.${content}.${signature}`;
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  const [header, content, signature] = token.split(".");

  if (!header || !content || !signature) {
    return null;
  }

  const expected = sign(`${header}.${content}`);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (
    expectedBuffer.length !== signatureBuffer.length ||
    !timingSafeEqual(expectedBuffer, signatureBuffer)
  ) {
    return null;
  }

  const payload = JSON.parse(
    Buffer.from(content, "base64url").toString("utf8"),
  ) as AdminTokenPayload;

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload.role === "admin" ? payload : null;
}
