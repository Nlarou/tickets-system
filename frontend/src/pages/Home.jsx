import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { getRole } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
function Home() {
  const { user, role } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  if (loading) {
    <Spinner />;
  }
  useEffect(() => {
    if (role !== "regular") {
      navigate("/staff/");
    }
  }, [user, role]);

  return (
    <>
      <section className="heading">
        <h1>Need supports ?</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create New Ticket
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt />
        View my tickets
      </Link>
    </>
  );
}

export default Home;
