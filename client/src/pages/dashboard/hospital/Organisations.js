import React, { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout/Layout";
import API from "../../../services/API";
import moment from "moment";

const HospitalOrganisations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await API.get("/inventory/hospital-organisations");
        if (data?.success) setData(data.records);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecords();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h4 className="mb-3">Donors Under Supplying Organisations</h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Donor Name</th>
              <th>Donor Email</th>
              <th>Organisation</th>
              <th>Blood Group</th>
              <th>Quantity (ML)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No donor records from supplying organisations yet.
                </td>
              </tr>
            )}
            {data?.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.donar?.name || "N/A"}</td>
                <td>{record.donar?.email || record.email}</td>
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

export default HospitalOrganisations;
