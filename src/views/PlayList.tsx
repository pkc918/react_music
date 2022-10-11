import { observer } from "mobx-react";
import React, { memo } from "react";
import MusicItem from "../components/MusicItem";
import { playlistStore } from "../store/PlaylistStore";

const PlayList: React.FC = () => {
  return (
    <div className="playlist">
      {playlistStore.playLists.map((item) => {
        return (
          <MusicItem
            key={item.id}
            mv={item.mv}
            al={item.al}
            ar={item.ar}
            dt={item.dt}
          >
            {item.name}
          </MusicItem>
        );
      })}
    </div>
  );
};

export default memo(observer(PlayList));
