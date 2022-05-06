import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/appSlice";
import { auth, provider } from "./firebase";
import "./Login.css";
import snapLogo from "./snapLogo.png";

const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <div className="login">
            <div className="login__container">
              <Button>Mahaveer College of Commerce</Button>
              <Button>BCA Part 3 Project</Button>
              <img src={snapLogo} alt="" />
              <Button variant="outlined" onClick={signIn}>
                Sign In & create a snap!
              </Button>
              <br />
              <Button>Made By Hansika & Yash</Button>
            </div>
          </div>
          ;
        </div>
      </div>
    </div>
  );
};

export default Login;
