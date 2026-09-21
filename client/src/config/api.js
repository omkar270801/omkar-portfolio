const LOCAL_API_URL = 'http://localhost:5000/api';
const PRODUCTION_API_URL = 'https://omkar-portfolio-wc0k.onrender.com/api';

export const API_URL = (
  import.meta.env.VITE_API_URL
  || (import.meta.env.DEV ? LOCAL_API_URL : PRODUCTION_API_URL)
).replace(/\/$/, '');
