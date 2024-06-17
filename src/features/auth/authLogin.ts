import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Estado inicial para o usuário (pode ser um objeto com mais informações)
  isAuthenticated: false, // Estado inicial para autenticação
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // Lógica para atualizar o estado após o login
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      // Lógica para atualizar o estado após o logout
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
