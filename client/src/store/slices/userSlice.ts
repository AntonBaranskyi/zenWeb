import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '../../types/IUser';

import axios from '../../services/axios';
import { STATUS } from '../../types/statusEnum';
import { ILoginData } from '../../types/ILoginData';
import { RootState } from '../store';
import { IRegisterData } from '../../types/IRegisterData';

type State = {
  userData: IUser | null;
  status: STATUS;
};

const initialState: State = {
  userData: null,
  status: STATUS.LOADING,
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

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    onLogoutUser: (state) => {
      state.userData = null;

      window.localStorage.removeItem('token');
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = STATUS.LOADING;
    });

    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.userData = action.payload;

      window.localStorage.setItem('token', action.payload.token);
      state.status = STATUS.SUCCESS;
    });

    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = STATUS.ERROR;
      state.userData = null;
    });



    builder.addCase(fetchRegister.pending, (state) => {
      state.status = STATUS.LOADING;
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.userData = action.payload;

      window.localStorage.setItem('token', action.payload.token);
      state.status = STATUS.SUCCESS;
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.status = STATUS.ERROR;
      state.userData = null;
    });
  },
});

export const { onLogoutUser } = userSlice.actions;

export default userSlice.reducer;

export const selectIsAuth = (state: RootState) => Boolean(state.user.userData);
