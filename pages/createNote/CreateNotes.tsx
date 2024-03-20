import { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import QuillEditorX from "../../components/QuillEditor";
import { NotesFromDbType } from "../Home/Home";
import AlertX from "../../components/Alert";

export default function PostNotes() {
  const dispatch = useDispatch();
  const dimensions = useWindowDimensions();
  return (
    <View style={[styles.container, { width: dimensions.width }]}>
      <QuillEditorX />
      <AlertX />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
