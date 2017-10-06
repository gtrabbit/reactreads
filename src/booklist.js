import React from 'react'
import BookDisplay from './bookdisplay'


const BookList = function(props) {

		return (
                <div className="bookshelf">
                  <h2 className="bookshelf-title"> 
                  {
                  ( (shelf)=>{switch(shelf){
                        case 'currentlyReading':
                          return 'Currently Reading'
                        case 'wantToRead':
                          return 'Upcoming Reads'
                        case 'read':
                          return 'Archive'
                        default:
                          return 'None';
                      }} )(props.shelf)

                  } </h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{props.books.map((a,i)=>(
                    		<BookDisplay 
                    			book={a}
                    			key={i}
                          shelf={props.shelf}
                    			onMoveBook={props.onMoveBook} />

                    		))}
                    </ol>
                  </div>
                </div>
                
        )

}

export default BookList;