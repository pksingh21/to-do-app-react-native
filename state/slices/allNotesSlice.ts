import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NotesState } from "./notesSlice";
import { NotesFromDbType } from "../../pages/Home/Home";
interface allNotesState {
  updated: boolean;
  notes: NotesFromDbType[];
}
const initialState: allNotesState = {
  updated: false,
  notes: [],
};
export const noteSlice = createSlice({
  name: "allNotes",
  initialState,
  reducers: {
    // we have to define some reducers for it as well
    setAllNotes: (state, action: PayloadAction<NotesFromDbType[]>) => {
      state.notes = action.payload;
    },
    setUpdates: (state) => {
      state.updated = !state.updated;
    },
  },
});
export const { setAllNotes , setUpdates } = noteSlice.actions;
export default noteSlice.reducer;
