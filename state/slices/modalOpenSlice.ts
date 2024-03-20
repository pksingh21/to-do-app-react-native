import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ModalOpenState {
  open: boolean;
}
const initialState: ModalOpenState = {
  open: false,
};
export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    OpenModal: (state) => {
      state.open = true;
    },
    CloseModal: (state) => {
      state.open = false;
    },
  },
});
export const { OpenModal, CloseModal } = ModalSlice.actions;
export default ModalSlice.reducer;
