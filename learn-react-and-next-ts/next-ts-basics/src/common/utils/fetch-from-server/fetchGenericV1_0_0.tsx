export async function fetchGeneric<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data: T = await response.json(); // Cast to the generic type
  return data;
}

// Usage
// interface ApiResponse {
//   id: number;
//   name: string;
// }

// fetchGeneric<ApiResponse>("/api/data").then((data) => {
//   console.log(data.id, data.name); // Now `data` is properly typed
// });
