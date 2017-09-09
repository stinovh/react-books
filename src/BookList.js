import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
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
                books={this.props.books.filter((book) => book.shelf === status)}
                changeShelf={this.props.changeShelf}
              />
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a Book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
