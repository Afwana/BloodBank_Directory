import React, { useState } from "react";
import InputType from "./InputType";
import TextArea from "./TextArea";
import { handleLogin, handleRegister } from "../../../services/authServices";

const Form = ({ formType, submitBtn, formTitle, formSubtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "loginForm") {
            return handleLogin(e, role, email, password);
          } else if (formType === "registerForm") {
            return handleRegister(
              e,
              role,
              name,
              organisationName,
              hospitalName,
              email,
              password,
              phone,
              website,
              address
            );
          }
        }}>
        <div className="text-center">
          <h3 className="text-danger fw-bold">{formTitle}</h3>
          <p className="form-subtitle">{formSubtitle}</p>
        </div>
        <div className="d-flex mb-3 justify-content-center align-items-center">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
        </div>
        {/* switch statement for each formType */}
        {(() => {
          // eslint-disable-next-line default-case
          switch (true) {
            case formType === "loginForm": {
              return (
                <div style={{ width: "400px" }}>
                  <InputType
                    labelText={"Email ID"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              );
            }
            // eslint-disable-next-line no-fallthrough
            case formType === "registerForm": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <div className="row">
                      <InputType
                        labelText={"Name"}
                        labelFor={"forName"}
                        inputType={"name"}
                        name={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  )}
                  {role === "organisation" && (
                    <div className="row">
                      <InputType
                        labelText={"Organisation Name"}
                        labelFor={"forOrganisationName"}
                        inputType={"organisationName"}
                        name={"organisationName"}
                        value={organisationName}
                        onChange={(e) => setOrganisationName(e.target.value)}
                      />
                    </div>
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"hospitalName"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <div className="row">
                    <div className="col">
                      <InputType
                        labelText={"Email ID"}
                        labelFor={"forEmail"}
                        inputType={"email"}
                        name={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="col">
                      <InputType
                        labelText={"Password"}
                        labelFor={"forPassword"}
                        inputType={"password"}
                        name={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <InputType
                        labelText={"Phone"}
                        labelFor={"forPhone"}
                        inputType={"phone"}
                        name={"phone"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="col">
                      <InputType
                        labelText={"Website"}
                        labelFor={"forWebsite"}
                        inputType={"website"}
                        name={"website"}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <TextArea
                      labelText={"Address"}
                      labelFor={"forAddress"}
                      inputType={"address"}
                      name={"address"}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </>
              );
            }
          }
        })()}

        <div className="d-flex">
          <button className="btn btn-danger w-100" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
