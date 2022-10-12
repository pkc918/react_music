import { Tag } from "antd";
import React, { PropsWithChildren, Suspense } from "react";
import useDate from "../hooks/useDate";
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
      ar.length >= 2 ? `${ar[0].name} ${ar[1].name}` : `${ar[0]?.name}`;
    return res;
  };
  return (
    <div className="musicItem">
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

export default MusicItem;
