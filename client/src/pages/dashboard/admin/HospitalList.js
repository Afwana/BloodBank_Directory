import React, { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout/Layout";
import API from "../../../services/API";
import moment from "moment";

const HospitalList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users/hospital");
      if (data?.success) setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;
    try {
      const { data } = await API.delete(`/admin/user/${id}`);
      if (data?.success) {
        alert("Hospital deleted successfully");
        fetchUsers();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h4 className="mb-3">Manage Hospitals</h4>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Hospital Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Website</th>
              <th>Registered On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center">
                  No hospitals registered.
                </td>
              </tr>
            )}
            {users?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.hospitalName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>{user.website || "N/A"}</td>
                <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default HospitalList;
