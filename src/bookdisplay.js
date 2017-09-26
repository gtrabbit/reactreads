import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookDisplay extends Component {
	static PropTypes = {
		book: PropTypes.object.isRequired,
		onMoveBook: PropTypes.func.isRequired


	}

	state = {}

	moveBook = (shelf) => {
		this.props.onMoveBook(this.props.book.shelf, shelf, this.props.book)
	}
	


	render() {

		return (
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
					<div className="book-shelf-changer">
						<select
							onChange={(event)=> this.moveBook(event.target.value)}
						>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
			<div className="book-title">{this.props.book.title}</div>
			<div className="book-authors">
				{this.props.book.authors.map(a=>(
					<p key={a}> {a} </p>

					))}
			</div>
			</div>
		</li>)
	}


}

export default BookDisplay;