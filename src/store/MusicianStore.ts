import { makeAutoObservable, action, runInAction } from "mobx";
import { getHotMusicians, getMusicians } from "../api/api";

interface queryType {
  limit: number;
  offset: number;
  cat: number;
  initial: string;
}

type musicianType = Array<{
  id: number;
  name: string;
  picId: number;
  picUrl: string;
}>;

class MusicianStore {
  state: queryType;
  musicians: musicianType;
  constructor() {
    this.state = {
      limit: 12,
      offset: 0,
      cat: 0,
      initial: "热门",
    };
    this.musicians = [];
    makeAutoObservable(this, {
      hotMusicians: action.bound,
    });
  }
  setStateOffset(offset: number) {
    this.state.offset = offset;
  }
  hotMusicians(type: "scroll" | "init") {
    getHotMusicians({
      limit: this.state.limit,
      offset: this.state.offset,
    }).then((res: { artists: musicianType }) => {
      console.log(res.artists, "from MusicianStore's line 47");
      runInAction(() => {
        if (type === "scroll") {
          this.musicians.push(...res.artists);
        } else if (type === "init") {
          this.musicians = res.artists;
        } else {
          throw "类型错误";
        }
      });
    });
  }
  getMusiciansData(
    type: "scroll" | "init",
    data: { cat: number; initial?: string }
  ) {
    getMusicians({ ...this.state, ...data }).then((res) => {
      console.log(res.artists, "from MusicianStore's line 64");
      runInAction(() => {
        if (type === "scroll") {
          this.musicians.push(...res.artists);
        } else if (type === "init") {
          this.musicians = res.artists;
        } else {
          throw "类型错误";
        }
      });
    });
  }
}

const musicianStore = new MusicianStore();

export { musicianStore };
