const API_URL = import.meta.env.VITE_API_URL

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
      throw new Error(`Request failed: ${response.status}`)
    }
    return response.json() as Promise<T>
  } catch (err) {
    console.error("Error with request: " + err);
    throw err
  }


}