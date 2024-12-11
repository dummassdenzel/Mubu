// My Base URL for all API requests
const BASE_URL = "http://localhost/mubu/api";

// Utility function to handle authenticated API requests
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  // Get authentication token from localStorage
  const token = localStorage.getItem("token");

  // Construct headers object: (THIS ISNT NECESSARY FOR NOW, BUT I'M KEEPING IT FOR FUTURE USE)
  // - Set default Content-Type to JSON
  // - Add Authorization header if token exists
  // - Merge any additional headers from options
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  // Make the API request with constructed headers and any additional options
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  // Handle error responses
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status?.message || 'Request failed');
  }

  // Parse and return JSON response
  const jsonResponse = await response.json();
  return jsonResponse;
}

// Export API utility object with common HTTP methods
export const api = {
  // GET request
  get: (endpoint: string) => fetchWithAuth(endpoint),

  // POST request for JSON data
  post: (endpoint: string, data: any) =>
    fetchWithAuth(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Special POST method for handling FormData
  // This DOESN'T use fetchWithAuth because FormData requires different content-type handling
  postFormData: async (endpoint: string, formData: FormData) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
  },
};
