import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { getSongUrlById } from "../api/api";
import { mp3 } from "../store/MP3Store";

const MyMedia: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    if (mp3.state.id === 0) return;
    console.log(mp3.state.id);
    getSongUrlById(mp3.state.id).then((res) => {
      console.log(res.data[0].url);
      setUrl(res.data[0].url);
    });
  }, [mp3.state.id]);
  return (
    <div className="myMedia">
      <audio className="audio" autoPlay controls src={url}></audio>
    </div>
  );
};

export default memo(observer(MyMedia));
