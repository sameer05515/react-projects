interface FetchOptions extends Omit<RequestInit, "body"> {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Strict typing for HTTP methods
  headers?: Record<string, string>;
  body?: string | object | null; // Updated body type for string or object
}

export async function fetchGeneric<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const { body, ...restOptions } = options || {};

  // Convert body to JSON if it's an object and the method requires a body
  const requestBody: BodyInit | null = body
    ? typeof body === "string"
      ? body
      : JSON.stringify(body) // Convert object to string for the body
    : null;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: requestBody, // Pass the properly typed body
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: T = await response.json(); // Assuming JSON response
  return data;
}
