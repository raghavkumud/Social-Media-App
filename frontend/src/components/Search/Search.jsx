import React from "react";
import { Button, Typography } from "@mui/material";
import "./Search.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import { useSearchParams } from "react-router-dom";
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
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social App
        </Typography>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <Button disabled={usersLoading} type="submit">
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
