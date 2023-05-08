import { RootState } from "../store";

export const getSearchText = (state:RootState) => state.app.searchText;