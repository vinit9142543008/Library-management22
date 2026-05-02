import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotfound } from './components/page-notfound/page-notfound';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { PageBooks } from './components/page-books/page-books';
import { Bookborrow } from './components/bookborrow/bookborrow';
import { Borrowbooks } from './components/borrowbooks/borrowbooks';
import { Datalist } from './components/datalist/datalist';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';
import { Resetpassword } from './components/resetpassword/resetpassword';
import { AllUsers } from './components/all-users/all-users';

// const routes: Routes = [
//   {path:'register',component:Register},
//   {path:'login',component:Login},
//   {path:'getallusers',component:Users},
//   {path:'allBooks',component:PageBooks},
//   {path:'bookborrow',component:Borrowbooks},
//   {path:'datalist',component:Datalist},
//   {path:'**',component:PageNotfound}
// ];
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path:'reset-password',component:Resetpassword},

  {
    path: 'student',
    canActivate: [AuthGuard],
    children: [
      { path: 'books', component: Borrowbooks },   
      { path: 'orders', component: Datalist }     
    ]
  },

  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'users', component: AllUsers },       
      { path: 'books', component: PageBooks },    
      { path: 'orders', component: Datalist }     
    ]
  },
  {path:'**',component:PageNotfound}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
