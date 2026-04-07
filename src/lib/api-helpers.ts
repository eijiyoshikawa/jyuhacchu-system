import { NextRequest, NextResponse } from "next/server"
import { ZodSchema, ZodError } from "zod"

interface ValidationSuccess<T> {
  data: T
  error: null
}

interface ValidationError {
  data: null
  error: NextResponse
}

export async function validateBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<ValidationSuccess<T> | ValidationError> {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    return { data, error: null }
  } catch (e) {
    if (e instanceof ZodError) {
      const details = e.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))
      return {
        data: null,
        error: apiError("バリデーションエラー", 400, details),
      }
    }
    return {
      data: null,
      error: apiError("リクエストの解析に失敗しました", 400),
    }
  }
}

export function apiError(
  message: string,
  status: number,
  details?: unknown
): NextResponse {
  const body: { error: string; details?: unknown } = { error: message }
  if (details !== undefined) {
    body.details = details
  }
  return NextResponse.json(body, { status })
}

export function apiSuccess<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(data, { status })
}
