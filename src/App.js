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
    books: [],
    shelves: [
              {
                'title': 'Currently Reading',
                'books': [],
                'name': 'currentlyReading'
                },
              {
                'title': 'Upcoming Reads',
                'books': [],
                'name': 'wantToRead'
                },
              {
                'title': 'Archive',
                'books': [],
                'name': 'read'
                }
            ]

  }

  shelves = ['currentlyReading', 'wantToRead', 'read', 'none']

  onMoveBook(formerShelf, newShelf, book){
    const shelfIndeces = [this.shelves.indexOf(formerShelf), this.shelves.indexOf(newShelf)]


    if (newShelf === 'none'){
      BooksAPI.update(book, newShelf)
      delete book.shelf;
      this.setState(state => {
        state.shelves[shelfIndeces[0]].books.splice(
        state.shelves[shelfIndeces[0]].books.indexOf(book), 1)
      })
    } else {
       BooksAPI.update(book, newShelf)//.then(res=>console.log(res)).catch(err=>{console.log(err)});
    
    book.shelf = newShelf
    this.setState(state=>{
      state.shelves[shelfIndeces[1]].books.push(
        state.shelves[shelfIndeces[0]].books.splice(
        state.shelves[shelfIndeces[0]].books.indexOf(book), 1)[0])
      return {shelves: state.shelves}
    })
    }


   
  }

  onAddBook(old, newShelf, book){   
    BooksAPI.update(book, newShelf)
    this.setState(state=>{
      state.shelves[this.shelves.indexOf(newShelf)].books.push(book)
    })
  }



  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState((state)=>{
        books.forEach(a=>{
          switch(a.shelf){
            case this.shelves[0]:
              state.shelves[0].books.push(a);
              break;
            case this.shelves[1]:
              state.shelves[1].books.push(a);
              break;
            case this.shelves[2]:
              state.shelves[2].books.push(a);
              break;
            default:
              break;
          }
        })

        return {
          books: books,
          shelves: state.shelves
        }

      })
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
                  {this.state.shelves.map((a, i)=>(

                    <BookList 
                      books={a.books}
                      key={i}
                      shelf={a} 
                      onMoveBook={this.onMoveBook.bind(this)}
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
          path="/addbook"
          render={({history})=>(
            <div>
              <Header> </Header>

              <SearchPage
                addBook={this.onAddBook.bind(this)}
              > </SearchPage>
            </div>

            )}
            />

        </div>
     
    )
  }
}

export default BooksApp;
