import { observer } from "mobx-react";
import React, { memo, RefObject, useEffect, useRef, useState } from "react";
import { getSongUrlById } from "../api/api";
import { mp3 } from "../store/MP3Store";
import { Slider } from "antd";
import IconFont from "./IconFont";
import useDate from "../hooks/useDate";

const MyAudio: React.FC = () => {
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    if (mp3.state.id === 0) return;
    console.log(mp3.state.id);
    getSongUrlById(mp3.state.id).then((res) => {
      console.log(res.data[0].url);
      setUrl(res.data[0].url);
    });
  }, [mp3.state.id]);
  // http://m7.music.126.net/20221016111721/94a10b5d13f73436dee0d56315e7c863/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3

  // 图标
  const [icon, setIcon] = useState<string>("icon-bofang");
  // 播放状态
  const [playFlag, setPlayFlag] = useState<boolean>(true);
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // audio
  const [audio] = useState<HTMLAudioElement>(
    new Audio(
      "http://m801.music.126.net/20221016124034/19ceb5159335c1a7dcb43b6118a15d04/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096525698/5029/1d8e/2dc1/64d2bdfdbd77d948109576050c48802a.mp3"
    )
  );
  audio.ontimeupdate = (e) => {
    const audio = e.target as HTMLAudioElement;
    setCurrentTime(audio.currentTime * 1000);
  };
  // 播放 暂停
  const handlePlay = () => {
    playFlag ? audio.play() : audio.pause();
    const currentIcon: string = playFlag ? "icon-zanting" : "icon-bofang";
    setPlayFlag(!playFlag);
    setIcon(currentIcon);
  };
  // 进度条
  const changeProgress = (value: number) => {
    if (typeof value !== "number") return;
    setCurrentTime(value);
    audio.currentTime = value / 1000;
  };
  return (
    <div className="myAudio">
      <div className="songInfo">
        <img src={mp3.state.mp3?.song?.picUrl} alt="" />
        <div className="artist">
          <h3>{mp3.state.mp3?.song?.name}</h3>
          <h3>{mp3.state.mp3?.artist}</h3>
        </div>
      </div>
      <div className="progress">
        <div className="currentTime">{useDate(currentTime)}</div>
        <Slider
          min={0}
          max={mp3.state.mp3?.dt}
          value={Math.floor(currentTime)}
          onChange={changeProgress}
        />
        <div className="totalTime">{useDate(mp3.state.mp3?.dt)}</div>
      </div>
      <div className="controlTools">
        <IconFont type="icon-shangyishou" />
        <IconFont onClick={handlePlay} type={icon} />
        <IconFont type="icon-xiayishou" />
      </div>
    </div>
  );
};

export default memo(observer(MyAudio));
