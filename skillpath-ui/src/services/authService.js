const API_ORIGIN =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://skillpath-api-ajay-gtf2aacvf8cscqer.centralindia-01.azurewebsites.net"
    : "http://127.0.0.1:8000");

const API_BASE_URL = `${API_ORIGIN}/api/v1/auth`;

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

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message ||
        errorData.detail ||
        "Login failed."
    );
  }

  return response.json();
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

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message ||
        errorData.detail ||
        "Registration failed."
    );
  }

  return response.json();
}

export async function getCurrentUser(accessToken) {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message ||
        errorData.detail ||
        "Unable to load the current user."
    );
  }

  return response.json();
}
