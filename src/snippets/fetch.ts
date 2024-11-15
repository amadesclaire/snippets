class HttpError extends Error {
  constructor(public response: Response) {
    super(
      `HTTP error ${response.status}: ${response.statusText} @ ${response.url}`
    );
  }
}

type Result<T> = Promise<[T | null, Error | HttpError | null]>;

export async function fetchResult<T>(
  url: URL,
  options: RequestInit = {}
): Result<T> {
  try {
    const response = (await fetch(url, options)) as Response;
    if (!response.ok) throw new HttpError(response);
    const data = (await response.json()) as T;
    return [data, null];
  } catch (error) {
    if (error instanceof HttpError) {
      return [null, error];
    }
    if (error instanceof Error) {
      return [null, new Error(`Network error: ${error.message}`)];
    }
    return [null, new Error("Unknown error occurred")];
  }
}

type Test = { test: string };

const url = new URL("https://dummyjson.com/test");

const [data, err] = await fetchResult<Test>(url);
