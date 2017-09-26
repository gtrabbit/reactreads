import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookDisplay from './bookdisplay'


class BookList extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		shelf: PropTypes.object.isRequired,
		onMoveBook: PropTypes.func.isRequired

	}

	state = {}

	render() {

		return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{this.props.books.map((a,i)=>(
                    		<BookDisplay 
                    			book={a}
                    			key={i}
                          shelf={this.props.shelf}
                    			onMoveBook={this.props.onMoveBook} />

                    		))}
                    </ol>
                  </div>
                </div>
                
        )}

}

export default BookList;