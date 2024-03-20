import MasonryList from "@react-native-seoul/masonry-list";
import React, { memo, useState } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { NotesFromDbType } from "../pages/Home/Home";
import { RootState } from "../state/store";
import AlertX from "./Alert";
import NotesCard from "./SingleNoteCard";
type ItemData = {
  id: string;
  title: string;
};

type ItemProps = {
  item: NotesFromDbType;
  onPress: () => void;
};

const Item = ({ item, onPress }: ItemProps) => (
  <View style={{ margin: 3 }}>
    <NotesCard title={item.title} content={item.body} id={item.id} />
  </View>
);

const FlatListX = () => {
  const [selectedId, setSelectedId] = useState<string>();
  const dimensions = useWindowDimensions();
  const renderItem = ({
    item,
    index,
  }: {
    item: NotesFromDbType;
    index: number;
  }) => {
    return (
      <Item item={item} onPress={() => setSelectedId(item.id.toString())} />
    );
  };
  const allNotes = useSelector((state: RootState) => state.allNotes);
  const alertState = useSelector((state: RootState) => state.alert);
  console.log(alertState, "alert state updated ? ");
  return (
    <SafeAreaView style={[styles.container, { width: dimensions.width * 1 }]}>
      <MasonryList
        data={allNotes.notes}
        renderItem={({ item, i }: { item: unknown; i: number }) => (
          <Item
            item={item as NotesFromDbType}
            onPress={() => {
              setSelectedId((item as NotesFromDbType).id.toString());
            }}
          />
        )}
        numColumns={allNotes.notes.length > 3 ? 2 : 1}
        keyExtractor={(item) => item.id.toString()}
      />
      <AlertX />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  title: {
    fontSize: 20,
  },
  bodyText: {
    fontSize: 15,
  },
});

export default memo(FlatListX);
