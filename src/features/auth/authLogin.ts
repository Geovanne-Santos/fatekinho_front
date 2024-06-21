import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
  email: string;
  idCliente: number;
  // Outros campos do usuário, se houver
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
const c = localStorage.getItem("user") || "";
const initialState: AuthState = {
  user: c.includes("idCliente") ? JSON.parse(c) : null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Salvar informações do usuário no localStorage
      // localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },

  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const getUserCredentials = (state: RootState) => state.auth.user
export const getUserId = (state: RootState) => state.auth.user?.idCliente
