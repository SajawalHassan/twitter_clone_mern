import React from "react";
import twitterLogo from "../../images/twitter_logo.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/Notifications";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SidebarOption from "./SidebarOption.comp";

import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="px-4 py-2 border-r-[1px] w-[15%] h-screen space-y-2 border-gray-200 flex items-center flex-col">
      <div className="rounded-full transition-color cursor-pointer hover:bg-blue-100 px-2 py-3 w-max">
        <Link to="/home">
          <img src={twitterLogo} alt="twitter_logo" className="h-7" />
        </Link>
      </div>
      <SidebarOption
        MuiIcon={<HomeOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
      <SidebarOption
        MuiIcon={<SearchOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
      <SidebarOption
        MuiIcon={<NotificationsOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
      <SidebarOption
        MuiIcon={<MailOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
      <SidebarOption
        MuiIcon={<BookmarkOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
      <SidebarOption
        MuiIcon={<ListAltOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
      <SidebarOption
        MuiIcon={<PersonOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
      <SidebarOption
        MuiIcon={<MoreHorizOutlinedIcon style={{ fontSize: "2rem" }} />}
      />
    </div>
  );
}

export default Sidebar;
