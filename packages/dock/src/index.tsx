import { AppRegistry, Platform } from "react-native";
import { App } from "./components";

AppRegistry.registerComponent("example", () => App);

if (Platform.OS === "web") {
  AppRegistry.runApplication("example", {
    rootTag: document.getElementById("root"),
  });
}
