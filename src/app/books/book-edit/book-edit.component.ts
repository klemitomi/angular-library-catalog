// book-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './book-edit.component.html'
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  bookId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.bookId = Number(this.route.snapshot.params['id']);
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1800)]]
    });
  }

  ngOnInit() {
    this.bookId = Number(this.route.snapshot.params['id']);
    this.bookService.getById(this.bookId).subscribe(book => {
      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        category: book.category,
        year: book.year.toString()
      });
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = {
        ...this.bookForm.value,
        year: Number(this.bookForm.value.year),
        id: this.bookId
      };

      this.bookService.update(this.bookId, bookData).subscribe({
        next: () => this.router.navigate(['/books']),
        error: (err) => console.error('Hiba történt:', err)
      });
    }
  }
}