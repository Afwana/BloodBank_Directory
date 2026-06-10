import React, { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout/Layout";
import API from "../../../services/API";
import moment from "moment";

const Donations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await API.get("/inventory/donor-donations");
        if (data?.success) setData(data.donations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDonations();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h4 className="mb-3">My Donations</h4>
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
                  No donations recorded yet.
                </td>
              </tr>
            )}
            {data?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.organisation?.organisationName}</td>
                <td>{item.bloodGroup}</td>
                <td>{item.quantity}</td>
                <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donations;
