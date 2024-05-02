import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';

import axios from '../../services/axios';
import { STATUS } from '../../types/statusEnum';
import { ILoginData } from '../../types/ILoginData';
import { RootState } from '../store';
import { IRegisterData } from '../../types/IRegisterData';

type State = {
  userData: IUser | null;
  loginStatus: STATUS;
  registerStatus: STATUS;
};

const initialState: State = {
  userData: null,
  loginStatus: STATUS.LOADING,
  registerStatus: STATUS.LOADING,
};

export const fetchLogin = createAsyncThunk(
  'auth/login',
  async (params: ILoginData) => {
    const response = await axios.post<IUser>('/auth/login', params);

    return response.data;
  }
);

export const fetchRegister = createAsyncThunk(
  'auth/register',
  async (params: IRegisterData) => {
    const response = await axios.post<IUser>('/auth/register', params);

    return response.data;
  }
);

export const fetchAuthMe = createAsyncThunk('auth/me', async () => {
  const response = await axios.get('/auth/me');

  return response.data;
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    onLogoutUser: (state) => {
      state.userData = null;

      window.localStorage.removeItem('token');
    },

    onCleanErrors: (state) => {
      state.loginStatus === STATUS.LOADING;
      state.registerStatus = STATUS.LOADING;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loginStatus = STATUS.LOADING;
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.userData = action.payload;

      window.localStorage.setItem('token', action.payload.token);
      state.loginStatus = STATUS.SUCCESS;
    });

    builder.addCase(fetchLogin.rejected, (state) => {
      state.loginStatus = STATUS.ERROR;
      state.userData = null;
    });

    builder.addCase(fetchRegister.pending, (state) => {
      state.registerStatus = STATUS.LOADING;
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.userData = action.payload;

      window.localStorage.setItem('token', action.payload.token);
      state.registerStatus = STATUS.SUCCESS;
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.registerStatus = STATUS.ERROR;
      state.userData = null;
    });

    builder.addCase(fetchAuthMe.pending, (state) => {
      state.loginStatus = STATUS.LOADING;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.userData = action.payload;

      state.loginStatus = STATUS.SUCCESS;
    });

    builder.addCase(fetchAuthMe.rejected, (state) => {
      // state.status = STATUS.ERROR;
      state.userData = null;
    });
  },
});

export const { onLogoutUser, onCleanErrors } = userSlice.actions;

export default userSlice.reducer;

export const selectIsAuth = (state: RootState) => Boolean(state.user.userData);
