import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import {SuperheroSlice} from "./slices/superheroSlice";
import {SuperpowersSlice} from "./slices/superpowersSlice";
import {SuperheroesSlice} from "./slices/superheroesSlice";
import AddFormReducer from "./slices/addFormSlice";
import UpdateFormReducer from "./slices/updateFormSlice";

const store = configureStore({
    reducer: {
        superhero: SuperheroSlice.reducer,
        superheroes: SuperheroesSlice.reducer,
        superpowers: SuperpowersSlice.reducer,
        addForm: AddFormReducer,
        updateForm: UpdateFormReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export default store;