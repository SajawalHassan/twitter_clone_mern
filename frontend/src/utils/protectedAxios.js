import axios from "../api/axios";
import RefreshToken from "../utils/RefreshToken";

function protectedAxios({ url, body, method }) {
  const protectedAxios = async () => {
    const accessToken = sessionStorage.getItem("accessToken");

    // POST
    if (method === "post") {
      try {
        await axios.post(url, body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        return { status: 200, error: "" };
      } catch (error) {
        if (error.response.status === 403) {
          const refreshTokenResponse = await RefreshToken();
          try {
            await axios.post(url, body, {
              headers: { Authorization: `Bearer ${refreshTokenResponse}` },
            });

            return { status: 200, error: "" };
          } catch (error) {
            return { error: error.response.data, status: 400 };
          }
        }
        if (error.response.status === 403) return;
        return { error: error.response.data, status: 400 };
      }
    }

    // PUT
    if (method === "put") {
      try {
        await axios.put(url, body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        return { status: 200, error: "" };
      } catch (error) {
        if (error.response.status === 403) {
          const refreshTokenResponse = await RefreshToken();
          try {
            await axios.put(url, body, {
              headers: { Authorization: `Bearer ${refreshTokenResponse}` },
            });

            return { status: 200, error: "" };
          } catch (error) {
            return { error: error.response.data, status: 400 };
          }
        }
        if (error.response.status === 403) return;
        return { error: error.response.data, status: 400 };
      }
    }

    // DELETE
    if (method === "delete") {
      try {
        await axios.delete(url, body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        return { status: 200, error: "" };
      } catch (error) {
        if (error.response.status === 403) {
          const refreshTokenResponse = await RefreshToken();
          try {
            await axios.delete(url, body, {
              headers: { Authorization: `Bearer ${refreshTokenResponse}` },
            });

            return { status: 200, error: "" };
          } catch (error) {
            return { error: error.response.data, status: 400 };
          }
        }
        if (error.response.status === 403) return;
        return { error: error.response.data, status: 400 };
      }
    }

    // GET
    if (method === "get") {
      try {
        await axios.get(url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        return { status: 200, error: "" };
      } catch (error) {
        if (error.response.status === 403) {
          const refreshTokenResponse = await RefreshToken();
          try {
            await axios.get(url, {
              headers: { Authorization: `Bearer ${refreshTokenResponse}` },
            });

            return { status: 200, error: "" };
          } catch (error) {
            return { error: error.response.data, status: 400 };
          }
        }
        if (error.response.status === 403) return;
        return { error: error.response.data, status: 400 };
      }
    }
  };
  return protectedAxios();
}

export default protectedAxios;
