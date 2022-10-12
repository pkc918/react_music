import { message } from "antd";
import { makeAutoObservable, action, runInAction } from "mobx";
import { searchByKeywords } from "../api/api";

type searchQueryType = {
  keywords: string;
  limit: number;
  offset: number;
};

type playListsType = Array<{
  mv?: number;
  name: string; // 歌名
  id: number;
  al: {
    id: number;
    picUrl: string; // 歌曲图片
    name: string; // 专辑名
  };
  ar: Array<{
    id: number;
    name: string;
  }>;
  dt: number;
}>;
class PlaylistStore {
  query: searchQueryType;
  playLists: playListsType;
  songCount: number;
  constructor() {
    this.query = {
      keywords: "薛之谦",
      limit: 12,
      offset: 0,
    };
    this.playLists = [];
    this.songCount = 0;
    makeAutoObservable(this, {
      setKeyWords: action.bound,
      setQueryOffset: action.bound,
      getPlayListData: action.bound,
    });
  }
  setQueryOffset(offset: number) {
    this.query.offset = offset;
  }
  setKeyWords(keywords: string) {
    this.query.keywords = keywords;
  }

  getPlayListData(type: string) {
    searchByKeywords(this.query).then((res) => {
      console.log(res.result, "from PlaylistStore's line 24");
      runInAction(() => {
        this.songCount = res?.result?.songCount || 0;
        let songs = res?.result?.songs || [];
        if (type === "init") {
          this.playLists = songs;
          message.success(`搜索到${this.songCount}条结果！`);
        } else if (type === "scroll") {
          this.playLists.push(...songs);
        }
      });
    });
  }
}

const playlistStore = new PlaylistStore();

export { playlistStore };
