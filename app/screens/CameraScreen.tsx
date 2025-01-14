import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!permission || !mediaPermission) {
    // Camera and media permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button
          mode="contained"
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          Grant Permission
        </Button>
      </View>
    );
  }

  if (!mediaPermission.granted) {
    // Media library permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to save photos
        </Text>
        <Button
          mode="contained"
          onPress={requestMediaPermission}
          style={styles.permissionButton}
        >
          Grant Permission
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) await MediaLibrary.saveToLibraryAsync(photo?.uri);
        Alert.alert("Success", "Photo saved to gallery!");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to save photo.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  permissionButton: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
