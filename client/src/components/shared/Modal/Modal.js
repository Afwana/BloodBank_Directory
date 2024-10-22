import React, { useState } from "react";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";
import { useSelector } from "react-redux";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [donarEmail, setDonarEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please provide all fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        donarEmail,
        email: user?.email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New Record Created!");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
      window.location.reload();
      console.log(error);
    }
  };

  return (
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Manage Blood Record
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <InputType
              labelText={"Donar Email"}
              labelFor={"donarEmail"}
              inputType={"email"}
              value={donarEmail}
              onChange={(e) => setDonarEmail(e.target.value)}
              className="mb-3"
            />
            <div className="d-flex gap-3 mb-3">
              <span className="form-label">Blood Type:</span> &nbsp;
              <div className="form-check">
                <input
                  type="radio"
                  name="inRadio"
                  defaultChecked
                  className="form-check-input"
                  value={"in"}
                  onChange={(e) => setInventoryType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="in">
                  IN
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="inRadio"
                  className="form-check-input"
                  value={"out"}
                  onChange={(e) => setInventoryType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="out">
                  OUT
                </label>
              </div>
            </div>
            <label className="form-label">Blood Group:</label>
            <select
              className="form-select mb-3"
              aria-label="Default select example"
              onChange={(e) => setBloodGroup(e.target.value)}>
              <option defaultValue={"select blood group"}>
                select blood group
              </option>
              <option value={"A+"}>A+</option>
              <option value={"A-"}>A-</option>
              <option value={"B+"}>B+</option>
              <option value={"B-"}>B-</option>
              <option value={"AB+"}>AB+</option>
              <option value={"AB-"}>AB-</option>
              <option value={"O+"}>O+</option>
              <option value={"O-"}>O-</option>
            </select>
            <InputType
              labelText={"Quantity (ML)"}
              labelFor={"quantity"}
              inputType={"Number"}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
