import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { BooksListingComponent } from './eBook/books-listing/books-listing.component';
import { authGuardGuard } from './gaurd/auth-guard.guard';
import {BookDetailsComponent} from './eBook/book-details/book-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'signup',
    component: SignUpComponent,
    title: 'Sign Up'
  },
  {
    path: 'booksListing',
    component: BooksListingComponent,
    canActivate: [authGuardGuard],
    title: 'Books Listing'
  },
  {
    path: 'book-detail/:bookName',
    component: BookDetailsComponent,
    canActivate: [authGuardGuard],
    title: 'Book Detail'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
