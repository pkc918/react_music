import React from "react";
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
    path: "login",
    title: "Discover",
    icon: "icon-gedan",
  },
  {
    path: "a",
    title: "Trending",
    icon: "icon-renwu",
  },
  {
    path: "b",
    title: "Straming",
    icon: "icon-shouye",
  },
  {
    path: "c",
    title: "Playlist",
    icon: "icon-bofangMV",
  },
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

export default TabBar;
