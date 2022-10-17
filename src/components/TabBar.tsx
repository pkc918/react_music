import React, { memo } from "react";
import { To } from "react-router-dom";
import { NavLink } from "react-router-dom";
import IconFont from "./IconFont";
interface linksType {
  path: To;
  title: string;
  icon: string;
}
const links: linksType[] = [
  {
    path: "discover",
    title: "Discover",
    icon: "icon-shouye",
  },
  {
    path: "musician",
    title: "Musician",
    icon: "icon-renwu",
  },
  {
    path: "playlist",
    title: "Playlist",
    icon: "icon-gedan",
  },
  // {
  //   path: "c",
  //   title: "Playlist",
  //   icon: "icon-bofangMV",
  // },
];

const TabBar: React.FC = () => {
  return (
    <div className="tabbar">
      <h2 className="title">MY MUSIC</h2>
      <h5>MENU</h5>
      <nav className="link">
        {links.map((item, index) => (
          <NavLink
            key={index}
            className={({ isActive }) => (isActive ? "active" : undefined)}
            to={item.path}
          >
            <IconFont className="iconFont" type={item.icon} />
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default memo(TabBar);
