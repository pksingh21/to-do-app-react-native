import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import modalReducer from "./slices/modalOpenSlice";
import notesReducer from "./slices/notesSlice";
import alertReducer from "./slices/alertDialogSlice";
import allNotesReducer from "./slices/allNotesSlice";
import moreOptionsReducer from "./slices/moreOptionsSlice";
import picturesURIReducer from "./slices/picturesURISlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    notes: notesReducer,
    alert: alertReducer,
    allNotes: allNotesReducer,
    moreOptions: moreOptionsReducer,
    pictureURI: picturesURIReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
