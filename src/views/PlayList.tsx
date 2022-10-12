import { observer } from "mobx-react";
import React, { memo, useEffect, useRef } from "react";
import MusicItem from "../components/MusicItem";
import { playlistStore } from "../store/PlaylistStore";

const PlayList: React.FC = () => {
  const backTop = useRef<HTMLElement>(null);
  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const mainScrollProperty = {
      scrollHeight: e.currentTarget.scrollHeight,
      scrollTop: e.currentTarget.scrollTop,
      clientHeight: e.currentTarget.clientHeight,
    };
    // 滚动最底下加载新资源
    const { scrollHeight, scrollTop, clientHeight } = mainScrollProperty;
    if (
      scrollTop + clientHeight === scrollHeight &&
      playlistStore.query.offset < playlistStore.songCount
    ) {
      playlistStore.setQueryOffset(playlistStore.query.offset + 12);
      playlistStore.getPlayListData("scroll");
    }
  };

  useEffect(() => {
    backTop.current?.scrollTo(0, 0);
  }, [playlistStore.query.keywords]);
  return (
    <main className="playlist" ref={backTop} onScroll={handleScroll}>
      {playlistStore.playLists.map((item) => {
        return (
          <MusicItem
            key={item.id}
            mv={item.mv}
            al={item.al}
            ar={item.ar}
            dt={item.dt}
            id={item.id}
          >
            {item.name}
          </MusicItem>
        );
      })}
    </main>
  );
};

export default memo(observer(PlayList));
