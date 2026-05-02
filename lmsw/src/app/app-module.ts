import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { PageHeader } from './components/page-header/page-header';
import { PageFooter } from './components/page-footer/page-footer';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { PageSidenav } from './components/page-sidenav/page-sidenav';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatNavList, MatListItem, MatList } from '@angular/material/list';
import { PageNotfound } from './components/page-notfound/page-notfound';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatFormField, MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { PageBooks } from './components/page-books/page-books';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Borrowbooks } from './components/borrowbooks/borrowbooks';
import { Datalist } from './components/datalist/datalist';
import { Admin } from './components/admin/admin';
import { Students } from './components/students/students';
import { Resetpassword } from './components/resetpassword/resetpassword';
import { AllUsers } from './components/all-users/all-users';

@NgModule({
  declarations: [
    App,
    PageHeader,
    PageFooter,
    PageSidenav,
    PageNotfound,
    Login,
    Register,
    AllUsers,
    PageBooks,
    Borrowbooks,
    Datalist,
    Admin,
    Students,
    Resetpassword,
    AllUsers,
    
  ],
  imports: [
    BrowserModule, MatCard,
    AppRoutingModule,CommonModule,BrowserModule,
    MatButtonModule,
    MatToolbar,
    HttpClientModule, MatMenu, 
     MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    // provideHttpClient,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent, MatCard, FormsModule,
    MatCardContent, MatNavList, MatIconModule,
    MatCardActions, MatFormField, MatLabel, MatInput, ReactiveFormsModule,
    MatList, MatListItem, MatCardTitle, MatCardHeader, MatCardContent, MatGridList, MatGridTile,
    MatLabel,
    MatSuffix,
    MatMenuTrigger
],
  providers: [
    provideBrowserGlobalErrorListeners(), provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
