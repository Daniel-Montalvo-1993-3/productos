import { createSlice } from "@reduxjs/toolkit";


export const pokemonSlice = createSlice({
    name: "pokemons",
    initialState: {
        // Seteo de pokemones si existen en localstorage si no es un array vacio
        list: localStorage.getItem('pokemons') ? JSON.parse(localStorage.getItem('pokemons')) : [],
    },
    reducers:{
        setPokemons:(state,action) => {
            // Almacenamiento de lista de pokemones
            state.list = action.payload;
            localStorage.setItem('pokemons', JSON.stringify(state.list));
        },
    }
});

export const { setPokemons } = pokemonSlice.actions;