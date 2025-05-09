import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })

export class BookService {
 addBook(book: Book) {
   throw new Error('Method not implemented.');
 }
 updateBook(id: number, book: Book) {
   throw new Error('Method not implemented.');
 }
 getBook(id: number) {
   throw new Error('Method not implemented.');
 }
 private apiUrl = 'http://localhost:3000/books';

 constructor(private http: HttpClient) {}

 getAll(): Observable<Book[]> {
   return this.http.get<Book[]>(this.apiUrl);
 }

 getById(id: number): Observable<Book> {
   return this.http.get<Book>(`${this.apiUrl}/${id}`);
 }

 add(book: Book): Observable<Book> {
   return this.http.post<Book>(this.apiUrl, book);
 }

 update(id: number, book: Book): Observable<Book> {
   return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
 }

 delete(id: number): Observable<void> {
   return this.http.delete<void>(`${this.apiUrl}/${id}`);
 }

}