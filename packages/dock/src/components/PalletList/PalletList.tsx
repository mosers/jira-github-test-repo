import React from "react";
import { withPallets } from "@lineage/core";
import { Text, FlatList, ActivityIndicator } from "react-native";

export const PalletList = withPallets(({ data }) => {
  if (data.error) {
    return <Text>{data.error.toString()}</Text>;
  }

  if (data.loading || !data.pallets) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data.pallets}
      renderItem={({ item }) => <Text>{item.id}</Text>}
    />
  );
});
