import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface PictureURIState {
  height: number;
  width: number;
  uri: string;
  updated: boolean;
}
const initialState: PictureURIState = {
  height: 0,
  width: 0,
  uri: "",
  updated: false,
};
export const pictureURISlice = createSlice({
  name: "pictureURISlice",
  initialState,
  reducers: {
    insertPicture: (
      state,
      action: PayloadAction<{ height: number; width: number; uri: string }>
    ) => {
      state.height = action.payload.height;
      state.uri = action.payload.uri;
      state.width = action.payload.width;
    },
    updated: (state) => {
      state.updated = !state.updated;
    },
  },
});
export const { insertPicture , updated } = pictureURISlice.actions;
export default pictureURISlice.reducer;
