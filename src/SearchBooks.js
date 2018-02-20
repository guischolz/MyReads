import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends React.Component {
    state =
        {
            books: []
        }

    searchBooksHandler = (query) => {

        if (query === '') { this.setState({ books: [] }) }
        else {
            BooksAPI.search(query.trim())
                .then((result) => {
                    const books = result.error ? [] : result
                    this.setState({ books })
                })
                .catch((error) =>
            {
                console.log(error);
                console.log(this.state.books);
                this.setState({ books: [] });
            })
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        
                            <DebounceInput onChange={(event) => this.searchBooksHandler(event.target.value)} placeholder="Search by title or author" debounceTimeout={300} />
                        
                    </div>
                </div>
                <div className="search-books-results">
                    <Books books={this.state.books} />
                </div>
            </div>

        );
    }
}

export default SearchBooks;