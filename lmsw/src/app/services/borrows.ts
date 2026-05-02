import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Borrows {
    private api = 'http://localhost:3000/api/borrow';

  constructor(private http: HttpClient) {}

  borrowBook(data: any) {
    return this.http.post(`${this.api}/borrow`, data  ,this.getHeader());
  }

  returnBook(data: any) {
    return this.http.post(`${this.api}/return`, data  ,this.getHeader());
  }
  getBorrows(){
    
    return this.http.get(this.api,this.getHeader());
  }
  private getHeader(){
    const token=localStorage.getItem('token');
    return{
      headers:new HttpHeaders({
          Authorization: `Bearer ${token}`
      })
    }
  }
}
