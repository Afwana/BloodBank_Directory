import React, { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout/Layout";
import API from "../../../services/API";
import moment from "moment";

const Consumer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchConsumptions = async () => {
      try {
        const { data } = await API.get("/inventory/hospital-consumers");
        if (data?.success) setData(data.consumptions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConsumptions();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h4 className="mb-3">Blood Consumption Records</h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Organisation</th>
              <th>Blood Group</th>
              <th>Quantity (ML)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No consumption records yet.
                </td>
              </tr>
            )}
            {data?.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.organisation?.organisationName}</td>
                <td>{record.bloodGroup}</td>
                <td>{record.quantity}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Consumer;
