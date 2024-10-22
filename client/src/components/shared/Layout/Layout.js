import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <aside className="row g-0">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">{children}</div>
      </aside>
    </>
  );
};

export default Layout;
