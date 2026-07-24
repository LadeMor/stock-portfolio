const API_URL = import.meta.env.VITE_API_URL

export class ApiError<T = unknown> extends Error {
  status: number
  data: T

  constructor(status: number, message: string, data: T) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export async function apiClient<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {

  try {
    const response = await fetch(`${API_URL}/api${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })


    if (!response.ok) {
      const body = await response.json().catch(() => null)

      throw new ApiError(
        response.status,
        body?.message ?? `Request failed: ${response.status}`,
        body,
      )
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json() as Promise<T>

  } catch (err) {
    console.error("Error with request: " + err);
    throw err
  }


}