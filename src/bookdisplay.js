import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookDisplay extends Component {
	static PropTypes = {
		book: PropTypes.object.isRequired,
		onMoveBook: PropTypes.func.isRequired,
		shelf: PropTypes.object.isRequired

	}

	state = {
		shelf: this.props.shelf,
		added: false
	}


	moveBook = (eventTarget) => {
		
		if (this.state.shelf === 'search'){
			if (eventTarget.value === 'none'){
				return false;
			}
			this.setState({added: true})
		}

		this.setState({shelf: eventTarget.value});
		this.props.onMoveBook(this.props.book.shelf, eventTarget.value, this.props.book)

	}
	
	values = [
			["currentlyReading", "Currently Reading"],
			["wantToRead", "Upcoming Reads"],
			["read", "Archive"],
			["none", "Remove"]];


	render() {

 

		return (
		<li>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{background: this.props.book.imageLinks.hasOwnProperty('thumbnail') ? `url(${this.props.book.imageLinks.thumbnail})` : 'silver'}}></div>
					<div className="book-shelf-changer">
						<select
							onChange={(event)=> this.moveBook(event.target)}
							defaultValue={this.state.shelf}
						>
						<option value="search" disabled>Move to...</option>
						{this.values.map(a=>(
							<option 
								key={a[0]}
								value={a[0]}
								disabled={(this.state.shelf === 'search' && a[0] === 'none') ? true : false}>
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