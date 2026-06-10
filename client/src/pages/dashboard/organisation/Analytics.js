import React, { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout/Layout";
import API from "../../../services/API";
import moment from "moment";

const Analytics = () => {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data } = await API.get("/inventory/analytics");
        if (data?.success) {
          setBloodGroups(data.bloodGroups);
          setRecentTransactions(data.recentTransactions);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h4 className="mb-4">Blood Inventory Analytics</h4>
        <div className="row g-3 mb-4">
          {bloodGroups?.map((item) => (
            <div className="col-md-3" key={item.bloodGroup}>
              <div className="card border-danger h-100">
                <div className="card-body text-center">
                  <h5 className="card-title text-danger">{item.bloodGroup}</h5>
                  <p className="mb-1">
                    <strong>Total In:</strong> {item.totalIn} ML
                  </p>
                  <p className="mb-1">
                    <strong>Total Out:</strong> {item.totalOut} ML
                  </p>
                  <p className="mb-0">
                    <strong>Available:</strong>{" "}
                    <span
                      className={
                        item.totalAvailable > 0
                          ? "text-success"
                          : "text-danger"
                      }>
                      {item.totalAvailable} ML
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h5 className="mb-3">Recent Blood Transactions (Last 10)</h5>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Blood Group</th>
              <th>Quantity (ML)</th>
              <th>Donar / Hospital</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions?.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No transactions yet.
                </td>
              </tr>
            )}
            {recentTransactions?.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>
                  <span
                    className={`badge ${
                      record.inventoryType === "in"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}>
                    {record.inventoryType?.toUpperCase()}
                  </span>
                </td>
                <td>{record.bloodGroup}</td>
                <td>{record.quantity}</td>
                <td>
                  {record.inventoryType === "in"
                    ? record.donar?.name || record.email
                    : record.hospital?.hospitalName || record.email}
                </td>
                <td>
                  {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Analytics;
