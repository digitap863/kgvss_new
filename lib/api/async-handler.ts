import type { NextRequest } from "next/server";

import { errorResponse } from "@/lib/api/response";

type RouteContext = {
  params: Promise<Record<string, string>>;
};

export function asyncHandler(
  handler: (request: NextRequest, context: RouteContext) => Promise<Response>,
) {
  return async (request: NextRequest, context: RouteContext) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return errorResponse(error);
    }
  };
}
