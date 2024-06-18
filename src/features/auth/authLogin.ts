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

const initialState: AuthState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "").usuario : null,
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
      console.log(action.payload)
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;

      // Limpar as informações do usuário do localStorage ao fazer logout
      // localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    },

  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const getUserCredentials = (state: RootState) => state.auth.user
export const getUserId = (state: RootState) => state.auth.user?.idCliente
