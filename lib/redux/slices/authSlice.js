'use client';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    hydrate: (state, action) => {
      const { user, token } = action.payload;
      if (user && token) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { loginSuccess, logout, setLoading, updateUser, hydrate } = authSlice.actions;
export default authSlice.reducer;
