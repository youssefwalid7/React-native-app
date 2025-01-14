import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import ListItem from "../components/ListItem";
import fetchPosts from "../hooks/useFetch";

const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPosts();
      console.log(data);
      setPosts(data);
    };
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Posts
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <ListItem title={item.body} />}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Camera")}
        style={styles.button}
      >
        Open Camera
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { marginBottom: 20 },
  button: { marginTop: 20 },
});

export default HomeScreen;
