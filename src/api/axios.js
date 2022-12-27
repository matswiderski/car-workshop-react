import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
const url = "https://localhost:5002/api";
let userData = localStorage.getItem("user-data")
  ? JSON.parse(localStorage.getItem("user-data"))
  : null;
const instance = axios.create({
  withCredentials: true,
  baseURL: url,
  headers: { Authorization: `Bearer ${userData?.token}` },
});

const privateInstance = axios.create({
  withCredentials: true,
  baseURL: url,
});

instance.interceptors.request.use(async (request) => {
  if (userData === null){
    userData = localStorage.getItem("user-data")
      ? JSON.parse(localStorage.getItem("user-data"))
      : null;
    if (userData === null) return request;
  }
  console.log(userData);
  const isTokenExpired = dayjs
    .unix(jwt_decode(userData.token))
    .isBefore(dayjs());
  if (!isTokenExpired) {
    request.headers.Authorization = `Bearer ${userData?.token}`;
    return request;
  }
  try {
    const response = await privateInstance({
      method: "post",
      url: `${url}/auth/refresh-token`,
      data: userData.token,
      headers: { "Content-Type": "application/json" },
    });
    userData = { email: userData.email, token: response.data.token };
    localStorage.setItem("user-data", JSON.stringify(userData));
    request.headers.Authorization = `Bearer ${response.data.token}`;
  } catch (error) {
    console.log(error);
  }
  return request;
});

export default instance;
