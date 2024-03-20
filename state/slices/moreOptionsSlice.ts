import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface MoreOptions {
  visible: boolean;
}
const initialState: MoreOptions = {
  visible: false,
};
export const moreOptionsSlice = createSlice({
  name: "More Options",
  initialState,
  reducers: {
    setVisiblty: (state) => {
      state.visible = !state.visible;
    },
  },
});
export const { setVisiblty } = moreOptionsSlice.actions;
export default moreOptionsSlice.reducer;
