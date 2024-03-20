import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PostNotes from "../pages/createNote/CreateNotes";
import { Button } from "react-native-paper";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import {
  setVisiblty,
  setAlertType,
  setAlertMessageBody,
} from "../state/slices/alertDialogSlice";
import { reset } from "../state/slices/notesSlice";
import { supabase } from "../supabaseInit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import CameraX from "../components/Camera";
export type HomeAuthStackNavigator = {
  Home: undefined;
  Auth: undefined;
  PostNotes: undefined;
  TakePhotoFromCamera: undefined;
};
const Stack = createNativeStackNavigator<HomeAuthStackNavigator>();
export default function HomeAuthNavigationStack() {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const notesState = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();
  async function SaveNotes() {
    try {
      if (notesState.id === 0) {
        const { data, error } = await supabase.from("notes").insert([
          {
            title: "",
            body: notesState.body,
            userId: authCtx.session?.user.id,
          },
        ]);
        if (error !== null) {
          console.log(error);
          throw new Error(error.details);
        } else {
          console.log("successfully entered data");
          dispatch(setVisiblty());
          dispatch(setAlertType("SUCCESS"));
          dispatch(setAlertMessageBody("Entered succesfully"));
          dispatch(reset());
        }
      } else {
        const { data, error } = await supabase
          .from("notes")
          .update([
            {
              title: "",
              body: notesState.body,
              userId: authCtx.session?.user.id,
            },
          ])
          .eq("id", notesState.id);
        if (error !== null) {
          console.log(error);
          throw new Error(error.details);
        } else {
          console.log("successfully updated data");
          dispatch(setVisiblty());
          dispatch(setAlertType("SUCCESS"));
          dispatch(setAlertMessageBody("Updated succesfully"));
          dispatch(reset());
        }
      }
    } catch (err) {
      dispatch(setVisiblty());
      dispatch(setAlertType("ERROR"));
      dispatch(setAlertMessageBody(String(err)));
    }
  }
  async function post() {
    try {
      setLoading(true);
      await SaveNotes();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Stack.Navigator>
      {authCtx.session !== null ? (
        <Stack.Screen
          name="Home"
          options={{ title: "Home Page" }}
          component={Home}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          options={{ title: "Authentication" }}
          component={Login}
        />
      )}
      <Stack.Screen
        name="PostNotes"
        options={{
          title: "Post Your Note",
          headerRight: (props: HeaderButtonProps) => {
            return (
              <Button
                icon="comment"
                mode="outlined"
                onPress={() => {
                  post();
                }}
                loading={loading}
                style={{ margin: 10 }}
              >
                {notesState.id === 0 ? "Post" : "Update"}
              </Button>
            );
          },
        }}
        component={PostNotes}
      />
      <Stack.Screen
        name="TakePhotoFromCamera"
        options={{ title: "Take a photo", headerShown: false }}
        component={CameraX}
      />
    </Stack.Navigator>
  );
}
