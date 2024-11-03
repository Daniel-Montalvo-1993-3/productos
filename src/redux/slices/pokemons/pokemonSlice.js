import { createSlice } from "@reduxjs/toolkit";


export const pokemonSlice = createSlice({
    name: "pokemons",
    initialState: {
        list: [],
    },
    reducers:{
        setPokemons:(state,action) => {
            console.log("seteando pokemons en redux: ", action.payload);
            state.list = action.payload;
        },
    }
});

export const { setPokemons } = pokemonSlice.actions;