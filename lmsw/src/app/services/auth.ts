import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   private apiUrl = 'http://localhost:3000/api/auth';

   user$= new BehaviorSubject<any>(this.getUser())

  constructor(private http: HttpClient) {}

    register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  
   login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        this.user$.next(res.user); 
      })
    );
  }

  setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  this.user$.next(user);
  }


 getUser() {
  const user = localStorage.getItem('user');

  if (!user || user === 'undefined') {
    return null;
  }

  return JSON.parse(user);
}
  
  logout(){
    localStorage.clear();
     this.user$.next(null); 
  }
  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

   isAdmin() {
    const user=this.getUser();
    return user && user.role === 'admin';
  }

  isStudent() {
    const user=this.getUser();
    return user && user.role  === 'student';
  }

  getUsers() {
  return this.http.get('http://localhost:3000/api/auth/users',this.getAuthHeaders());
}
 getToken() {
    return localStorage.getItem('token');
  }

  private getAuthHeaders(){
    const token=this.getToken();
    return{
      headers:new HttpHeaders({
        Authorization:`Bearer ${token}`
      })
    }
  }



 resetPassword(data: any) {
  return this.http.post(`${this.apiUrl}/reset-password`, data);
}

  blockUser(id:any){
    return this.http.put(`${this.apiUrl}/block/${id}`,{})
  }
  unblockUser(id:any){
    return this.http.put(`${this.apiUrl}/unblock/${id}`,{})
  }

}

