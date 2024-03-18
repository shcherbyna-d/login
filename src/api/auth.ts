const BASE_URL = "https://auth-qa.qencode.com/v1/auth";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = {
  error: number;
  detail: [];
  timestamp: number;
  access_token: string;
  refresh_token: string;
  token_expire: number;
  refresh_token_expire: number;
};

export type ResetPasswordResponse = {
  error: number;
  detail: [];
  timestamp: number;
};

type Detail = {
  field_name: "email" | "password"; //needs to be discussed in reality
  error: string;
};

export type ErrorResponse = {
  detail: Detail[] | string | number; //meed to discuss about using string and number
  error: number;
  timestamp: number;
};

//Also better to add some error handler but it is too much for test task
export class ApiError extends Error {
  details: ErrorResponse["detail"];

  constructor(message: string, details: ErrorResponse["detail"]) {
    super(message);
    this.details = details;
  }
}

export async function logIn(payload: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      throw new ApiError(response.statusText, errorResponse.detail);
    }

    const data = await response.json();
    return data as LoginResponse;
  } catch (error) {
    // Rethrow the error in the catch above
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      // Handle network errors or other unexpected errors
      throw new ApiError(
        error.message,
        "An unexpected error occurred. Please try again later."
      );
    }

    //just for return type
    throw new ApiError("An unexpected error.", "An unexpected error.");
  }
}

export async function resetPassword(
  email: string
): Promise<ResetPasswordResponse> {
  try {
    const response = await fetch(`${BASE_URL}/password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      throw new ApiError(response.statusText, errorResponse.detail);
    }

    const data = await response.json();
    return data as ResetPasswordResponse;
  } catch (error) {
    // Rethrow the error in the catch above
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      // Handle network errors or other unexpected errors
      throw new ApiError(
        error.message,
        "An unexpected error occurred. Please try again later."
      );
    }

    //just for return type
    throw new ApiError("An unexpected error.", "An unexpected error.");
  }
}

export async function setNewPassword({
  token,
  secret,
  password,
}: {
  token: string;
  secret: string;
  password: string;
}): Promise<ResetPasswordResponse> {
  try {
    const response = await fetch(`${BASE_URL}/password-set`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        secret,
        password,
      }),
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      throw new ApiError(response.statusText, errorResponse.detail);
    }

    const data = await response.json();
    return data as ResetPasswordResponse;
  } catch (error) {
    // Rethrow the error in the catch above
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      // Handle network errors or other unexpected errors
      throw new ApiError(
        error.message,
        "An unexpected error occurred. Please try again later."
      );
    }

    //just for return type
    throw new ApiError("An unexpected error.", "An unexpected error.");
  }
}
