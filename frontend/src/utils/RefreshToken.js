import axios from "../api/axios";

function RefreshToken() {
  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const { data } = await axios.post("/auth/refresh/token", {
        token: refreshToken,
      });

      sessionStorage.setItem("accessToken", data.accessToken);

      return data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh();
}

export default RefreshToken;
