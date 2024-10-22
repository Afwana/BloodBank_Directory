import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "./../../services/API";
import moment from "moment";

const Hospital = () => {
  const [data, setData] = useState([]);

  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);
  return (
    <Layout>
      <div className="p-4">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Website</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record, index) => (
              <tr key={record?._id}>
                <td>{index + 1}</td>
                <td>{record?.hospitalName}</td>
                <td>{record?.phone}</td>
                <td>{record?.email}</td>
                <td>{record?.address}</td>
                <td>{record?.website}</td>
                <td>
                  {moment(record?.createdAt).format("DD/MM/YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Hospital;
