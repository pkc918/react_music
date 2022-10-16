import { makeAutoObservable, action, runInAction } from "mobx";

interface stateType {
  id: number;
  mp3: any;
}

class MP3Store {
  state: stateType;

  constructor() {
    this.state = {
      id: 0,
      mp3: {
        dt: 0,
      },
    };
    makeAutoObservable(this, {
      setState: action.bound,
    });
  }
  setState(state: stateType) {
    this.state = state;
  }
}

const mp3 = new MP3Store();

export { mp3 };
