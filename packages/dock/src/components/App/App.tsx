import React from "react";
import { Scan } from "@lineage/ui";
import { ApolloProvider } from "react-apollo";
import { View } from "react-native";
import { client } from "../../data";
import { PalletList } from "../PalletList";
import { Login } from "../Login";

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <View>
        <PalletList query="" />
        <Scan />
        <Login />
      </View>
    </ApolloProvider>
  );
};
