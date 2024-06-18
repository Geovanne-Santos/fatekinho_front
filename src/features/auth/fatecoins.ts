import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FatecoinState {
    coins: number;
}
const c = localStorage.getItem("player-money") || "";
const initialState: FatecoinState = {
    coins: c.includes("money") ? JSON.parse(c)?.money : 0
}
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
