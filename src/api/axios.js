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
  if (userData === null) return request;
  request.headers.Authorization = `Bearer ${userData?.token}`;
  const accessToken = jwt_decode(userData.token);
  const isExpired = dayjs.unix(accessToken.exp).isBefore(dayjs());
  if (!isExpired) return request;
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
