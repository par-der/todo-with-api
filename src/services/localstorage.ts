export const getToken = () => {
  const data = JSON.parse(localStorage.getItem('auth-store') || '{}');
  console.log(data);
  return data.state?.token;
};
