import "./Header.css";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
const Header = () => {
  const [tab, setTab] = useState(window.location.pathname);
  console.log(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "#99b3ff" }} /> : <HomeOutlined />}
      </Link>
      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "#99b3ff" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>
      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "#99b3ff" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>
      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "#99b3ff" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};
export default Header;
