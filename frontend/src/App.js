import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Ticket";
import PrivateRoute from "./components/PrivateRoute";
import Staff from "./pages/Staff";
import UserManagement from "./pages/UserManagement";
import Dashboard from "./pages/Dashboard";
import HomeStaff from "./pages/HomeStaff";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="staff/" element={<Staff />}>
              <Route
                index
                element={<PrivateRoute neededRole={["staff", "admin"]} />}
              />
              <Route path="home" element={<HomeStaff />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="user-management" element={<UserManagement />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />} />
            </Route>
            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />} />
            </Route>
            <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
              <Route path="/ticket/:ticketId" element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
