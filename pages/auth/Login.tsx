import { Reducer, useReducer, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { supabase } from "../../supabaseInit";
type action = {
  actionType: "INPUT_PASSWORD" | "INPUT_USEREMAIL_ID" | "LOGIN_BUTTON_CLICKED";
  payload: string | boolean;
};
type stateForReducer = {
  userEmailId: string;
  password: string;
  loginButtonClicked: boolean;
};
function reducer(state: stateForReducer, action: action): stateForReducer {
  switch (action.actionType) {
    case "INPUT_USEREMAIL_ID":
      return {
        ...state,
        userEmailId: action.payload.toString(),
      };
    case "INPUT_PASSWORD":
      return {
        ...state,
        password: action.payload.toString(),
      };
    case "LOGIN_BUTTON_CLICKED":
      return {
        ...state,
        loginButtonClicked: action.payload ? true : false,
      };
    default:
      throw new Error("Invalid action attempted");
  }
}

export default function Login() {
  const dimensions = useWindowDimensions();
  const [state, dispatch] = useReducer<Reducer<stateForReducer, action>>(
    reducer,
    { userEmailId: "", password: "", loginButtonClicked: false }
  );
  console.log("hello in login");
  async function login() {
    dispatch({ actionType: "LOGIN_BUTTON_CLICKED", payload: true });
    const response = await supabase.auth.signInWithPassword({
      email: state.userEmailId,
      password: state.password,
    });
    dispatch({ actionType: "LOGIN_BUTTON_CLICKED", payload: false });
  }

  return (
    <View style={style.topView}>
      <View style={style.inputAboveView}></View>
      <View style={style.textInputView}>
        <View style={[{ width: 0.8 * dimensions.width }]}>
          <TextInput
            label="Email"
            keyboardType="email-address"
            value={state.userEmailId}
            onChangeText={(text) =>
              dispatch({ actionType: "INPUT_USEREMAIL_ID", payload: text })
            }
            style={style.actualTextInput}
            mode="outlined"
          />
          <TextInput
            secureTextEntry={true}
            label="Password"
            mode="outlined"
            style={style.actualTextInput}
            value={state.password}
            onChangeText={(text) =>
              dispatch({ actionType: "INPUT_PASSWORD", payload: text })
            }
          />
          <Button
            icon="login"
            mode="outlined"
            onPress={() => {
              login();
            }}
            loading={state.loginButtonClicked}
          >
            Login
          </Button>
        </View>
      </View>
    </View>
  );
}
export const style = StyleSheet.create({
  topView: {
    flex: 1,
  },
  inputAboveView: {
    flex: 1,
  },
  textInputView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  actualTextInput: {
    marginBottom: 10,
  },
});
