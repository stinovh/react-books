import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class BookList extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(book, shelf) {
    const oldState = this.state.books.filter((b) => b.id !== book.id)
    BooksAPI.update(book, shelf).then((state) => {
      book.shelf = shelf
      this.setState({ books: oldState.concat([ book ]) })
    })
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
                books={this.state.books.filter((book) => book.shelf === status)}
                changeShelf={(book, shelf) => this.updateBook(book, shelf)}
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
}

export default BookList
