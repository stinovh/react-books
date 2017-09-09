import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {

  handleChange(e, book) {
    this.props.changeShelf(book, e.target.value)
  }

 render () {
   const { book } = this.props

   return (
     <div className="book">
       <div className="book-top">
         <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
         <div className="book-shelf-changer">
           <select defaultValue={book.shelf} onChange={(e) => this.handleChange(e, book)}>
             <option value="none" disabled>Move to...</option>
             <option value="currentlyReading">Currently Reading</option>
             <option value="wantToRead">Want to Read</option>
             <option value="read">Read</option>
             <option value="none">None</option>
           </select>
         </div>
       </div>
       <div className="book-title">{book.title}</div>
       <div className="book-authors">{book.authors.join(', ')}</div>
     </div>
   )
 }
}

export default Book
