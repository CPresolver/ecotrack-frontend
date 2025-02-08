export async function apiFetch(endpoint, options = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://anastaciopaulino007.pythonanywhere.com/api/";
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
