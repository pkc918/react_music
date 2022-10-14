import { observer } from "mobx-react";
import React, { memo, useEffect, useState } from "react";
import { getSongUrlById } from "../api/api";
import { mp3 } from "../store/MP3Store";
import { Col, InputNumber, Row, Slider } from "antd";
import IconFont from "./IconFont";

const MyAudio: React.FC = () => {
  const o: HTMLAudioElement = new Audio(
    "http://m801.music.126.net/20221014141034/c566cdb8ff15b1897e62793c96db0e1a/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096525698/5029/1d8e/2dc1/64d2bdfdbd77d948109576050c48802a.mp3"
  );

  console.log(o);

  // o.play()
  const [inputValue, setInputValue] = useState<string>("00:00");

  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    if (mp3.state.id === 0) return;
    console.log(mp3.state.id);
    getSongUrlById(mp3.state.id).then((res) => {
      console.log(res.data[0].url);
      setUrl(res.data[0].url);
    });
  }, [mp3.state.id]);

  const [icon, setIcon] = useState<string>("icon-bofang");
  const handlePlay = () => {
    console.log(o.play());
    o.play().then((res) => {
      console.log(res);
    });
    const currentIcon: string =
      icon === "icon-bofang" ? "icon-zanting" : "icon-bofang";
    setIcon(currentIcon);
  };
  return (
    <div className="myAudio">
      <div className="songInfo">
        <img
          src="http://p1.music.126.net/zQsuZvhJygPTFTM_FFnqhQ==/109951164139588912.jpg?param=175y175"
          alt=""
        />
        <div className="artist">
          <h3>我在哪里见过你</h3>
          <h3>作者</h3>
        </div>
      </div>
      <div className="progress">
        <div className="currentTime">{inputValue}</div>
        <Slider />
        <div className="totalTime">04:21</div>
      </div>
      <div className="controlTools">
        <IconFont type="icon-shangyishou" />
        <IconFont onClick={handlePlay} type={icon} />
        {/* <IconFont type="icon-zanting" /> */}
        <IconFont type="icon-xiayishou" />
      </div>
    </div>
  );
};

export default memo(observer(MyAudio));
