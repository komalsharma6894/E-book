import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth.service';
import {NgToastModule} from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgToastModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
