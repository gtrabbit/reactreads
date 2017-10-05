import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {search} from './BooksAPI'
import BookDisplay from './bookdisplay'


class SearchPage extends Component {
    static PropTypes = {
    addBook: PropTypes.func.isRequired,

  }

  state = {
    results: []
  }


  sendQuery = (e) => {
    e.preventDefault()
    search(e.target.firstChild.value).then(res => {
      this.setState({results: res});
       })
  }


  render () {
    let results = this.state.results.error ? false : this.state.results;
    return (
       <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <form onSubmit={this.sendQuery}>
                <input 
                  type="text"
                  placeholder="Search by title or author"
                  />
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <li style={{display: results ? 'none' : 'block'}}>No results match that search. Sorry </li>
              {
                (results && results.map((a, i)=>(
                                <BookDisplay
                                  book={a}
                                  key={i}
                                  shelf={{name: 'search'}}
                                  onMoveBook={this.props.addBook}
                                >  </BookDisplay>
                                ))
                )
              }
              </ol>
            </div>
          </div>


      )

 
  } 

}


export default SearchPage



    