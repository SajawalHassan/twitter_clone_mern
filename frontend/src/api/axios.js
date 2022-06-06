import axios from "axios";

const BASE_URL = "http://localhost:5000";
const accessToken = sessionStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const client = axios.create({ baseURL: BASE_URL });

export const axiosAuth = ({ ...options }) => {
  // Sending access token with request
  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    if (error.response.status === 403) {
      // Making function to generate new access token
      const refresh = async () => {
        const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
          token: refreshToken,
        });
        return data;
      };

      // Generating access token
      const newAccessToken = refresh();

      sessionStorage.setItem("accessToken", newAccessToken);
      return client({ ...options });
    }

    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};
