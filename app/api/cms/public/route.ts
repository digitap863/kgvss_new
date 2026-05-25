import { NextResponse } from "next/server";

import { readPublicContentPayload } from "@/lib/cms/server";

export async function GET() {
  const content = await readPublicContentPayload();

  return NextResponse.json(content);
}
