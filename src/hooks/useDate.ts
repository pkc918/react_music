// 将毫秒转化为 分：秒
const useDate = (date: number): string => {
  let second = Math.floor(date / 1000);
  let s = second % 60 >= 10 ? second % 60 : `0${second % 60}`;
  let minute = second - (second % 60);
  let m =
    Math.floor(minute / 60) >= 10
      ? Math.floor(minute / 60)
      : `0${Math.floor(minute / 60)}`;
  return `${m}:${s}`;
};
export default useDate;
