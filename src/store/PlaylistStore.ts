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
  constructor() {
    this.query = {
      keywords: "薛之谦",
      limit: 12,
      offset: 0,
    };
    this.playLists = [];
    makeAutoObservable(this, {
      setKeyWords: action.bound,
      getPlayListData: action.bound,
    });
  }
  setKeyWords(keywords: string) {
    this.query.keywords = keywords;
  }

  getPlayListData() {
    searchByKeywords(this.query).then((res) => {
      console.log(res.result, "from PlaylistStore's line 24");
      runInAction(() => {
        this.playLists = res.result.songs;
        message.success(`搜索到${res.result.songCount}条结果！`);
      });
    });
  }
}

const playlistStore = new PlaylistStore();

export { playlistStore };
