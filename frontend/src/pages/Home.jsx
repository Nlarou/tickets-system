import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
function Home() {
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
      <Link to="/dashboard" className="btn btn-block">
        <FaTicketAlt />
        dashboard
      </Link>
    </>
  );
}

export default Home;
