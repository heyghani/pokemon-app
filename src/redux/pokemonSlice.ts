import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosConfig";
import { Pokemon } from "../types/pokemon";

interface PokemonState {
  list: Pokemon[];
  detail: Pokemon | null;
  myPokemons: { nickname: string; pokemon: Pokemon; renameCount: number }[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  detail: null,
  myPokemons: JSON.parse(localStorage.getItem("myPokemons") || "[]").map(
    (p: Pokemon) => ({ ...p, renameCount: 0 })
  ),
  loading: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await axiosInstance.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );
    return response.data.results;
  }
);

export const fetchPokemonDetail = createAsyncThunk(
  "pokemon/fetchPokemonDetail",
  async (name: string) => {
    const response = await axiosInstance.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  }
);

export const catchPokemon = createAsyncThunk(
  "pokemon/catchPokemon",
  async () => {
    const response = await axiosInstance.get("/pokemon/catch-pokemon");
    return response.data.success;
  }
);

export const releasePokemon = createAsyncThunk(
  "pokemon/releasePokemon",
  async () => {
    const response = await axiosInstance.post("/pokemon/release-pokemon");
    return response.data;
  }
);

export const renamePokemonThunk = createAsyncThunk(
  "pokemon/renamePokemon",
  async ({ name, count }: { name: string; count: number }) => {
    const response = await axiosInstance.post("/pokemon/rename-pokemon", {
      name,
      count,
    });
    return response.data.fibValue;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addPokemon: (
      state,
      action: PayloadAction<{ nickname: string; pokemon: Pokemon }>
    ) => {
      state.myPokemons.push({ ...action.payload, renameCount: 0 });
      localStorage.setItem("myPokemons", JSON.stringify(state.myPokemons));
    },
    removePokemon: (state, action: PayloadAction<string>) => {
      state.myPokemons = state.myPokemons.filter(
        (p) => p.nickname !== action.payload
      );
      localStorage.setItem("myPokemons", JSON.stringify(state.myPokemons));
    },
    renamePokemon: (
      state,
      action: PayloadAction<{ oldNickname: string; newNickname: string }>
    ) => {
      const pokemon = state.myPokemons.find(
        (p) => p.nickname === action.payload.oldNickname
      );
      if (pokemon) {
        pokemon.nickname = action.payload.newNickname;
        pokemon.renameCount += 1;
        localStorage.setItem("myPokemons", JSON.stringify(state.myPokemons));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokémon list";
      })
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.detail = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokémon details";
      })
      .addCase(catchPokemon.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = "Failed to catch Pokémon!";
        }
      })
      .addCase(releasePokemon.fulfilled, (state, action) => {
        if (!action.payload.success) {
          state.error = `Failed to release Pokémon! Random number: ${action.payload.number}`;
        }
      });
  },
});

export const { addPokemon, removePokemon, renamePokemon } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
