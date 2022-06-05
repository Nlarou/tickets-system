import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import Modal from "react-modal";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { getNotes, createNote } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};
Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate(-1);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    <h3>Something Went Wrong</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <div className="btn btn-reverse btn-back" onClick={() => navigate(-1)}>
          <FaArrowAltCircleLeft /> Back
        </div>

        <h2>
          Ticket ID:{ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted:{" "}
          {new Date(ticket.createdAt).toLocaleDateString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <h3>
          Priority:{" "}
          <span className={`priority priority-${ticket.priority}`}>
            {ticket.priority}
          </span>
        </h3>

        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Notes"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} />;
      })}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
