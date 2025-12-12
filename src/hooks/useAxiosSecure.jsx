import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_api_URL,
});

const useAxiosSecure = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user?.accessToken) {
      // intercept request
      const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${user?.accessToken}`;

        return config;
      });

      // interceptor response
      const resInterceptor = axiosSecure.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log(error); 

          const statusCode = error.status;
          if (statusCode === 401 || statusCode === 403) {
            logout().then(() => {
              navigate("/login");
            });
          }

          return Promise.reject(error);
        }
      );
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }
  }, [user, loading, logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
