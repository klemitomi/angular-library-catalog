import { Injectable } from '@angular/core';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 1,
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J. K. Rowling',
      category: 'Fantasy',
      year: 1997
    },
    {
      id: 2,
      title: 'The Lord of the Rings',
      author: 'J. R. R. Tolkien',
      category: 'Fantasy',
      year: 1954
    },
    {
      id: 3,
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      category: 'Fantasy',
      year: 1937
    },
    {
      id: 4,
      title: 'The Chronicles of Narnia',
      author: 'C. S. Lewis',
      category: 'Fantasy',
      year: 1950
    },
    {
      id: 5,
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      category: 'Mystery',
      year: 2003
    },
    {
      id: 6,
      title: 'The Girl with the Dragon Tattoo',
      author: 'Stieg Larsson',
      category: 'Mystery',
      year: 2005
    },
    {
      id: 7,
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      category: 'Mystery',
      year: 2003
    }
  ];
  
  constructor(private http: HttpClient) { }

  getAll(): Book[] {
    return [...this.books];
  }

  add(book: Book): void {
    this.books.push(book);
  }
 
  update(book: Book): void {
    const index = this.books.findIndex(b => b === book);
    if (index > -1) {
      this.books[index] = book;
    }
  }

  delete(book: Book): void {
   this.books = this.books.filter(b => b !== book);
  }
}
