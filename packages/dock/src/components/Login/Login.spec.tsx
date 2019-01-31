import React from "react";
import TestRenderer from "react-test-renderer";
import { TextInput } from "react-native";
import { Login } from "./Login";

describe("Login", () => {
  it("automatically gives focus to the badge ID field", () => {
    const { root } = TestRenderer.create(<Login />);
    const [inputBadgeID] = root.findAllByType(TextInput);

    expect(inputBadgeID.props.autoFocus).toBeTruthy();
  });

  it("obscures user input into PIN field", () => {
    const { root } = TestRenderer.create(<Login />);
    const [, inputPIN] = root.findAllByType(TextInput);

    expect(inputPIN.props.secureTextEntry).toBeTruthy();
  });
});
