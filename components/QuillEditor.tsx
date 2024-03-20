import React, { LegacyRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  useWindowDimensions,
} from "react-native";
import QuillEditor, { QuillToolbar } from "react-native-cn-quill";
import { useDispatch, useSelector } from "react-redux";
import { setImageLink, setNotesBody } from "../state/slices/notesSlice";
import { RootState } from "../state/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeAuthStackNavigator } from "../navigator/HomeAuthStackNavigator";
import { supabase } from "../supabaseInit";
export default function QuillEditorX() {
  const navigtor =
    useNavigation<NativeStackNavigationProp<HomeAuthStackNavigator>>();
  const _editor: any = React.createRef();
  const dimensions = useWindowDimensions();
  const customHandler = (name: string, value: any) => {
    console.log("custom handler called");
    if (name === "image") {
      navigtor.push("TakePhotoFromCamera");
    } else if (name === "clock") {
      _editor.current?.insertText(0, `Today is`, {
        bold: true,
        color: "red",
      });
    } else {
      console.log(`${name} clicked with value: ${value}`);
    }
  };
  const dispatch = useDispatch();
  const notesBody = useSelector((state: RootState) => state.notes);
  const pictureState = useSelector((state: RootState) => state.pictureURI);
  console.log(pictureState, "picture state in Quill editor");
  useEffect(() => {
    const uploadImageAsync = (uri: string) => {
      let formData: any = new FormData();
      formData.append("photo", {
        uri,
        name: `photo.png`,
        type: `image/png`,
      });

      return formData;
    };
    async function uploadToDb(ok: { path: string }) {
      let { data, error } = await supabase
        .from("notes")
        .update([
          {
            image_links: [...notesBody.image_link, ok!!.path],
          },
        ])
        .eq("id", notesBody.id);
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
    async function uploadPicture() {
      const file = uploadImageAsync(pictureState.uri);
      const objectName = pictureState.uri.replace(/^.*[\\\/]/, ""); // This will extract the file name from the uri
      file.meta = {
        objectName: objectName,
      };
      console.log(file, "file");
      let { data, error } = await supabase.storage
        .from("notes_images")
        .upload(objectName, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error !== null) {
        console.log(error);
      } else {
        console.log(data!!.path);
        dispatch(
          setImageLink(
            "http://localhost:8000/storage/v1/object/public/notes_images/" +
              data!!.path
          )
        );
        data!!.path =
          "http://localhost:8000/storage/v1/object/public/notes_images/" +
          data!!.path;
        _editor.current.dangerouslyPasteHTML(0, "<b>Hello World</b>");
        uploadToDb(data!!);
      }
    }
    uploadPicture();
  }, [pictureState]);
  return (
    <View style={[styles.root]}>
      <QuillEditor
        style={[styles.editor, { width: dimensions.width }]}
        ref={_editor}
        initialHtml={notesBody.body}
        onHtmlChange={(val) => {
          dispatch(setNotesBody(val.html));
        }}
      />
      <View style={{ width: dimensions.width * 0.8 }}>
        <QuillToolbar
          editor={_editor}
          options="full"
          custom={{
            handler: customHandler,
            actions: ["image"],
          }}
          theme="dark"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    paddingVertical: 10,
  },
  root: {
    flex: 1,
  },
  editor: {
    flex: 1,
    borderWidth: 1,
    marginVertical: 5,
    backgroundColor: "white",
  },
});
