import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {search} from './BooksAPI'
import BookDisplay from './bookdisplay'


class SearchPage extends Component {
    static PropTypes = {
    addBook: PropTypes.func.isRequired,
    oldBooks: PropTypes.array

  }

  state = {
    results: [],
    query: ''
  }


  updateQuery = (e) => {
    this.setState({
      query: e
    })
    if (e){
      search(e).then(res => {
        this.setState({results: res.filter(a => !this.props.oldBooks.some(b=> b.id === a.id))});
        })
    }

  }


  render () {
    let results = this.state.results.error ? false : this.state.results;
    return (
       <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
 
                <input 
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(e)=> this.updateQuery(e.target.value)}
                  />

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
                                  shelf={'search'}
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



    