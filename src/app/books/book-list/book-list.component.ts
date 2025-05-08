import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books: Book[] = [];
    
  constructor(private bookService: BookService) {

}

ngOnInit(): void {
  this.loadBooks();
}
  
  delete(id: number) {
   
      const bookToDelete = this.books.find(book => book.id === id);
      if (bookToDelete) {
        this.bookService.delete(bookToDelete);
        this.loadBooks();
      }  
  }

  private loadBooks() {
    this.books = this.bookService.getAll();
  }

}
