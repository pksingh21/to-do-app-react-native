import { PostgrestError } from "@supabase/supabase-js";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import FlatListX from "../../components/FlatList";
import { setAllNotes, setUpdates } from "../../state/slices/allNotesSlice";
import { RootState } from "../../state/store";
import { supabase } from "../../supabaseInit";
export type NotesFromDbType = {
  body: string;
  id: number;
  title: string;
  userId: string;
};
export default function Home() {
  const dispatch = useDispatch();
  const [triggerRerender, setTriggerReRender] = useState(false);
  const [notex, setNotex] = useState<NotesFromDbType[]>([]);
  async function GetAllNotes() {
    try {
      const {
        data,
        error,
      }: { data: NotesFromDbType[] | null; error: PostgrestError | null } =
        await supabase.from("notes").select("*");
      if (error !== null) {
        console.log(error);
        throw new Error(error.message);
      }
      if (data === null) {
        throw new Error("Notes table is empty");
      }
      dispatch(setAllNotes(data));
      dispatch(setUpdates());
      setNotex(data);
      setTriggerReRender(true);
    } catch (err) {
      console.log(err);
    }
  }
  const alertStateAffected = useSelector(
    (state: RootState) => state.alert.visible
  );
  useEffect(() => {
    GetAllNotes();
  }, [alertStateAffected]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 8 }}>
        <View style={{ marginBottom: -40, marginTop: 20, marginLeft: 10 }}>
          <Text variant="headlineLarge">Your Notes are here</Text>
        </View>
        <FlatListX />
      </View>
      <View style={{ flex: 1 }}>
        <BottomNavigationBar />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
