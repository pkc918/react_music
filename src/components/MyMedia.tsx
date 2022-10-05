import React from "react";

const MyMedia: React.FC = () => {
  return (
    <div className="myMedia">
      <audio
        className="audio"
        controls
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
      ></audio>
    </div>
  );
};

export default MyMedia;
