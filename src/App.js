import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BookList from './booklist'
import SearchPage from './searchpage'
import Header from './header'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  shelves = ['currentlyReading', 'wantToRead', 'read']

  onMoveBook(formerShelf, newShelf, book){
    BooksAPI.update(book, newShelf).then(res=>{

      if (newShelf === 'none'){
        this.setState(state=>{
          state.books.splice(state.books.indexOf(book), 1)
        })
      } else {
        this.setState((state)=>{
          state.books.find((a)=>a.id === book.id).shelf = newShelf;
        })
      }
    }) 
  }

  onAddBook(old, newShelf, book){
    book.shelf = newShelf;
    BooksAPI.update(book, newShelf).then(res=>{
      this.setState( (state) => {
        state.books.push(book)
      })
    })
  }



  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books: books})
    })


  }

  render() {
    
    return (
      <div className="app">

      <Route
        exact path="/"
        render={()=>(
          <div className="list-books">
            <Header> </Header>
              <div className="list-books-content">
                <div>
                {this.shelves.map( (a, i) => (
                  <BookList 
                      books={this.state.books.filter(b=>b.shelf===a)}
                      key={i}
                      shelf={a}
                      onMoveBook={this.onMoveBook.bind(this)}
                      />
                    )
                  )}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book </Link> 
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={({history})=>(
            <div>
              <Header> </Header>
              <SearchPage
                addBook={this.onAddBook.bind(this)}
                oldBooks={this.state.books}
              > </SearchPage>
            </div>
            )}
            />

        </div>
     
    )
  }
}

export default BooksApp;
