import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  FlatList,
} from "react-native";
import {
  Camera,
  requestCameraPermissionsAsync,
  requestPermissionsAsync,
} from "expo-camera";
import MyChip from "./Chip";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import {
  PictureURIState,
  insertPicture,
  updated,
} from "../state/slices/picturesURISlice";

export default function App() {
  //  camera permissions
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState("4:3"); // default is 4:3
  const [availableRatios, setAvailableRatios] = useState<string[]>([]);
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [loading, setLoading] = useState(false);
  const [isRatioSet, setIsRatioSet] = useState(false);
  const dispatch = useDispatch();
  // on screen  load, ask for permission to use the camera
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted" ? true : false);
    }
    getCameraStatus();
  }, []);

  // set the camera ratio and padding.
  // this code assumes a portrait mode screen
  async function takePicture() {
    const picture: { height: number; width: number; uri: string } | undefined =
      await camera?.takePictureAsync();
    setLoading(false);
    if (picture === undefined) {
      console.log("cant take picture");
    } else {
      dispatch(insertPicture(picture));
      dispatch(updated());
    }
  }
  const prepareRatio = async () => {
    let desiredRatio = "4:3"; // Start with the system default
    // This issue only affects Android
    if (Platform.OS === "android") {
      let ratios = await camera!!.getSupportedRatiosAsync();
      console.log(ratios, "ratios");
      ratios = ratios.filter((ratioVal) => ratioVal !== "11:9");
      setAvailableRatios(ratios);
      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances: { [key: string]: number } = {};
      let realRatios: { [key: string]: number } = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(":");
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio;
        distances[ratio] = distance;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      console.log(realRatios, distances, "real distances");
      // set the best match
      desiredRatio = minDistance!!;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      // set the preview padding and preview ratio
      setImagePadding(remainder);
      setRatio(desiredRatio);
      // Set a flag so we don't do this
      // calculation each time the screen refreshes
      setIsRatioSet(true);
    }
  };

  // the camera must be loaded in order to access the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions</Text>
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        {/* 
        We created a Camera height by adding margins to the top and bottom, 
        but we could set the width/height instead 
        since we know the screen dimensions
        */}
        <Camera
          style={[
            styles.cameraPreview,
            // { marginTop: imagePadding, marginBottom: imagePadding },
          ]}
          onCameraReady={setCameraReady}
          ratio={ratio}
          ref={(ref) => {
            setCamera(ref);
          }}
        >
          <View style={{ flex: 1, flexDirection: "column-reverse" }}>
            <Button
              icon="camera"
              mode="elevated"
              onPress={() => {
                setLoading(true);
                takePicture();
              }}
              loading={loading}
              style={{ margin: 10 }}
            >
              Take Photo
            </Button>

            <View style={{ flexDirection: "row" }}>
              <FlatList
                data={availableRatios}
                renderItem={(ratio) => (
                  <MyChip
                    setIsRatioSet={setIsRatioSet}
                    setRatio={setRatio}
                    key={ratio.index}
                    textToBeDisplayed={ratio.item}
                  />
                )}
                horizontal={true}
              />
            </View>
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  information: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  cameraPreview: {
    flex: 1,
  },
});
