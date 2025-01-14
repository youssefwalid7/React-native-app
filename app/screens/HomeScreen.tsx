import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Text } from "react-native-paper";
import fetchPosts from "../hooks/useFetch";

const ListItem = ({ title, body }: { title: string; body: string }) => (
  <View style={styles.listItem}>
    <Text style={styles.listItemTitle}>{title}</Text>
    <Text style={styles.listItemBody}>{body}</Text>
  </View>
);

const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Posts
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem title={item.title} body={item.body} />
        )}
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
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { marginBottom: 20, fontWeight: "bold", textAlign: "center" },
  button: { marginTop: 20 },
  listItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  listItemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  listItemBody: {
    fontSize: 14,
    color: "#666",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
