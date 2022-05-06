import { Avatar } from "@material-ui/core";
import { StopRounded } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactTimeago from "react-timeago";
import appSlice from "./features/appSlice";
import "./chat.css";
import { selectImage, selectSelectedImage } from "./features/appSlice";
import { db } from "./firebase";

const Chat = ({ id, imageUrl, timestamp, read, username, profilePic }) => {
  console.log("READ", read);
  const dispatch = useDispatch();
  // dispatch(selectImage(imageUrl));
  const history = useHistory();
  const open = () => {
    dispatch(appSlice.actions.selectImage(imageUrl));
    if (!read) {
      console.log("ImageURl", imageUrl);
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
    }
    history.push("chats/view");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div onClick={open} className="chat">
            <Avatar src={profilePic} className="chat__avatar" />
            <div className="chat__info">
              <h4 className="chat__username">{username}</h4>
              <p>
                {!read && `Tap to view -`}
                <ReactTimeago
                  date={new Date(timestamp?.toDate()).toUTCString()}
                />
              </p>
            </div>
            {!read && <StopRounded className="chat__readIcon" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
