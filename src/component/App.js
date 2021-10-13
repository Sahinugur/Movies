import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

require("dotenv").config();

console.log(process.env.REACT_APP_API_KEY);

class App extends React.Component {
  state = {
    movies: [],

    searchQuery: "",
  };

  /*   async componentDidMount() {
    const baseURL = "http://localhost:3002/movies";
    const response = await fetch(baseURL);              two steps with fetch
    console.log(response);                        
    const data = await response.json();     
    console.log(data);
    this.setState({ movies: data });
  } */

  async componentDidMount() {
    const response = await axios.get(
      //`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      `https://api.themoviedb.org/3/list/7110770?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    //one step with axios
    console.log(response.data.items);
    this.setState({ movies: response.data.items });
  }

  // deleteMovie = (movie) => {
  //   const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

  //  /*  this.setState = {
  //     movies: newMovieList,
  //   }; */

  //     this.setState(state => ({
  //     movies: newMovieList
  //   }));
  // };

  //FETCH API
  deleteMovie = async (movie) => {
    const baseURL = `http://localhost:3002/movies/${movie.id}`;
    await fetch(baseURL, {
      method: "DELETE",
    });
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  //AXIOS API
  /*   deleteMovie = async (movie) => {
    axios.post(
      `https://api.themoviedb.org/3/list/7110770/remove_item?media_id=${movie.id}&session_id=${process.env.REACT_APP_SESSION_ID}&api_key=${process.env.REACT_APP_API_KEY}`
    );
    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    this.setState((state) => ({
      movies: newMovieList,
    }));
  }; */

  searchMovie = (event) => {
    //console.log(event.target.value);
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    let filteredMovies = this.state.movies.filter((movie) => {
      return (
        movie.title
          .toLowerCase()
          .indexOf(this.state.searchQuery.toLowerCase()) !== -1
      );
    });
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/add" component={AddMovie} />

            <Route
              path="/"
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>

                  <MovieList
                    movies={filteredMovies}
                    deleteMoviesProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
