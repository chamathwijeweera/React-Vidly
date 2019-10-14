import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utility/paginate";
import DropDown from "./common/dropdown";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import MovieTable from "./moviesTable";
import SearchBox from "./common/SearchBox";
import LoadingBar from "../components/loadingBar";
import _ from "lodash";

class Movies extends Component {
  state = {
    movieList: [],
    genreList: [],
    pageSize: parseInt(5),
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await trackPromise(getMovies());
    this.setState({ movieList: movies, genreList: genres });
  }

  handleLike = movie => {
    const movieList = [...this.state.movieList];
    const index = movieList.indexOf(movie);
    movieList[index] = { ...movieList[index] };
    movieList[index].likeStatus = !movieList[index].likeStatus;
    this.setState({ movieList });
  };

  handleDelete = async movie => {
    const originalDataSet = this.state.movieList;
    const movies = this.state.movieList.filter(o => o._id !== movie._id);
    this.setState({ movieList: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");

      this.setState({ movieList: originalDataSet });
    }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      movieList,
      currentPage,
      pageSize,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;

    let filteredList = movieList;

    if (searchQuery)
      filteredList = movieList.filter(o =>
        o.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredList = movieList.filter(o => o.genre._id === selectedGenre._id);

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
      sortColumn,
      searchQuery
    } = this.state;

    const { totalCount, data: pagedMovieList } = this.getPageData();

    const { user } = this.props;

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
          <LoadingBar />
        </div>
        <div className="col-8">
          <div className="row">
            {user && user.isAdmin && (
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}
          </div>
          <div className="row">
            <label>Shows&nbsp;</label>
            <DropDown
              onPageCountChange={this.handlePageCountChange}
              pageSize={pageSize}
            />
            <label>&nbsp;movies</label>
          </div>
          <div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
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
