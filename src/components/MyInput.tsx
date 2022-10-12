import React, { memo } from "react";
import { Input } from "antd";
import { useNavigate, useLocation } from "react-router";
import { playlistStore } from "../store/PlaylistStore";
const { Search } = Input;
const { getPlayListData, setKeyWords, setQueryOffset } = playlistStore;

const MyInput: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = (value: string) => {
    console.log(pathname);
    setKeyWords(value);
    setQueryOffset(0);
    getPlayListData("init");

    if (pathname !== "/playlist") {
      navigate("/playlist");
    }
  };

  return (
    <>
      <Search
        bordered={false}
        placeholder="搜索歌曲 / 歌手"
        className="myInput"
        onSearch={handleSearch}
      />
    </>
  );
};

export default memo(MyInput);
