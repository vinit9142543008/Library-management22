import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: false,
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
   user:any={};
  userName:string='';
  role:string='';
constructor(private auth:Auth,private router:Router){}

  ngOnInit(): void {
   const user=this.auth.getUser();
  this.auth.user$.subscribe(user=>{
    
     console.log('USER DATA:', user);
  if(user ){
    this.user=user;
    this.userName=user.firstname+ ' '+ user.lastname;
    this.role=user.role;
   }
  })
   
    
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }

}
