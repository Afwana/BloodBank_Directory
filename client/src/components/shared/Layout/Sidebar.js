import React from "react";
import { Link, useLocation } from "react-router-dom";
import { userMenu } from "./Menus/userMenu";
import "../../../styles/Layout.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <div className="sidebar">
        <div className="menu">
          {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
