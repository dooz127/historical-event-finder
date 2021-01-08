import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import SearchResults from './SearchResults.jsx';

const EVENTS_PER_PAGE = 10

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      page: 1,
      totalCount: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  getEvents(q, _page = 1) {
    return axios
      .get("/events", {
        params: {
          q,
          _page,
          _limit: EVENTS_PER_PAGE
        }
      })
      .then(res => res)
      .catch(err => console.log(err));
  };

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  handlePageClick(e) {
    let { query } = this.state;
    let page = e.selected + 1;

    this.getEvents(query, page)
    .then(res => {
      this.setState({
        results: res.data,
        page
      })
    })
  }

  handleSearchClick(e) {
    e.preventDefault();
    this.search();
  }

  search() {
    let { query } = this.state;

    if (query !== "") {
      this.getEvents(query, 1)
      .then(res => {
        this.setState({
          results: res.data,
          page: 1,
          totalCount: res.headers['x-total-count']
        })
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    let { results, totalCount } = this.state;

    return (
      <>
        <nav className="navbar navbar-light bg-light sticky-top">
          <div class="container-fluid justify-content-start">
            <a className="navbar-brand" href="#"><img className="logo" src="assets/images/hooli.png" height="30" /></a>
            <form className="d-flex">
              <input type="search" className="form-control me-2" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
              <button type="submit" className="btn btn-outline-secondary" onClick={this.handleSearchClick}>Search</button>
            </form>
          </div>
        </nav>
        <SearchResults results={results} />
        {totalCount > 0 &&
          <ReactPaginate
            activeClassName={'active'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            breakLabel={'...'}
            containerClassName={'pagination pagination-sm justify-content-center'}
            marginPagesDisplayed={0}
            nextClassName={'page-item'}
            nextLabel={'>>'}
            nextLinkClassName={'page-link'}
            onPageChange={this.handlePageClick}
            pageClassName={'page-item'}
            pageCount={totalCount / EVENTS_PER_PAGE}
            pageLinkClassName={'page-link'}
            pageRangeDisplayed={4}
            previousClassName={'page-item'}
            previousLabel={'<<'}
            previousLinkClassName={'page-link'}
          />
        }
      </>
    );
  }
};

export default App;