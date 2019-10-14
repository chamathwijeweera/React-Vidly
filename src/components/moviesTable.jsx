import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MovieTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          likeStatus={movie.likeStatus}
          onLikeToggle={() => this.props.onLike(movie)}
        ></Like>
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-small"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MovieTable;
