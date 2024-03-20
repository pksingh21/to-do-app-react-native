import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface NotesState {
  id: number;
  title: string;
  body: string;
  image_link: string[];
}
const initialState: NotesState = {
  id: 0,
  title: "",
  body: "",
  image_link: [],
};
export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotesTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setNotesBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    setNotesId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setImageLink: (state, action: PayloadAction<string>) => {
      state.image_link.push(action.payload);
    },
    reset: (state) => {
      state.body = "";
      state.title = "";
      state.id = 0;
      state.image_link = [];
    },
  },
});
export const { setNotesId, setNotesTitle, setNotesBody, reset , setImageLink } =
  noteSlice.actions;
export default noteSlice.reducer;
