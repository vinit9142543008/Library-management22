import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

export interface NavigationItem{
  value:string;
  link:string
}

@Component({
  selector: 'app-page-sidenav',
  standalone: false,
  templateUrl: './page-sidenav.html',
  styleUrl: './page-sidenav.css',
})
export class PageSidenav {
  panalName:string=""
  
  navItem:NavigationItem[]=[];

  constructor(public auth:Auth){
    // this.navItem=[
    //   {value:'View-Books',link:'view-books'},
    //   {value:'My Orders',link:'my-orders'}
    // ]
  }

  ngOnInit(): void {
    
    if(this.auth.isAdmin() ){
   this.panalName="Admin Panal ";
   this.navItem=[
     { value: 'All Books', link: '/allBooks' },
        { value: 'All Users', link: '/getallusers' },
        { value: 'All Orders', link: '/datalist' }   
      ]
    } else if (this.auth.isStudent()) {
      this.panalName = "Student Panel";

      this.navItem = [
        { value: 'View Books', link: '/allBooks' },
        { value: 'My Orders', link: '/datalist' }
      ];
    }
  }

}
