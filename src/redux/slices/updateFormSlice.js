import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const AddFormSlice = createSlice({
    name: 'addForm',
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

export default AddFormSlice.reducer;
export const {open, close} = AddFormSlice.actions;