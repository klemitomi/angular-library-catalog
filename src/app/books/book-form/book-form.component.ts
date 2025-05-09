import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  bookForm: FormGroup;
  isSubmitting = false;
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.maxLength(30)]],
      year: ['', [Validators.required, Validators.min(1800), Validators.max(this.currentYear)]]
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const bookData: Book = {
      ...this.bookForm.value,
      year: Number(this.bookForm.value.year)
    };

    this.bookService.add(bookData).subscribe({
      next: () => {
        this.snackBar.open('Könyv sikeresen hozzáadva!', 'OK', { duration: 3000 });
        this.navigateToList();
      },
      error: (err) => {
        console.error('Hiba történt:', err);
        this.snackBar.open('Hiba történt a könyv hozzáadásakor!', 'Bezár', { duration: 3000 });
        this.isSubmitting = false;
      }
    });
  }

  navigateToList(): void {
    this.router.navigate(['/books']);
  }

  get title() { return this.bookForm.get('title'); }
  get author() { return this.bookForm.get('author'); }
  get category() { return this.bookForm.get('category'); }
  get year() { return this.bookForm.get('year'); }
}