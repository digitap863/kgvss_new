import { NextResponse } from "next/server";

import { isApiError } from "@/lib/api/errors";

type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

type ApiFailure = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export function successResponse<T>(
  data: T,
  init: { status?: number; message?: string } = {},
) {
  const body: ApiSuccess<T> = {
    success: true,
    data,
    message: init.message,
  };

  return NextResponse.json(body, { status: init.status ?? 200 });
}

export function errorResponse(error: unknown) {
  if (isApiError(error)) {
    const body: ApiFailure = {
      success: false,
      error: {
        message: error.message,
        details: error.details,
      },
    };

    return NextResponse.json(body, { status: error.statusCode });
  }

  const body: ApiFailure = {
    success: false,
    error: {
      message: "Something went wrong.",
    },
  };

  return NextResponse.json(body, { status: 500 });
}
