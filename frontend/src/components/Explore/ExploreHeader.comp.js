import React, { useEffect, useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import protectedAxios from "../../utils/protectedAxios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useOutsideAlerter from "../../hooks/useOutsideAlerter.hook";

import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../features/user.slice";

function ExploreHeader() {
  const [searchField, setSearchField] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsMenu, setSearchResultsMenu] = useState(false);
  const { allUsers } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setSearchResultsMenu);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await protectedAxios({
        url: "users/all",
        method: "get",
      });

      dispatch(setAllUsers(data));
    };

    getAllUsers();
  }, [dispatch]);

  const search = async (e) => {
    setSearchField(e.target.value);

    const filteredResults = allUsers.filter(({ username }) =>
      username.includes(searchField)
    );

    setSearchResults(filteredResults);
  };

  return (
    <div>
      <div className="flex-items justify-between w-[83vw] sticky top-0 z-40 backdrop-blur-3xl">
        <div
          className="flex-items mx-auto cursor-text h-[2.7rem] rounded-full w-[75%] bg-gray-200 my-2 relative"
          onClick={() => setSearchResultsMenu(true)}
          ref={wrapperRef}
        >
          <div className="px-3 text-gray-600">
            <SearchOutlinedIcon />
          </div>
          <input
            type="text"
            value={searchField}
            onChange={(e) => search(e)}
            className="bg-transparent outline-none placeholder:text-zinc-600 flex-grow h-full w-full max-h-[70%] rounded-full pr-5 text-lg text-gray-700"
            placeholder="Search Twitter"
          />
          {searchResultsMenu && (
            <div className="absolute bg-white shadow-md rounded-xl w-full top-10 h-max max-h-[70vh] overflow-y-auto py-2">
              {searchField ? (
                <div>
                  {searchResults.map(
                    ({ displayname, username, profilePic, _id }) => (
                      <div
                        className="flex space-x-2 hover:bg-gray-200 cursor-pointer transition-color p-2"
                        key={_id}
                      >
                        {!profilePic ? (
                          <div>
                            <AccountCircleOutlinedIcon
                              style={{ fontSize: "2.5rem" }}
                            />
                          </div>
                        ) : (
                          <img src={profilePic} alt="profile_pic" />
                        )}
                        <div>
                          <h1 className="font-bold">{displayname}</h1>
                          <h1 className="truncate text-sm text-gray-600">
                            @{username}
                          </h1>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <h1 className="text-gray-600 text-center py-4">
                  Try searching for people, topics or keywords
                </h1>
              )}
            </div>
          )}
        </div>
        <div className="mr-7 p-1 rounded-full hover:bg-gray-200 cursor-pointer transition-color">
          <SettingsOutlinedIcon />
        </div>
      </div>
      <div className="flex-items">
        <div className="explore-header-option text-black font-bold border-b-4 border-blue-500">
          For you
        </div>
        <div className="explore-header-option">Trending</div>
        <div className="explore-header-option">COVID-19</div>
        <div className="explore-header-option">News</div>
        <div className="explore-header-option">Sports</div>
      </div>
    </div>
  );
}

export default ExploreHeader;
