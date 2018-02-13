import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     * 
     */
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    let { books } = this.state;
    const shelfBooks = [{
      id: 1,
      title: 'Currently Reading',
      books: books.filter(book => book.shelf === 'currentlyReading')
    },
    {
      id: 2,
      title: 'Want To Read',
      books: books.filter(book => book.shelf === 'wantToRead')
    },
    {
      id: 3,
      title: 'Read',
      books: books.filter(book => book.shelf === 'read')
    }]

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div id="tese" className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {shelfBooks.map(shelf =>
              (
                <ListBooks key={shelf.id} title={shelf.title} books={shelf.books} />
              ))
            }
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
        } />

        <Route path='/search' component={SearchBooks} />


      </div>
    )
  }
}

export default BooksApp
