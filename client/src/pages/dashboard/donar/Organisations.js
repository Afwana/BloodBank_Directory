import React, { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout/Layout";
import API from "../../../services/API";
import moment from "moment";

const Organisations = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const { data } = await API.get("/inventory/donor-organisations");
        if (data?.success) setData(data.organisations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrgs();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h4 className="mb-3">Organisations You Donated To</h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Organisation Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Website</th>
              <th>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center">
                  No organisations found. Donate blood through an organisation
                  first.
                </td>
              </tr>
            )}
            {data?.map((org, index) => (
              <tr key={org._id}>
                <td>{index + 1}</td>
                <td>{org.organisationName}</td>
                <td>{org.email}</td>
                <td>{org.phone}</td>
                <td>{org.address}</td>
                <td>{org.website || "N/A"}</td>
                <td>{moment(org.createdAt).format("DD/MM/YYYY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Organisations;
