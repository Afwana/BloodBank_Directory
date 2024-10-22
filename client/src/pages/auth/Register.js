import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-md-8 form-banner">
            <img src="./assets/banner2.png" alt="registerImage" />
          </div>
          <div className="col-md-4 form-container flex-column">
            <Form
              formTitle={"Register"}
              formSubtitle={"Create a new account"}
              submitBtn={"Register"}
              formType={"registerForm"}
            />
            <p className="form-subtitle mt-2">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
