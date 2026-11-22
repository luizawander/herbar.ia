import { API_BASE_URL } from '../config/api';

export interface HealthResponse {
  status: string;
  service: string;
  timestamp: string;
}

const HEALTH_TIMEOUT_MS = 5000;

/**
 * Queries the backend /health endpoint to verify local network connectivity.
 */
export async function fetchBackendHealth(): Promise<HealthResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return (await response.json()) as HealthResponse;
  } finally {
    clearTimeout(timeoutId);
  }
}

