import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useHistory } from "react-router-dom";
import "./WebcamCapture.css";

const videoConstraints = {
  width: "100%",
  height: "100%",
  facingMode: "user",
};

function WebcamCapture() {
  const [image, setImage] = useState();
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Webcam
              audio={false}
              height={videoConstraints.height}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={videoConstraints.width}
              videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon
              className="webcamCapture__button"
              fontSize="large"
              onClick={capture}
            />
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebcamCapture;
