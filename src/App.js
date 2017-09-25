import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BookList from './booklist'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: []

  }
  reading = [];
  upcoming = [];
  read = [];

  onMoveBook(formerShelf, newShelf, book){
    BooksAPI.update(book, newShelf).then(res=>console.log(res));
    console.log(formerShelf, newShelf, book)
 
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      console.log(books);
      this.setState({books})
      let shelves = ['currentlyReading', 'wantToRead', 'read']
      books.forEach(a=>{
        switch(a.shelf){
          case shelves[0]:
            this.reading.push(a);
            break;
          case shelves[1]:
            this.upcoming.push(a);
            break;
          case shelves[2]:
            this.read.push(a);
            break;
          default:
            break;
        }
      })
        this.setState(
        {
          shelves: [
              {
                'title': 'Currently Reading',
                'books': this.reading,
                'name': 'currentlyReading'
                },
              {
                'title': 'Upcoming Reads',
                'books': this.upcoming,
                'name': 'wantToRead'
                },
              {
                'title': 'Archive',
                'books': this.read,
                'name': 'read'
                }
            ]
        }
     


        )
    })
  }

  moveBook = (book, shelf)=>{
    //move the book to the shelf

  }




  render() {
    return (
      <div className="app">

      <Route
        exact path="/"
        render={()=>(
          
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelves.map((a, i)=>(

                    <BookList 
                      books={a.books}
                      key={i}
                      shelf={a} 
                      onMoveBook={this.onMoveBook}
                      />
                    ))
                  }
                </div>
              </div>
              <div className="open-search">
                <Link to="/addbook">Add a book </Link> 
              </div>
            </div>
          

          )}
        />
        <Route
          path="/dogblanket"
          render={({history})=>(
              <p> kiises </p>

            )}
            />

        </div>
     
    )
  }
}

export default BooksApp
