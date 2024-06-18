import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FatecoinState {
    coins: number;
}

const initialState: FatecoinState = {
    coins: localStorage.getItem("player-money") ? JSON.parse(localStorage.getItem("user") || "").money : null,
};

const fatecoinSlice = createSlice({
  name: 'fatecoin',
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<number>) {
      state.coins = action.payload;
    },
  },
});

export const { setCoins } = fatecoinSlice.actions;
export default fatecoinSlice.reducer;

export const getCoins = (state: RootState) => state.fatecoin.coins
