import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllSuperheroes, getSuperheroById} from "../../api/superheroes";

const  initialState = {
    loading: false,
    data: [],
    pageNumber: 0,
    pagesAmount: 1,
    error: ""
};

export const fetchAllSuperheroes = createAsyncThunk(
    'superheroes/getAllSuperheroes',
    async (pageNumber) => {
        const response = await getAllSuperheroes(pageNumber);
        console.log(response);
        return response.data;
    }
)

export const SuperheroesSlice = createSlice(
    {
        name: "superheroes",
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(fetchAllSuperheroes.pending, state => {
                state.loading = true;
                // state.data = [];
                // state.error = "";
            })

            builder.addCase(fetchAllSuperheroes.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pagesAmount = action.payload.pagesAmount;
                state.error = ""
            })

            builder.addCase(fetchAllSuperheroes.rejected, (state, action) => {
                state.loading = false;
                // state.data = [];
                state.error = action.error.message ? action.error.message : "error";
            })
        }
    }
)