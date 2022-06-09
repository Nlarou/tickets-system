import React from "react";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Table from "../components/Table";
function Dashboard() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  //Definition of the column and data associated
  const columns = useMemo(
    () => [
      {
        Header: "Data",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => new Date(value).toLocaleString("en-US"),
      },
      {
        Header: "Product",
        accessor: "product",
      },
      {
        Header: "Author",
        accessor: "user.name",
      },
      {
        Header: "Priority",
        accessor: "priority",
        Cell: ({ cell: { value } }) => (
          <div className={`priority priority-${value}`}>{value}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => (
          <div className={`status status-${value}`}>{value}</div>
        ),
      },
      {
        Header: "   ",
        accessor: "_id",
        Cell: ({ cell: { value } }) => (
          <Link to={`/ticket/${value}`} className="btn btn-reverse btn-sm">
            View
          </Link>
        ),
      },
      ,
    ],
    []
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

  return <Table data={tickets} columns={columns} />;
}

export default Dashboard;
