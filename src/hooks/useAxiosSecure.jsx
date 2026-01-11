import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_api_URL,
});

const useAxiosSecure = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // intercept request
      const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
          "token"
        )}`;

        return config;
      });

      // interceptor response
      const resInterceptor = axiosSecure.interceptors.response.use(
        (response) => {
          // Handle Demo Mode response (sent as 200 with isDemo: true)
          if (response?.data?.isDemo) {
            return Promise.reject(new Error(response.data.message));
          }
          return response;
        },
        async (error) => {
          const statusCode = error.response?.status;

          // Handle true Authorization/Unauthorized errors (Log out)
          if (statusCode === 401 || statusCode === 403) {
            await logout();
            navigate("/login");
          }

          return Promise.reject(error);
        }
      );
      return () => {
        axiosSecure.interceptors.request.eject(reqInterceptor);
        axiosSecure.interceptors.response.eject(resInterceptor);
      };
    }
  }, [user, loading, logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
