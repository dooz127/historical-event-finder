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
        <div className="search">
          <img className="logo" src="assets/images/hooli.png" />
          <form>
            <input type="text" onChange={this.handleChange}/>
            <button type="submit" onClick={this.handleSearchClick}>Search!</button>
          </form>
        </div>
        <hr />
        <SearchResults results={results} />
        {totalCount > 0 &&
          <ReactPaginate
            activeClassName={'active'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            breakLabel={'...'}
            containerClassName={'pagination'}
            marginPagesDisplayed={2}
            nextClassName={'page-item'}
            nextLabel={'Next'}
            nextLinkClassName={'page-link'}
            onPageChange={this.handlePageClick}
            pageClassName={'page-item'}
            pageCount={totalCount / EVENTS_PER_PAGE}
            pageLinkClassName={'page-link'}
            pageRangeDisplayed={5}
            previousClassName={'page-item'}
            previousLabel={'Previous'}
            previousLinkClassName={'page-link'}
          />
        }
      </>
    );
  }
};

export default App;