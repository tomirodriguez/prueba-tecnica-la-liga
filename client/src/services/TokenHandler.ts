export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string => {
  const token = localStorage.getItem('token');

  return token || '';
};
