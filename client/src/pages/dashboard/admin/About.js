import React, { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout/Layout";
import API from "../../../services/API";

const About = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/admin/stats");
        if (data?.success) setStats(data.stats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <div className="card mb-4 abt-card">
          <div className="card-body">
            <h3 className="text-danger fw-bold">Blood Bank Directory</h3>
            <p className="lead mt-3">
              A comprehensive blood bank management system connecting donors,
              organisations, hospitals, and administrators on one platform.
            </p>
            <p>
              <strong>Save a life, Give blood.</strong> This application helps
              blood banks and organisations track blood inventory, manage donors
              and hospitals, and ensure blood reaches those who need it most.
            </p>
            <hr />
            <h5 style={{ color: "#0f766e" }}>Platform Features</h5>
            <ul>
              <li>
                Donors can track donations and organisations they donated to
              </li>
              <li>
                Organisations manage blood IN/OUT inventory with analytics
              </li>
              <li>Hospitals view supply chains and consumption records</li>
              <li>Admins manage all users across the platform</li>
            </ul>
          </div>
        </div>

        <h5 className="mb-3" style={{ color: "#ff0000" }}>
          Platform Overview
        </h5>
        <div className="row g-3">
          <div className="col-md-3">
            <div
              className="card text-center kpi-card"
              style={{ backgroundColor: "#b9f2c4" }}
            >
              <div className="card-body">
                <h2 className="text-success">{stats.donars || 0}</h2>
                <p className="mb-0">Total Donors</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card text-center kpi-card"
              style={{ backgroundColor: "#cfe2ff" }}
            >
              <div className="card-body">
                <h2 className="text-primary">{stats.hospitals || 0}</h2>
                <p className="mb-0">Total Hospitals</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card text-center kpi-card"
              style={{ backgroundColor: "#fbf6c0" }}
            >
              <div className="card-body">
                <h2 className="text-warning">{stats.organisations || 0}</h2>
                <p className="mb-0">Total Organisations</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card text-center kpi-card"
              style={{ backgroundColor: "#fad2d6" }}
            >
              <div className="card-body">
                <h2 className="text-danger">{stats.inventoryCount || 0}</h2>
                <p className="mb-0">Blood Transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
