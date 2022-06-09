import React, { useEffect, useState, useMemo } from "react";
import Table from "../components/Table";
import { useSelector, useDispatch } from "react-redux";
import { getStaffMembers, setRole, reset } from "../features/auth/authSlice";
import Modal from "react-modal";
import Spinner from "../components/Spinner";
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
function UserManagement() {
  const { user, staffMembers, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [currentRole, setCurrentRole] = useState("regular");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //Definition of the column and data associated
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Email",
        accessor: "email",
      },

      ,
    ],
    []
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getStaffMembers());
    setLoading(false);
  }, [dispatch, isError, isSuccess, message]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const onUserSubmit = (e) => {
    e.preventDefault();

    dispatch(setRole({ email, currentRole })).then(() => {
      if (isSuccess) {
        toast.success("Role Modified Successfully");
        dispatch(getStaffMembers());
      }
    });
    closeModal();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="btn-container">
        <button
          className="btn btn-circle btn-reverse-no-border btn-sm"
          onClick={openModal}
        >
          <div className="MultiIcon-root">
            <div className="MultiIcon-label">
              <svg
                className="MuiSvgIcon-root"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
              </svg>
            </div>
          </div>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add User staff"
        >
          <h2>Change Role</h2>
          <button className="btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onUserSubmit}>
            <div className="form-group">
              <input
                name="email"
                id="email"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <label>Role</label>

              <select
                name="role"
                id="role"
                onChange={(e) => setCurrentRole(e.target.value)}
              >
                <option value="regular">Regular</option>
                <option value="staff">Staff</option>
              </select>
              <div className="form-group">
                <button className="btn" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </Modal>
        <p>User</p>
      </div>
      <Table data={staffMembers} columns={columns} />
    </>
  );
}

export default UserManagement;
