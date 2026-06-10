import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import RoleRoute from "./components/Routes/RoleRoute";
import Donar from "./pages/dashboard/Donar";
import Hospital from "./pages/dashboard/Hospitals";
import DonorOrganisations from "./pages/dashboard/donar/Organisations";
import DonorDonations from "./pages/dashboard/donar/Donations";
import Analytics from "./pages/dashboard/organisation/Analytics";
import HospitalOrganisations from "./pages/dashboard/hospital/Organisations";
import Consumer from "./pages/dashboard/hospital/Consumer";
import AdminAbout from "./pages/dashboard/admin/About";
import DonarList from "./pages/dashboard/admin/DonarList";
import HospitalList from "./pages/dashboard/admin/HospitalList";
import OrganisationList from "./pages/dashboard/admin/OrganisationList";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Organisation routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["organisation"]}>
                <Home />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["organisation"]}>
                <Donar />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["organisation"]}>
                <Hospital />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organisation/analytics"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["organisation"]}>
                <Analytics />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Donor routes */}
        <Route
          path="/donar/organisations"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["donar"]}>
                <DonorOrganisations />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar/donations"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["donar"]}>
                <DonorDonations />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Hospital routes */}
        <Route
          path="/hospital/organisations"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["hospital"]}>
                <HospitalOrganisations />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital/consumer"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["hospital"]}>
                <Consumer />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminAbout />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/donars"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <DonarList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/hospitals"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <HospitalList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/organisations"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <OrganisationList />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
