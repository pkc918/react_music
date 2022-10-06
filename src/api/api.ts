import request from "./request";

// Banner 轮播图
export const getBanner = () => {
  return request("/banner", "get", { type: 0 });
};

// 推荐歌单
export const getPlayList = () => {
  return request("/personalized", "get", { limit: 10 });
};

// 推荐新音乐
export const getNewSong = () => {
  return request("/personalized/newsong", "get");
};

// 推荐MV
export const getMv = () => {
  return request("/personalized/mv", "get");
};
