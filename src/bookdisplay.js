import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookDisplay extends Component {
	static PropTypes = {
		book: PropTypes.object.isRequired,
		onMoveBook: PropTypes.func.isRequired,
		shelf: PropTypes.object.isRequired

	}

	state = {
		shelf: this.props.shelf.name,
		added: false
	}


	moveBook = (eventTarget) => {
		
		if (this.state.shelf === 'search'){
			if (eventTarget.value === 'none'){
				return false;
			}

			this.setState({added: true})
		}
		eventTarget.defaultValue = eventTarget.value;
		this.props.onMoveBook(this.props.book.shelf, eventTarget.value, this.props.book)
		this.setState({shelf: eventTarget.value})
	}
	


	render() {

		const values = [
			["currentlyReading", "Currently Reading"],
			["wantToRead", "Upcoming Reads"],
			["read", "Archive"],
			["none", "Remove"]];

		return (
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
					<div className="book-shelf-changer">
						<select
							onChange={(event)=> this.moveBook(event.target)}
							defaultValue={this.state.shelf}
						>
						<option value="search" disabled>Move to...</option>
						{values.map(a=>(
							<option key={a[0]} value={a[0]}>
								{a[1]} </option>
						))}

	
						</select>
					</div>
				</div>
			<div className="book-title">{this.props.book.title}</div>
			
			<div className="book-authors">
				{this.props.book.authors && this.props.book.authors.map(a=>(
					<p key={a}> {a} </p>

					))}
			</div>
			<div className="added-marker" style={{display: this.state.added ? 'flex' : 'none'}}> Added to Collection! </div>
			</div>
		</li>)
	}


}

export default BookDisplay;