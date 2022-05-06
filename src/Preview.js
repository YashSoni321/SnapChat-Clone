import { CloseOutlined } from "@material-ui/icons";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import DescriptionIcon from "@material-ui/icons/Description";
import BrushIcon from "@material-ui/icons/Brush";
import CropIcon from "@material-ui/icons/Crop";
import { v4 as uuid } from "uuid";
import firebase from "firebase";
import { db } from "./firebase";
import TimerIcon from "@material-ui/icons/Timer";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import "./Preview.css";
import { selectUser } from "./features/appSlice";
const storage = firebase.storage();

const Preview = () => {
  const cameraImg = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImg) {
      history.replace("/");
    }
  }, [cameraImg, history]);

  const onClosePreviewHandler = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = () => {
    const id = uuid();

    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImg, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        console.log(error);
      },
      () => {
        // Complete Function
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            history.replace("/chats");
            db.collection("posts").add({
              imageUrl: url,
              username: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      }
    );
  };

  return (
    <div className="preview">
      <CloseOutlined
        fontSize="inherit"
        className="preview__close"
        onClick={onClosePreviewHandler}
      />
      <div className="preview__toolbarright">
        <TextFieldsIcon className="preview__toolbarrButton" />
        <BrushIcon className="preview__toolbarrButton" />
        <DescriptionIcon className="preview__toolbarrButton" />
        <MusicNoteIcon className="preview__toolbarrButton" />
        <AttachFileIcon className="preview__toolbarrButton" />
        <CropIcon className="preview__toolbarrButton" />
        <TimerIcon className="preview__toolbarrButton" />
      </div>
      <img src={cameraImg} alt="cameraImage" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
};

export default Preview;
