import { Tag } from "antd";
import { observer } from "mobx-react";
import React, { PropsWithChildren, Suspense } from "react";
import useDate from "../hooks/useDate";
import { mp3 } from "../store/MP3Store";
interface MusicItemType {
  mv?: number;
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  ar: Array<{
    id: number;
    name: string;
  }>;
  dt: number;
  id: number;
}

const MusicItem: React.FC<PropsWithChildren<MusicItemType>> = ({
  mv,
  al,
  ar,
  dt,
  id,
  children,
}) => {
  const artists = (ar: { name: string }[]): string => {
    let res: string =
      ar.length >= 2 ? `${ar[0].name}${ar[1].name}` : `${ar[0]?.name}`;
    return res;
  };

  const handleClick = () => {
    mp3.setState({
      id: id,
      mp3: {
        song: { ...al },
        artist: artists(ar),
        dt: dt,
      },
    });
  };

  return (
    <div className="musicItem" onClick={handleClick}>
      <Suspense fallback={null}>
        <img src={al.picUrl} alt="" />
        <div className="title">{children}</div>
        <div className="mv">{mv ? <Tag color="red">MV</Tag> : undefined}</div>
        <div className="artists">
          <span>{artists(ar)} </span>
        </div>
        <div className="album">{al.name}</div>
        <div className="songTime">{useDate(dt)}</div>
      </Suspense>
    </div>
  );
};

export default observer(MusicItem);
