import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import tvseriesReducer from "./slices/tvseries.slice";
import moviesReducer from "./slices/movies.slice";

const store = configureStore({
    reducer: {
        user: userReducer,
        tvseries: tvseriesReducer,
        movies: moviesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;