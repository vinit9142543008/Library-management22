import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Books {
  private apiUrl='http://localhost:3000/api/books';
  constructor(private http: HttpClient) {}

  getBooks():Observable<any>{
    return this.http.get(this.apiUrl);
  }


  addBook(book:any):Observable<any>{
    return this.http.post(this.apiUrl,book)
  }

  updateBook(id:number,book:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,book)
  }

  deleteBooks(id:any):Observable<any>{
 return this.http.delete(`${this.apiUrl}/${id}`);  }

  getAllBooks() {
    return this.http.get('http://localhost:3000/api/books');
  }


}
