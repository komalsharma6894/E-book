import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userFirstName: string = '';
  showMenu = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('current-user') || '{}');
    this.userFirstName = user?.name || 'U';
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
