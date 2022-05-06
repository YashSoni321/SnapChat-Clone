import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Chats.css";
import { Suspense } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { ChatBubble } from "@material-ui/icons";
import { auth, db } from "./firebase";
import Chat from "./Chat";
import { useHistory } from "react-router-dom";
import { selectUser } from "./features/appSlice";
import { useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { resetCameraImage } from "./features/cameraSlice";
import Loader from "./Loader";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  console.log("posts", posts);

  const chats = posts.map(
    ({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
      <Chat
        key={id}
        id={id}
        username={username}
        timestamp={timestamp}
        imageUrl={imageUrl}
        read={read}
        profilePic={profilePic}
      />
    )
  );

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <Suspense fallback={<Loader />}>
        <Button
          className="logoutBtn"
          variant="outlined"
          onClick={() => auth.signOut()}
        >
          Logout
        </Button>
        <br />
        <div className="row">
          <div className="col-sm-12">
            <div className="chats">
              <div className="chats__header">
                <Avatar
                  src={user.profilePic}
                  onClick={() => auth.signOut()}
                  className="chats__avatar"
                />
                <div className="chats__search">
                  <SearchIcon />
                  <input type="text" placeholder="Friends" />
                </div>
                <ChatBubble className="chats__chatIcon" />
              </div>
              <div className="chats__posts">{chats}</div>
              <RadioButtonUnchecked
                className="chats__takePicIcon"
                onClick={takeSnap}
                fontSize="large"
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Chats;
