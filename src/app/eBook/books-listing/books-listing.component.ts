import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HeaderComponent} from '../../shared/header/header.component';

@Component({
  selector: 'app-books-listing',
  imports: [
    HeaderComponent
  ],
  templateUrl: './books-listing.component.html',
  standalone: true,
  styleUrl: './books-listing.component.css'
})
export class BooksListingComponent {
  private router = inject(Router);
  books = [
    { id: 1, name: 'Java' },
    { id: 2, name: 'Angular' },
    { id: 3, name: 'DBMS' },
    { id: 4, name: 'React' }
  ];
  loggedInUser: any = JSON.parse(localStorage.getItem('current-user') || '{}');


  purchasedBookIds: string[] = this.getPurchasedBookIds();

  getPurchasedBookIds(): string[] {
    const all = JSON.parse(localStorage.getItem('purchases') || '[]');
    return all
      .filter((entry: any) => entry.userId === this.loggedInUser.id)
      .map((entry: any) => entry.bookId);
  }


  isBookPurchased(bookId: number): boolean {
    return this.purchasedBookIds.includes(String(bookId));
  }

  purchaseBook(bookId: number): void {
    console.log(this.loggedInUser,'loged in jser')
    const all = JSON.parse(localStorage.getItem('purchases') || '[]');

    const alreadyPurchased = all.some(
      (entry: any) =>
        entry.userId === this.loggedInUser.id &&
        entry.bookId === String(bookId)
    );

    if (!alreadyPurchased) {
      all.push({
        userId: this.loggedInUser.id,
        bookId: String(bookId)
      });
      localStorage.setItem('purchases', JSON.stringify(all));
    }
    this.purchasedBookIds = this.getPurchasedBookIds();
  }


  readBook(bookName: string): void {

    const userId = this.loggedInUser.id;
    const readingKey = `reading-book-${userId}-${bookName}`;

    const existingProgress = localStorage.getItem(readingKey);
    if (!existingProgress) {
      const readingData = { userId, bookName, page: 1 };
      localStorage.setItem(readingKey, JSON.stringify(readingData));
    }

    this.router.navigate(['/book-detail', bookName]);
  }

}


