import React from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

const BookList = ({ books }) => {
  const shelfStatuses = ['currentlyReading', 'wantToRead', 'read']

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfStatuses.map( (status) =>
            <Shelf
              key={status}
              status={status}
              books={books.filter((book) => book.shelf === status)}
            />
          )}
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
      </div>
    </div>
  )
}

export default BookList
