import {Component, inject} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [
    HeaderComponent
  ],
  templateUrl: './book-details.component.html',
  standalone: true,
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  private route = inject(ActivatedRoute);
  bookName = '';
  fullDescription = '';
  paginatedDescription: string[] = [];
  currentPage = 1;
  itemsPerPage = 1000;

  ngOnInit() {
    this.bookName = this.route.snapshot.paramMap.get('bookName') || '';
    this.fullDescription = this.getLongDescription(this.bookName);
    this.paginateDescription();
    let loggedInUser = JSON.parse(localStorage.getItem('current-user') || '{}');

    const userId =loggedInUser.id;
    const readingKey = `reading-book-${userId}-${this.bookName}`;

    const savedProgress = localStorage.getItem(readingKey);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.currentPage = progress.page || 1;
    } else {
      this.currentPage = 1;
      localStorage.setItem(readingKey, JSON.stringify({
        userId,
        bookName: this.bookName,
        page: this.currentPage
      }));
    }
  }

  getLongDescription(name: string): string {
    return `
      ${name} is a powerful subject that covers a wide range of concepts.
      This book is designed to help readers gain strong understanding and application skills.
      It includes examples, exercises, and case studies. You will learn step-by-step from basics to advanced topics.
      Topics covered include theoretical foundations, practical use cases, interview tips, and industry trends.
      By the end of this book, you will have a complete grasp of ${name}.
      ` + ' More content here to simulate a long description. Just like a great cover design captures your eye immediately, every good book description you see is interesting from the first line.\n' +
      '\n' +
      'People are always looking for a reason to move on to the next thing. Don’t give it to them. Make the first sentence something that grabs them and forces them to read the rest.\n' +
      '\n' +
      'Generally speaking, this means focusing on the boldest claim in the book, or the most sensational fact, or the most compelling idea. Then tell them what the book does to help them solve for this pain. Done right, this creates an emotional connection by describing how the book will make the potential reader feel after reading it.\n' +
      '\n' +
      'Or even better, what the reader will get out of reading the book—how will their life transform because of this book?\n' +
      '\n' +
      'Will it make them happy or rich? Will it help them lose weight or have more friends? What do they get once they read this book?\n' +
      '\n' +
      'Be clear about the benefits, don’t insinuate them. You are selling a result to the reader, not a process (even though your book is the process). Explain exactly what the book is about, in clear, obvious terms. This is about letting the reader know why they should listen to you. Why you’re the guide they want to lead them through this journey.\n' +
      '\n' +
      'This can be very short, like a book blurb. You want just enough social proof to make them keep reading.\n' +
      '\n' +
      'This can also go in the hook. If there’s an impressive fact to mention (e.g. “the New York Times Bestselling Author”), that should be bolded in the first sentence.\n' +
      '\n' +
      'Or if there is one salient and amazing thing about you or the book, that can go in the book description.\n' +
      '\n' +
      'Something like, “From the author of [INSERT WELL KNOWN BESTSELLING BOOK.]”\n' +
      'Or, “From the world’s most highly decorated Marine sniper, this is the definitive book on shooting.”';
  }

  paginateDescription() {
    const chunks = [];
    for (let i = 0; i < this.fullDescription.length; i += this.itemsPerPage) {
      chunks.push(this.fullDescription.slice(i, i + this.itemsPerPage));
    }
    this.paginatedDescription = chunks;
  }

  get totalPages(): number {
    return this.paginatedDescription.length;
  }
  updateProgress() {
    let loggedInUser = JSON.parse(localStorage.getItem('current-user') || '{}');
    const userId =loggedInUser.id;
    const readingKey = `reading-book-${userId}-${this.bookName}`;
    localStorage.setItem(readingKey, JSON.stringify({
      userId,
      bookName: this.bookName,
      page: this.currentPage
    }));
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateProgress();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateProgress();
    }
  }
}
