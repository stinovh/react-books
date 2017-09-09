import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import Alert from 'react-s-alert'
import { UnCamelCase } from './helpers'

import './App.css'
import 'react-s-alert/dist/s-alert-default.css'

class App extends Component {
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
      Alert.success(`${book.title} moved to ${UnCamelCase(book.shelf)}`, {
        position: 'top-right'
      });
    })
  }

  render() {

    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <BookList
              books={this.state.books}
              changeShelf={(book, shelf) => this.updateBook(book, shelf)}
            />
            )}/>
          <Route exact path='/search' render={() => (
            <SearchBooks
              books={this.state.books}
              changeShelf={(book, shelf) => this.updateBook(book, shelf)}
            />
          )}/>
          <Alert stack={{limit: 5}} />
      </div>
    )
  }
}

export default App
