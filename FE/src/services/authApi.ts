import { requestApi } from "../api/http";
import type { AuthResponseDto } from "../types/auth";

export async function loginWithGoogle(idToken: string): Promise<AuthResponseDto> {
  return requestApi<AuthResponseDto>("/Auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken })
  });
}

export async function registerUser(payload: {
  username: string;
  name: string;
  email?: string;        // optional
  password: string;
}): Promise<AuthResponseDto> {
  return requestApi<AuthResponseDto>("/Auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function loginWithCredentials(payload: {
  usernameOrEmail: string;  // username OR email — either works
  password: string;
}): Promise<AuthResponseDto> {
  return requestApi<AuthResponseDto>("/Auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}