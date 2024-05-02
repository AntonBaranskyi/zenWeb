import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS } from '../../types/statusEnum';
import { IDeal, IDealResponse } from '../../types/IDeal';

import axios from '../../services/axios';

type State = {
  deals: IDeal[];
  status: STATUS;
};

const initialState: State = {
  deals: [],
  status: STATUS.LOADING,
};

export const fetchDeals = createAsyncThunk('deals/getAll', async () => {
  const response = await axios.get<IDealResponse>('/deals/getAll');

  return response.data;
});

const dealSlice = createSlice({
  name: 'dealSlice',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchDeals.pending, (state) => {
      state.status = STATUS.LOADING;
    });

    builder.addCase(
      fetchDeals.fulfilled,
      (state, action: PayloadAction<IDealResponse>) => {
        state.deals = action.payload.deals;

        state.status = STATUS.SUCCESS;
      }
    );

    builder.addCase(fetchDeals.rejected, (state) => {
      state.status = STATUS.ERROR;
      state.deals = [];
    });
  },
});

// export const {} = dealSlice.actions;

export default dealSlice.reducer;
