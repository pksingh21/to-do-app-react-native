import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Menu,
  Divider,
  PaperProvider,
  Portal,
  Dialog,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { setVisiblty } from "../state/slices/moreOptionsSlice";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";
const MoreOption = () => {
  //   const [visible, setVisible] = React.useState(false);
  const visible = useSelector((state: RootState) => state.moreOptions);
  const dispatch = useDispatch();
  const openMenu = () => dispatch(setVisiblty());

  const closeMenu = () => dispatch(setVisiblty());
  console.log(visible, "visibiltiy state");
  //   React.useEffect(()=>{},[visible])
  return (
    <Dialog visible={visible.visible} onDismiss={closeMenu}>
      {/* <Dialog.Icon
          icon={AlertState.type === "SUCCESS" ? "thumb-up-outline" : "alert"}
  /> */}
      <Dialog.Title style={styles.title}>
        What do you wanna insert ?{" "}
      </Dialog.Title>
      <Dialog.Content>
        <Button
          icon="camera"
          mode="outlined"
          onPress={() => {}}
          style={{ margin: 10 }}
        >
          Photo
        </Button>
        <Button
          icon="format-list-bulleted"
          mode="outlined"
          onPress={() => {}}
          style={{ margin: 10 }}
        >
          List
        </Button>
      </Dialog.Content>
    </Dialog>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

export default MoreOption;
