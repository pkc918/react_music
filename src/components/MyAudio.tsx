import { observer } from "mobx-react";
import React, { memo, useEffect, useRef, useState } from "react";
import { getSongUrlById } from "../api/api";
import { mp3 } from "../store/MP3Store";
import { Slider } from "antd";
import IconFont from "./IconFont";
import useDate from "../hooks/useDate";
import defaultUrl from "../img/default_img.png";

const MyAudio: React.FC = () => {
  // 当前音乐 url
  const [url, setUrl] = useState<string>("");
  // 图标
  const [icon, setIcon] = useState<string>("icon-bofang");
  // 播放状态
  const [playFlag, setPlayFlag] = useState<boolean>(true);
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // audio
  const audioRef = useRef<HTMLAudioElement>(null);
  // audio 播放到当前的时间
  const handleCurrentTime = (event: any) => {
    setCurrentTime(event.target.currentTime * 1000);
  };
  // 播放 暂停
  const handlePlay = () => {
    playFlag ? audioRef.current?.play() : audioRef.current?.pause();
    const currentIcon: string = playFlag ? "icon-zanting" : "icon-bofang";
    setIcon(currentIcon);
    setPlayFlag(!playFlag);
  };
  // 进度条
  const changeProgress = (value: number) => {
    if (typeof value !== "number") return;
    console.log(value, "progress");
    setCurrentTime(value);
    const audio = audioRef.current as HTMLAudioElement;
    audio.currentTime = Math.floor(value / 1000);
  };

  useEffect(() => {
    if (mp3.state.id === 0) {
      const MP3_Default_Info = JSON.parse(
        localStorage.getItem("MP3") ||
          JSON.stringify({
            id: 0,
            mp3: {
              dt: 0,
              song: {
                picUrl: defaultUrl,
                name: "暂无播放",
              },
              artist: "暂无播放",
            },
          })
      );
      mp3.setState(MP3_Default_Info);
    }
    console.log(mp3.state.id);
    getSongUrlById(mp3.state.id).then((res) => {
      console.log(res.data[0].url, mp3.state.mp3?.dt);
      setUrl(res.data[0].url);
      localStorage.setItem(
        "MP3",
        JSON.stringify({
          id: mp3.state.id,
          mp3: {
            dt: mp3.state.mp3?.dt,
            song: {
              picUrl: mp3.state.mp3?.song?.picUrl,
              name: mp3.state.mp3?.song?.name,
            },
            artist: mp3.state.mp3?.artist,
          },
        })
      );
    });
  }, [mp3.state.id]);

  useEffect(() => {
    if (url === "") return;
  }, [url]);

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
        <audio
          autoPlay
          ref={audioRef}
          src={url}
          onTimeUpdate={handleCurrentTime}
        ></audio>
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
