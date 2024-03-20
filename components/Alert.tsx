import * as React from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Text } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { setVisiblty } from "../state/slices/alertDialogSlice";
const AlertX = () => {
  const AlertState = useSelector((state: RootState) => state.alert);
  const visible = useSelector((state: RootState) => state.alert.visible);
  const dispatch = useDispatch();
  const hideDialog = () => dispatch(setVisiblty());

  return (
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon
          icon={AlertState.type === "SUCCESS" ? "thumb-up-outline" : "alert"}
        />
        <Dialog.Title style={styles.title}>{AlertState.type}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{AlertState.message}</Text>
        </Dialog.Content>
      </Dialog>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

export default AlertX;
