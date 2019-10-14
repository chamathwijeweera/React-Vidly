import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import authService from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import Movies from "./components/movies";
import Customers from "./components/customer";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import NavBar from "./components/common/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = authService.getCurrentUser();
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            ></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="movies" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
