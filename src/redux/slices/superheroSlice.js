import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getSuperheroById} from "../../api/superheroes";

const  initialState = {
    loading: false,
    data: {},
    error: ""
};

export const fetchSuperheroById = createAsyncThunk(
    'superheroes/getSuperheroById',
    async (id) => {
        const response = await getSuperheroById(id);
        return response.data;
    }
)

export const SuperheroSlice = createSlice(
    {
        name: "superhero",
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(fetchSuperheroById.pending, state => {
                state.loading = true;
                state.data = {};
                state.error = "";
            })

            builder.addCase(fetchSuperheroById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = ""
            })

            builder.addCase(fetchSuperheroById.rejected, (state, action) => {
                state.loading = false;
                state.data = {};
                state.error = action.error.message ? action.error.message : "error";
            })
        }
    }
)