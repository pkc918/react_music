import React from "react";
import MyInput from "./MyInput";
import UserInfo from "./UserInfo";

const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <MyInput />
      <UserInfo />
    </div>
  );
};

export default TopBar;
