import React from 'react'
import './App.css'
import Books from './Books'


const ListBooks = ({title, books }) => {
    return (

        <div className="list-books-content">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{title}</h2>
                    <div className="bookshelf-books">


                        <Books books={books} />


                    </div>
                </div>
            </div>
        </div>

    )
}
export default ListBooks