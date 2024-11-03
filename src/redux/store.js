import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./slices/pokemons/pokemonSlice";


export const store = configureStore({
    reducer:{
        pokemons: pokemonSlice.reducer,
    }
})

export default store;