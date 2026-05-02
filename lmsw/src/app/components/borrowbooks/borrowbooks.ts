import { Component } from '@angular/core';
import { Books } from '../../services/books';
import { Borrows } from '../../services/borrows';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-borrowbooks',
  standalone: false,
  templateUrl: './borrowbooks.html',
  styleUrl: './borrowbooks.css',
})
export class Borrowbooks {
books: any[] = [];

  constructor(
    private bookService: Books,
    private borrowService: Borrows
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((res: any) => {
      this.books = res;
    });
  }

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

  deleteBook(id: number) {
    this.bookService.deleteBooks(id).subscribe(() => {
      this.loadBooks();
    });
  }
  returnBooks(id:any){
    this.borrowService.returnBook({id}).subscribe({
       next: (res: any) => {
        alert("Fine: ₹" + res.fine);
        this.loadBooks();
      },
      error: (err) => {
        alert(err.error?.message || "Error");
      }
    });
  }
}

