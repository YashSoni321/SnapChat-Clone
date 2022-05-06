import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./ChatsView.css";
import Loader from "./Loader";

const ChatsView = () => {
  const selectedImage = useSelector((state) => state.app.selectedImage);
  const history = useHistory();

  const exit = () => {
    history.replace("/chats");
  };
  const LazyComponent = React.lazy(() => selectedImage);

  return (
    <Suspense fallback={<Loader />}>
      <div className="chatView">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <img
                className="chatsViewImage"
                src={selectedImage}
                onClick={exit}
              />
              <div className="chatView__timer">
                <CountdownCircleTimer
                  isPlaying
                  duration={10}
                  size={70}
                  strokeWidth={6}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[7, 5, 2, 0]}
                >
                  {({ remainingTime }) => {
                    if (remainingTime === 0) {
                      exit();
                    }
                    return remainingTime;
                  }}
                </CountdownCircleTimer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default ChatsView;
