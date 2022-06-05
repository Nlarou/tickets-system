import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function DetailedTicketItem({ ticket }) {
  return (
    <div className="ticket-details">
      <div>{new Date(ticket?.createdAt).toLocaleString("en-US")}</div>
      <div>{ticket?.product}</div>
      <div>{ticket?.user?.name}</div>
      <div className={`priority priority-${ticket?.priority}`}>
        {ticket?.priority}
      </div>

      <div className={`status status-${ticket?.status}`}>{ticket?.status}</div>
      <Link to={`/ticket/${ticket?._id}`} className="btn btn-reverse btn-small">
        View
      </Link>
    </div>
  );
}

export default DetailedTicketItem;
