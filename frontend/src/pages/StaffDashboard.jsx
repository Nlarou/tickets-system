import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import DetailedTicketItem from "../components/DetailedTicketItem";
function StaffDashboard() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);
  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings-staff">
          <div>Date</div>
          <div>Product</div>
          <div>Author</div>
          <div>Priority</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets?.map((ticket) => {
          return <DetailedTicketItem key={ticket._id} ticket={ticket} />;
        })}
      </div>
    </>
  );
}

export default StaffDashboard;
