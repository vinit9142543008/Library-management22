import { Component, OnInit } from '@angular/core';
import { Books } from '../../services/books';
import { Borrows } from '../../services/borrows';

@Component({
  selector: 'app-bookborrow',
  templateUrl: './bookborrow.html',
  styleUrl: './bookborrow.css',
})
export class Bookborrow   {

  books: any[] = [];

  constructor(
    private bookService: Books,
    private borrowService: Borrows
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // GET BOOKS
  loadBooks() {
    this.bookService.getBooks().subscribe((res: any) => {
      this.books = res;
    });
  }

  // BORROW BOOK
  borrowBook(book: any) {
    const data = {
      studentId: 1,
      bookId: book.id
    };

    console.log("BORROW REQUEST:", data);

    this.borrowService.borrowBook(data).subscribe({
      next: (res) => {
        console.log("SUCCESS:", res);
        alert(res || "Book Borrowed");
        this.loadBooks(); // refresh stock
      },
      error: (err) => {
        console.log("ERROR:", err);
        alert(err.error?.message || "Error borrowing book");
      }
    });
  }

  // DELETE BOOK
  deleteBook(id: number) {
    this.bookService.deleteBooks(id).subscribe(() => {
      this.loadBooks();
    });
  }
}