import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
name: ' auth',
initialState: {
    status: 'not-authenticate',
    user: undefined,
    resultado: undefined,
    errorMessage: undefined,
},
reducers: {
    onChecking: (state) => {
        state.status = 'checking';
        state.user = {};
        state.resultado = undefined;
        state.errorMessage = undefined;
    },
    onLogin: (state, {payload}) => {
        state.status = 'checking';
        state.user = payload;
        state.resultado = undefined;
        state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
        state.status = 'not-authenticated';
        state.user = {};
        state.resultado = undefined;
        state.errorMessage = payload;
    },
    onRegistroUsuario: (state, { payload }) => {
        state.status = 'not-authenticated';
        state.user = {};
        state.resultado = payload;
        state.errorMessage = undefined;
    },
    limpiarMesajeExito:(state) => {
        state.status = 'not-authenticated';
        state.user = {};
        state.resultado = undefined;
        state.errorMessage = undefined;
    },
    clearErrorMessage:(state) => {
        state.errorMessage = undefined;
    }
}
});

export const { onChecking, onLogin,onLogout, clearErrorMessage, onRegistroUsuario,limpiarMesajeExito } = authSlice.actions;