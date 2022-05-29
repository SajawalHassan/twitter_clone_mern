import {
  getUserFail,
  getUserPending,
  getUserSuccess,
} from "../features/userSlice";

import axios from "../axios/axios";

export const getUserProfile = () => async (dispatch) => {
  dispatch(getUserPending());
  try {
    const accessToken = sessionStorage.getItem("accessToken");
    const { data, status } = await axios.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error.response.data));
    console.log(error.response.data);
  }
};
