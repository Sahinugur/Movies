import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  state = {
    searchQuery: "",
  };
  handleFormSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className="form-row mb-5">
          <div className="col-10">
            <input
              onChange={this.props.searchMovieProp}
              type="text"
              className="form-control"
              placeholder="Search a movie"
            />
          </div>

          <div className="col-2">
            <Link to="/add">
              <button
                type="button"
                className="btn btn-md btn-danger"
                style={{ float: "right" }}
              >
                Add Movie
              </button>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
