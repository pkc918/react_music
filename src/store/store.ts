import { makeAutoObservable, action } from "mobx";
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

class Store {
  // state
  bannerImgs: bannerImgsType = [];
  playLists: playListsType = [];
  newSongs: newSongsType = [];
  recommendMVs: recommendMYType = [];

  constructor() {
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
      this.bannerImgs = res.banners;
    });
  }

  getPlayLists() {
    getPlayList().then((res: { result: playListsType }) => {
      console.log(res.result, "from store's line 40");
      this.playLists = res.result;
    });
  }

  getNewSongs() {
    getNewSong().then((res: { result: newSongsType }) => {
      console.log(res.result, "from store's line 60");
      this.newSongs = res.result;
    });
  }

  getRecommendMV() {
    getMv().then((res: { result: recommendMYType }) => {
      console.log(res.result, "from store's line 81");
      this.recommendMVs = res.result;
    });
  }
}

const store = new Store();

export { store };
