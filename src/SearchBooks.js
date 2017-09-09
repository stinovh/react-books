import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query:'',
    searchedBooks:''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query) {
      BooksAPI.search(query, 20).then((searchedBooks) => {
        this.updateSearchedBooks(searchedBooks)
        this.setState({ searchedBooks })
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  updateSearchedBooks = (searchedBooks) => {
    searchedBooks.map( book =>  {
      let matchedBook = this.props.books.find(b => b.id === book.id)
      if (matchedBook) {
        book.shelf = matchedBook.shelf
      } else {
        book.shelf = 'none'
      }
      return book
    })
  }

  render() {
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchedBooks.error && <li>No Books Found</li>}
              {this.state.searchedBooks && !this.state.searchedBooks.error && this.state.searchedBooks.map( (book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    changeShelf={this.props.changeShelf}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
    )
  }
}

export default SearchBooks