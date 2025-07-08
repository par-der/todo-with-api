export const getToken = () => {
  const data = JSON.parse(localStorage.getItem('auth-store') || '{}');
  return data.state?.token;
};
