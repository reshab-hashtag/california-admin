import axios from 'axios';
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 //console.log("env",process.env.REACT_APP_API_URL);
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, { refreshToken });
        localStorage.setItem('token', response.data.accessToken); 
        error.config.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
