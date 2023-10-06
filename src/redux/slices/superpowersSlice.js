import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {create} from "axios";
import {getSuperheroById} from "../../api/superheroes";
import {getAllSuperpowers} from "../../api/superpowers";

const initialState = {
    loading: false,
    data: [],
    error: ""
};

export const fetchSuperpowers = createAsyncThunk(
    "superpowers/getSuperpowers",
    async () => {
        const response = await getAllSuperpowers();
        console.log(response);
        return response.data;
    }
)

export const SuperpowersSlice = createSlice({
    name: 'superpowers',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSuperpowers.pending, (state) => {
            state.loading = true;
            state.data = [];
            state.error = "";
        });

        builder.addCase(fetchSuperpowers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
        })

        builder.addCase(fetchSuperpowers.rejected, (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.error.message ? action.error.message : "error";
        })
    }
})

