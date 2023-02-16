import axios from "axios";
import { createContext, useContext } from "react";
import useAuth from "../components/hooks/useAuth";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const url = "https://localhost:5002/api";
const AxiosContext = createContext();
export const useAxios = () => {
  return useContext(AxiosContext);
};

export const AxiosContextProvider = ({ children }) => {
  const { user, setUser, logout } = useAuth();
  const authInstance = axios.create({
    withCredentials: true,
    baseURL: url,
  });

  const privateInstance = axios.create({
    withCredentials: true,
    baseURL: url,
  });
  const context = {
    authInstance,
    privateInstance,
  };
  privateInstance.interceptors.request.use(async (request) => {
    try {
      let tokentExpired = dayjs
        .unix(jwt_decode(user.token).exp)
        .isBefore(dayjs());
      if (!tokentExpired) {
        request.headers.Authorization = `Bearer ${user.token}`;
        return request;
      }
      const response = await authInstance({
        method: "post",
        url: `${url}/auth/refresh-token`,
        data: user.token,
        headers: { "Content-Type": "application/json" },
      });
      let data = { email: user.email, token: response.data.token };
      setUser(data);
      localStorage.setItem("user-data", JSON.stringify(data));
      request.headers.Authorization = `Bearer ${response.data.token}`;
    } catch (error) {
      logout();
      window.location.replace("/");
    }
    return request;
  });
  return (
    <AxiosContext.Provider value={context}>{children}</AxiosContext.Provider>
  );
};
