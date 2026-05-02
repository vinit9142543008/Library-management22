import { Component } from '@angular/core';
import { Books } from '../../services/books';
import { F } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-page-books',
  standalone: false,
  templateUrl: './page-books.html',
  styleUrl: './page-books.css',
})
export class PageBooks {
  books: any[] = [];
  showForm= false;
  isEdit=false;
  displayedColumns: string[] = [
    'id', 'title', 'author', 'category', 'price', 'quantity', 'actions'
  ];
  booksForm:any={
    id:null, title: '',
    author: '',
    category: '',
    price: '',
    quantity: ''
  }
  constructor(private bookService: Books) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((res: any) => {
       console.log("API RESPONSE:", res);
      this.books = res;
      console.log(this.books);
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBooks(id).subscribe(() => {
      this.loadBooks(); 
    });
  }

  saveBooks(){
    if(this.isEdit){
      this.bookService.updateBook(this.booksForm.id,this.booksForm).subscribe(()=>{
        this.loadBooks();
        this.showForm=false
      });
    } else{
      this.bookService.addBook(this.booksForm).subscribe(()=>{
        this.loadBooks();
        this.showForm=false
      })
    }
  }

  editBook(book: any) {
    this.showForm = true;
    this.isEdit = true;

    this.booksForm = { ...book };
  }

  cancel(){
    this.showForm=false;
  }
  openAddForm() {
    this.showForm = true;
    this.isEdit = false;

    this.booksForm = {
      title: '',
      author: '',
      category: '',
      price: '',
      quantity: ''
    };
  }
}
