import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully!");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand d-flex flex-row justify-content-start align-items-center">
            <img src="/assets/logo.png" width={70} height={70} alt="logo" />
            <h4 className="text-danger d-grid align-items-end">
              <span>Save a life,</span>
              <span>Give blood.</span>
            </h4>
          </div>
          <div className="navbar-nav d-flex flex-row justify-content-end align-items-start gap-2">
            <button className="btn btn-dark align-middle fs-6">
              <BiUserCircle size={20} />{" "}
              {user?.name || user?.hospitalName || user?.organisationName}{" "}
              &nbsp;
              <span className="badge bg-success">{user?.role}</span>
            </button>
            <button
              className="btn btn-danger align-middle"
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
