export const saveAccessTokenToSessionStorage = (accessToken: string): void => {
  sessionStorage.setItem("accessToken", accessToken);
};

export const getAccessTokenFromSessionStorage = (): string | null => {
  return sessionStorage.getItem("accessToken");
};
