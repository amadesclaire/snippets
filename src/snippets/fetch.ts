class HttpError extends Error {
  constructor(public response: Response) {
    super(`HTTP error ${response.status}`);
  }
}

const testData = "//dummyjson.com/test";

function handleHttpError(status: number) {
  switch (status) {
    case 500: {
      console.log("Internal server error");
      break;
    }
    case 404: {
      console.log("Resource not found");
      break;
    }
  }
}

export async function safeFetch(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new HttpError(response);
    const data = (await response.json()) as ResponseType;
    return [data, null];
  } catch (error) {
    if (error instanceof HttpError) {
      handleHttpError(error.response.status);
    }
    return [null, error];
  }
}

safeFetch(testData);
