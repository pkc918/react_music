import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;

const MyInput: React.FC = () => {
  return (
    <>
      <Search placeholder="搜索歌曲 / 歌手" className="myInput" />
    </>
  );
};

export default MyInput;
