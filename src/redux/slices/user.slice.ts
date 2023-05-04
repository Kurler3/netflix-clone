import { IMovie } from "../../types/movie.types";
import { ITvSeries } from "../../types/tvseries.types";
import {v4 as uuid} from 'uuid';
import {
    createSlice
} from "@reduxjs/toolkit"

/////////////////////////////////////
// DEFINE USER TYPE /////////////////
/////////////////////////////////////

export type IUser = {
    id: string;
    firstName: string;
    lastName: string;
    list: (IMovie | ITvSeries)[];
}

////////////////////////////////////
// DEFINE INITIAL STATE FOR SLICE //
////////////////////////////////////

const initialState: IUser = {
    id: uuid(),
    firstName: "Fake",
    lastName: "User",
    list: [],
};

//////////////////////////////////////
// DEFINE SLICE //////////////////////
//////////////////////////////////////

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addMediaToList: (state, action) => {
            state.list.push(action.payload);
         }
    },
});

//////////////////////////////////////
// EXPORT ACTIONS ////////////////////
//////////////////////////////////////

export const {
    addMediaToList
} = userSlice.actions;

//////////////////////////////////////
// EXPORT REDUCER ////////////////////
//////////////////////////////////////

export default userSlice.reducer;