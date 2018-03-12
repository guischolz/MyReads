import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    booksShelve: [],
    searchResult: []
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
      this.setState({ booksShelve: books })

    })
  }


  handlerChange = (bookToUpdate, shelf) => {

    BooksAPI.update(bookToUpdate, shelf).then(() => {
      this.setState((prevState) => {
        return {
          booksShelve:
            prevState.booksShelve.filter(book => book.id !== bookToUpdate.id).concat({
              ...bookToUpdate,
              "shelf": shelf
            })
        }
      })

    })
  }

  searchBooksHandler = (query) => {
    if (query === '') { this.setState({ searchResult: [] }) }
    else {
      BooksAPI.search(query.trim())
        .then((result) => {
          if (result && !result.error) {
            const books = result;
            let resultBooks = books.map(r => {

              if (this.state.booksShelve.find(s => (s.id === r.id))) {
                return (
                  {
                    ...r,
                    "shelf": this.state.booksShelve.filter(s => s.id === r.id)[0].shelf
                  })
              }
              else {
                return ({
                  ...r,
                  "shelf": "none"
                })
              }

            })
            this.setState({ searchResult: resultBooks });

          }
        })

        .catch((error) => {
          console.log(error);
          console.log(this.state.searchResult);
          this.setState({ searchResult: [] });
        })

    }
  }


  render() {

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <div id="tese" className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <ListBooks books={this.state.booksShelve} onUpdateShelf={this.handlerChange} />


            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
        } />

        <Route path='/search' render={() => (

          <SearchBooks searchResult={this.state.searchResult}
            onSearch={this.searchBooksHandler}
            onUpdateShelf={this.handlerChange}
          />
        )} />


      </div>
    )
  }
}

export default BooksApp
