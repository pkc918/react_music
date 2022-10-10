import { makeAutoObservable, action, runInAction } from "mobx";
import { getBanner, getMv, getNewSong, getPlayList } from "../api/api";

type bannerImgsType = Array<{
  imageUrl: string;
  targetId: number;
}>;

type playListsType = Array<{
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}>;
type musicType = {
  id: number;
  name: string;
  picUrl: string;
};
type newSongsType = Array<{
  id: number;
  name: string;
  picUrl: string;
  song: {
    artists: Array<musicType>;
  };
}>;

type recommendMYType = Array<{
  artistId: number;
  artists: {
    id: number;
    name: string;
  }[];
  duration: number;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}>;

class DiscoverStore {
  // state
  bannerImgs: bannerImgsType;
  playLists: playListsType;
  newSongs: newSongsType;
  recommendMVs: recommendMYType;

  constructor() {
    this.bannerImgs = [];
    this.playLists = [];
    this.newSongs = [];
    this.recommendMVs = [];
    makeAutoObservable(this, {
      getBannerImgs: action.bound,
      getPlayLists: action.bound,
      getNewSongs: action.bound,
    });
  }

  // action
  getBannerImgs() {
    getBanner().then((res: { banners: bannerImgsType }) => {
      console.log(res, "from store's line 15");
      runInAction(() => {
        console.log("魔杖啦");

        this.bannerImgs = res.banners;
      });
    });
  }

  getPlayLists() {
    getPlayList().then((res: { result: playListsType }) => {
      console.log(res.result, "from store's line 40");
      runInAction(() => {
        this.playLists = res.result;
      });
    });
  }

  getNewSongs() {
    getNewSong().then((res: { result: newSongsType }) => {
      console.log(res.result, "from store's line 60");
      runInAction(() => {
        this.newSongs = res.result;
      });
    });
  }

  getRecommendMV() {
    getMv().then((res: { result: recommendMYType }) => {
      console.log(res.result, "from store's line 81");
      runInAction(() => {
        this.recommendMVs = res.result;
      });
    });
  }
}

const discoverStore = new DiscoverStore();

export { discoverStore };
