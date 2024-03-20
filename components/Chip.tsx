import * as React from "react";
import { Chip } from "react-native-paper";
interface Props {
  textToBeDisplayed: string;
  setRatio: (value: React.SetStateAction<string>) => void;
  setIsRatioSet: (value: React.SetStateAction<boolean>) => void;
}
const MyChip = (props: Props) => (
  <Chip
    icon="information"
    onPress={() => {
      props.setRatio(props.textToBeDisplayed);
    }}
    mode="outlined"
    style={{ margin: 4 }}
  >
    {props.textToBeDisplayed}
  </Chip>
);

export default MyChip;
