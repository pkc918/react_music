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

// 热门歌手
export const getHotMusicians = (data: { offset?: number; limit?: number }) => {
  return request("/top/artists", "get", data);
};

// 歌手查询
export const getMusicians = (data: {
  cat: number;
  initial?: string;
  limit?: number;
  offset?: number;
}) => {
  return request("/artist/list", "get", data);
};

// 搜索
export const searchByKeywords = (data: {
  keywords: string;
  limit: number;
  offset: number;
}) => {
  return request("/cloudsearch", "get", data);
};

// 获取音乐 url
export const getSongUrlById = (id: number) => {
  return request("/song/url", "get", { id });
};
