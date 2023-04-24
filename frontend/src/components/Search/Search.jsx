import React from "react";
import { Button } from "@mui/material";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import User from "../User/User";
const Search = () => {
  const [name, setName] = React.useState("");
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(getAllUsers(name));
  };
  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );
  return (
    <div className="search">
      <form className="searchForm" onSubmit={(e) => submitHandler(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <Button
          id="searchBtn"
          variant="contained"
          disabled={usersLoading}
          type="submit"
        >
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((user) => {
              return (
                <User
                  key={user._id}
                  name={user.name}
                  userId={user._id}
                  avatar={user.avatar.url}
                />
              );
            })}
        </div>
      </form>
    </div>
  );
};
export default Search;
