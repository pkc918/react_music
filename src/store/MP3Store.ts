import { makeAutoObservable, action, runInAction } from "mobx";

interface stateType {
  id: number;
  mp3: string;
}

class MP3Store {
  state: stateType;

  constructor() {
    this.state = {
      id: 0,
      mp3: "",
    };
    makeAutoObservable(this, {
      setId: action.bound,
    });
  }
  setId(id: number) {
    this.state.id = id;
  }
}

const mp3 = new MP3Store();

export { mp3 };
