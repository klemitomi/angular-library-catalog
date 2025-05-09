import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', category: '', year: 0 };

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.bookService.getById(id).subscribe(b => {
        this.book = b;
      });
    }
  }

  save(): void {
    const action$ = this.book.id
      ? this.bookService.update(this.book.id, this.book)
      : this.bookService.add(this.book);

    action$.subscribe(() => {
      this.router.navigate(['/books']);
    });
  }
}
