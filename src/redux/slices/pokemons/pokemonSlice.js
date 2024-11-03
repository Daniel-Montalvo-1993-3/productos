import { createSlice } from "@reduxjs/toolkit";


export const pokemonSlice = createSlice({
    name: "pokemons",
    initialState: {
        list: localStorage.getItem('pokemons') ? JSON.parse(localStorage.getItem('pokemons')) : [],
    },
    reducers:{
        setPokemons:(state,action) => {
            state.list = action.payload;
            localStorage.setItem('pokemons', JSON.stringify(state.list));
        },
    }
});

export const { setPokemons } = pokemonSlice.actions;