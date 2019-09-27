import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utility/paginate";
import DropDown from "./common/dropdown";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movieList: [],
    genreList: [],
    pageSize: parseInt(3),
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movieList: getMovies(), genreList: genres });
  }

  handleLike = movie => {
    const movieList = [...this.state.movieList];
    const index = movieList.indexOf(movie);
    movieList[index] = { ...movieList[index] };
    movieList[index].likeStatus = !movieList[index].likeStatus;
    this.setState({ movieList });
  };

  handleDelete = movie => {
    const movies = this.state.movieList.filter(o => o._id !== movie._id);
    this.setState({ movieList: movies });
  };

  movieCount = () => {
    const { length: count } = this.state.movieList;
    if (count === 0) return "No movies found";
    else return `Showing ${count} movies`;
  };

  handlePageCountChange = pageSize => {
    this.setState({ pageSize, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movieList,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn
    } = this.state;

    const filteredList =
      selectedGenre && selectedGenre._id
        ? movieList.filter(o => o.genre._id === selectedGenre._id)
        : movieList;

    const sortedList = _.orderBy(
      filteredList,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pagedMovieList = paginate(sortedList, currentPage, pageSize);

    return { totalCount: filteredList.length, data: pagedMovieList };
  };

  render() {
    const {
      movieList,
      pageSize,
      selectedGenre,
      genreList,
      sortColumn
    } = this.state;

    const { totalCount, data: pagedMovieList } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            keyGroup="All Genre"
            keyGroupCount={movieList.length}
            items={genreList}
            getGenreItemCount={this.handleGenreItemCount}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col-8">
          <label>Shows&nbsp;</label>
          <DropDown onPageCountChange={this.handlePageCountChange} />
          <label>&nbsp;movies</label>
          <MovieTable
            movies={pagedMovieList}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
