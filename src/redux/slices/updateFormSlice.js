import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const UpdateFormSlice = createSlice({
    name: 'updateForm',
    initialState,
    reducers:{
        open: (state) => {
            state.isOpen = true
        },
        close: (state) => {
            state.isOpen = false
        }
    }
})

export default UpdateFormSlice.reducer;
export const {open, close} = UpdateFormSlice.actions;