import Constants from 'expo-constants';

const DEFAULT_BACKEND_PORT = 3000;

/**
 * Resolves the local NestJS API base URL.
 * Prefers EXPO_PUBLIC_API_URL, falling back to the Metro host IP in Expo Go
 * so physical devices on the same Wi-Fi connect without manual configuration.
 */
export function resolveApiBaseUrl(): string {
  const envUrl = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }

  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host) {
      return `http://${host}:${DEFAULT_BACKEND_PORT}`;
    }
  }

  return `http://localhost:${DEFAULT_BACKEND_PORT}`;
}

export const API_BASE_URL = resolveApiBaseUrl();

