import { NextResponse } from "next/server";

import { readAdminContentPayload } from "@/lib/cms/server";

export async function GET() {
  const content = await readAdminContentPayload();

  return NextResponse.json(content);
}
