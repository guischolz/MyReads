import React from 'react'
import './App.css'
import Books from './Books'

class ListBooks extends React.Component {
    render() {
        const shelfBooks = [{
            id: 1,
            title: 'Currently Reading',
            books: this.props.books.filter(book => book.shelf === 'currentlyReading')
        },
        {
            id: 2,
            title: 'Want To Read',
            books: this.props.books.filter(book => book.shelf === 'wantToRead')
        },
        {
            id: 3,
            title: 'Read',
            books: this.props.books.filter(book => book.shelf === 'read')
        }]
        
        return (
            <div className="app">
                {shelfBooks.map((shelf) =>
                        <div className="list-books-content" key={shelf.id}>
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">{shelf.title}</h2>
                                    <div className="bookshelf-books">


                                        <Books books={shelf.books} handlerChange={this.props.onUpdateShelf} />


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default ListBooks