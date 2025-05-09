// book-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { CustomPaginatorComponent } from '../paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    CustomPaginatorComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  displayedColumns: string[] = ['title', 'author', 'category', 'year', 'actions'];
  isLoading = true;
  pageSize = 5;
  currentPage = 0;
  filteredData: Book[] = [];

  @ViewChild(CustomPaginatorComponent) paginator!: CustomPaginatorComponent;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (data) => {
        this.books = data;
        this.filteredData = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Hiba a könyvek betöltésekor:', err);
        this.isLoading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.books.filter(book => 
      book.title.toLowerCase().includes(filterValue) || 
      book.author.toLowerCase().includes(filterValue)
    );
    
    if (this.paginator) {
      this.paginator.reset();
    }
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paginatedData(): Book[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }

  deleteBook(id: number): void {
    this.bookService.delete(id).subscribe({
      next: () => this.loadBooks(),
      error: (err) => console.error('Hiba történt:', err)
    });
  }
}