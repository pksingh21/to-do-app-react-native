import { PostgrestSingleResponse } from "@supabase/supabase-js";
import * as React from "react";
import { Button, Card, Text, TouchableRipple } from "react-native-paper";
import {
  setAlertMessageBody,
  setAlertType,
  setVisiblty,
} from "../state/slices/alertDialogSlice";
import { supabase } from "../supabaseInit";
import { useDispatch } from "react-redux";
import { View, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeAuthStackNavigator } from "../navigator/HomeAuthStackNavigator";
import { reset, setNotesBody, setNotesId } from "../state/slices/notesSlice";
interface NotesCardProp {
  title: string;
  content: string;
  id: number;
}
function NotesCard(props: NotesCardProp) {
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeAuthStackNavigator>>();
  async function deleteGivenNote() {
    try {
      const { error }: PostgrestSingleResponse<null> = await supabase
        .from("notes")
        .delete()
        .eq("id", `${props.id}`);
      if (error !== null) {
        console.log(error);
        throw new Error(error.message);
      }

      dispatch(setVisiblty());
      dispatch(setAlertType("SUCCESS"));
      dispatch(setAlertMessageBody("Note deleted successfully"));
      dispatch(reset());
    } catch (err) {
      console.log(err);
      dispatch(setVisiblty());
      dispatch(setAlertType("ERROR"));
      dispatch(setAlertMessageBody(err as string));
    }
  }
  return (
    <Card>
      <TouchableRipple
        onPress={() => {
          dispatch(setNotesId(props.id));
          dispatch(setNotesBody(props.content));
          navigation.push("PostNotes");
        }}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View style={{ marginTop: 10 }}>
          <Card.Content>
            <RenderHtml
              contentWidth={dimensions.width}
              source={{ html: props.content }}
            />
          </Card.Content>
        </View>
      </TouchableRipple>
      <Card.Actions>
        <Button
          onPress={() => {
            deleteGivenNote();
          }}
          icon={"delete"}
        >
          {"Delete"}
        </Button>
      </Card.Actions>
    </Card>
  );
}

export default NotesCard;
