export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const cleanToken = () => {
  localStorage.removeItem('token');
};

export const getToken = (): string | null => {
  const token = localStorage.getItem('token');

  return token;
};
