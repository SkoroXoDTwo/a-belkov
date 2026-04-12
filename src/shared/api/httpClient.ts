interface HttpClientOptions extends RequestInit {
  query?: Record<string, string | number | undefined | null>;
  timeoutMs?: number;
}

interface HttpErrorPayload {
  message?: string;
}

export class HttpError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "HttpError";
  }
}

function withQuery(path: string, query?: HttpClientOptions["query"]): string {
  if (!query) {
    return path;
  }

  const url = new URL(path, "http://localhost");
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return `${url.pathname}${url.search}`;
}

export async function httpClient<T>(
  path: string,
  options: HttpClientOptions = {}
): Promise<T> {
  const { query, headers, timeoutMs = 10000, signal, ...rest } = options;
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort("Request timeout");
  }, timeoutMs);

  if (signal) {
    signal.addEventListener("abort", () => abortController.abort(), { once: true });
  }

  let response: Response;
  try {
    response = await fetch(withQuery(path, query), {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      cache: "no-store",
      signal: abortController.signal
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (abortController.signal.aborted) {
      throw new HttpError("Request timeout", 408);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    let payload: HttpErrorPayload | null = null;
    try {
      payload = (await response.json()) as HttpErrorPayload;
    } catch {
      payload = null;
    }

    throw new HttpError(payload?.message ?? "Request failed", response.status);
  }

  return (await response.json()) as T;
}
