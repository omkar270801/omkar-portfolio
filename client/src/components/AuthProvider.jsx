import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_token'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setUser({ authenticated: true });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (jwt) => {
    localStorage.setItem('portfolio_token', jwt);
    setToken(jwt);
    navigate('/admin');
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
