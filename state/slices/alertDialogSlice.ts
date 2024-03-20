import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AlertDialogState {
  type: "ERROR" | "SUCCESS";
  message: string;
  visible: boolean;
}
const initialState: AlertDialogState = {
  type: "ERROR",
  message: "",
  visible: false,
};
export const alertDialogSlice = createSlice({
  name: "alertInfo",
  initialState,
  reducers: {
    setVisiblty: (state) => {
      state.visible = !state.visible;
    },
    setAlertType: (state, action: PayloadAction<"ERROR" | "SUCCESS">) => {
      state.type = action.payload;
    },
    setAlertMessageBody: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});
export const { setAlertType, setAlertMessageBody, setVisiblty } = alertDialogSlice.actions;
export default alertDialogSlice.reducer;
