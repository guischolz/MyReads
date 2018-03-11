import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Books from './Books'
import { DebounceInput } from 'react-debounce-input';

class SearchBooks extends React.Component {
    state =
        {
            searchResult: []
        }

    searchBooksHandler = (query) => {

        if (query === '') { this.setState({ searchResult: [] }) }
        else {
            BooksAPI.search(query.trim())
                .then((result) => {
                    if (result && !result.error) {
                        const books = result;
                        let shelfs = this.props.booksShelfs;
                        let resultBooks = books.map(r => {

                            if (shelfs.find(s => (s.id === r.id))) {
                                return (
                                    {
                                        ...r,
                                        "shelf": shelfs.filter(s => s.id === r.id).shelf
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

                        <DebounceInput onChange={(event) => this.searchBooksHandler(event.target.value)} placeholder="Search by title or author" debounceTimeout={200} />

                    </div>
                </div>
                <div className="search-books-results">
                    <Books books={this.state.searchResult} />
                </div>
            </div>

        );
    }
}

export default SearchBooks;