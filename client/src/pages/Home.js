import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Modal from "../components/shared/Modal/Modal";
import API from "./../services/API";
import moment from "moment";

const Home = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <Layout>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="d-flex flex-row justify-content-end align-items-center">
            <h4
              className="me-4"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}>
              <i className="fa-solid fa-plus text-success py-4"></i> Add
              Inventory
            </h4>
            <Modal />
          </div>
          <div className="p-4">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((record, index) => (
                  <tr key={record?._id}>
                    <td>{index + 1}</td>
                    <td>{record?.bloodGroup}</td>
                    <td>{record?.inventoryType}</td>
                    <td>{record?.quantity} (ML)</td>
                    <td>{record?.email}</td>
                    <td>
                      {moment(record?.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
