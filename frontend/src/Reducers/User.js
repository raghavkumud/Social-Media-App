import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};
export const userReducer = createReducer(initialState, {
  LoginRequest: (state, action) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state, action) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state, action) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LogOutUserRequest: (state, action) => {
    state.loading = true;
  },
  LogOutUserSuccess: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogOutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
export const postOfFollowingReducer = createReducer(initialState, {
  PostOfFollowingRequest: (state) => {
    state.loading = true;
  },
  PostOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  PostOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
export const allUsersReducer = createReducer(initialState, {
  allUsersRequest: (state) => {
    state.usersLoading = true;
  },
  allUsersSuccess: (state, action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.usersLoading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});

export const userProfileReducer = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loading = true;
  },
  userProfileSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  userProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
});
