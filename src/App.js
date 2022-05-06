import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Chats from "./Chats";
import ChatsView from "./ChatsView";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";
import Loader from "./Loader";
import Login from "./Login";
import Preview from "./Preview";
import WebcamCapture from "./WebcamCapture";

const LazyComponent1 = React.lazy(() => import("./WebcamCapture"));

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Switch>
              <Route path="/chats/view">
                <ChatsView />
              </Route>
              <Route path="/preview">
                <Preview />
              </Route>
              <Route exact path="/chats">
                <Chats />
              </Route>
              <Route exact path="/">
                <Suspense fallback={<h1>:pading</h1>}>
                  <LazyComponent1 />
                </Suspense>
              </Route>
            </Switch>
          </div>
        )}
      </Router>
      {/* <div className="tagLine">
        Made For <span>SnapQueen</span>
      </div>
      <div className="tagLine">
      Made By
      <span className="tagName"> Hansika </span>
    </div> */}
    </div>
  );
}

export default App;
