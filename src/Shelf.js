import React from 'react'
import Book from './Book'

const Shelf = ({ status, books }) => {

  const unCamelCase = (str) => {
    return str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        // uppercase the first character
        .replace(/^./, function(str){ return str.toUpperCase(); })
  }

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{unCamelCase(status)}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map( (book) => (
            <li key={book.id}>
              <Book book={book}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Shelf
