import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FatecoinState {
    coins: number | null; // Permitir que coins seja null
}
const c = localStorage.getItem("player-money") || "";
const initialState: FatecoinState = {
    coins: (() => {
        const storedMoney = localStorage.getItem("player-money");
        if (storedMoney) {
            try {
                const parsedMoney = JSON.parse(storedMoney);
                return parsedMoney.money || 0; // Valor padrão se money não estiver definido
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                return 0; // Valor padrão em caso de erro
            }
        }
        return 0; // Valor padrão se não houver item armazenado
    })(),
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

export const getCoins = (state: RootState) => state.fatecoin.coins;
