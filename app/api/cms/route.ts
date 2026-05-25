import { NextResponse } from "next/server";

import { readContentStore, writeContentStore } from "@/lib/cms/server";

export async function GET() {
  const content = await readContentStore();

  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const input = await request.json();
  const content = await writeContentStore(input);

  return NextResponse.json(content);
}
