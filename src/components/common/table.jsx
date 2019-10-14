import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import LoadingBar from "../loadingBar";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <React.Fragment>
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </table>
      <LoadingBar />
    </React.Fragment>
  );
};

export default Table;
