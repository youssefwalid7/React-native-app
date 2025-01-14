import React from "react";
import { List } from "react-native-paper";

const ListItem = ({ title }: { title: string }) => {
  return <List.Item title={title} />;
};

export default ListItem;