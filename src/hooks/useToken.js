import { useState } from "react";


const useToken = () => {
  const getToken = () => {
    const token = localStorage.getItem('auth-token');
    return token;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (token) => {
    localStorage.setItem('auth-token', token);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token
  };
}

export default useToken;