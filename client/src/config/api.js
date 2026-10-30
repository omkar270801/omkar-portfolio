const LOCAL_API_URL = 'http://localhost:5001/api';

export const API_URL = (
  import.meta.env.DEV
    ? LOCAL_API_URL
    : import.meta.env.VITE_API_URL || LOCAL_API_URL
).replace(/\/$/, '');
