// book-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    MatDialogModule
  ],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnInit {
  books: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['title', 'author', 'category', 'year', 'actions'];
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private router: Router
  ) {}

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
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Törlés megerősítése',
        message: 'Biztosan törölni szeretnéd ezt a könyvet?',
        confirmText: 'Törlés'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.bookService.delete(id).subscribe({
          next: () => this.loadBooks(),
          error: (err) => console.error('Hiba történt:', err)
        });
      }
    });
  }
}