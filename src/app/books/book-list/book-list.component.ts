import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
  ],
  providers: [BookService],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['title', 'author', 'category', 'year', 'actions'];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = new MatTableDataSource<Book>(data);
        this.books.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a könyvek betöltésekor:', err);
        this.isLoading = false;
      }
    });
  }

  editBook(id: number): void {
    // pl. navigálás a szerkesztő formhoz
    console.log('Edit book with ID:', id);
  }

  deleteBook(id: number): void {
    this.bookService.delete(id).subscribe(() => {
      this.loadBooks();
    });
  }
}
