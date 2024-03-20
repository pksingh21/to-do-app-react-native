import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./context/AuthContext";
import HomeAuthNavigationStack from "./navigator/HomeAuthStackNavigator";
import { Provider } from "react-redux";
import { store } from "./state/store";
import { Provider as ProviderX } from "react-native-paper";
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <ProviderX>
          <AuthProvider userLoggedIn={false} session={null}>
            <HomeAuthNavigationStack />
            <StatusBar />
          </AuthProvider>
        </ProviderX>
      </Provider>
    </NavigationContainer>
  );
}
