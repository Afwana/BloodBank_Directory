import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row g-0">
          <div className="col-md-8 form-banner">
            <img src="./assets/banner2.png" alt="loginImage" />
          </div>
          <div className="col-md-4 form-container flex-column">
            <Form
              formTitle={"Login"}
              formSubtitle={"Enter your credentials to login"}
              submitBtn={"Login"}
              formType={"loginForm"}
            />
            <p className="form-subtitle mt-2">
              New User? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
