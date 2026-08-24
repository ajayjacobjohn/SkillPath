const API_ORIGIN =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://skillpath-api-ajay-gtf2aacvf8cscqer.centralindia-01.azurewebsites.net"
    : "http://127.0.0.1:8000");

const API_BASE_URL = `${API_ORIGIN}/api/v1/auth`;

async function parseApiResponse(response, fallbackMessage) {
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      responseBody.message ||
        responseBody.detail ||
        fallbackMessage
    );
  }

  return responseBody.data;
}

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return parseApiResponse(response, "Login failed.");
}

export async function register(email, password, confirmPassword) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      confirm_password: confirmPassword,
    }),
  });

  return parseApiResponse(response, "Registration failed.");
}

export async function getCurrentUser(accessToken) {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return parseApiResponse(
    response,
    "Unable to load the current user."
  );
}
