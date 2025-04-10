import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromStorage());

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  private getAllUsers(): User[] {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  }

  private saveAllUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

    createMockJWT(payload: object): string {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };
    const encode = (obj: object) => btoa(JSON.stringify(obj));

    return `${encode(header)}.${encode(payload)}.signature`;
  }

  decodeMockJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  signup(user: User): void {
    const users = this.getAllUsers();
    const exists = users.find(u => u.email === user.email);
    if (exists) throw new Error('User already exists');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }


  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('current-user');
    this.currentUserSubject.next(null);

  }

  private getCurrentUserFromStorage(): User | null {
    const user = localStorage.getItem('current-user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    const decoded = token ? this.decodeMockJWT(token) : null;
    return !!decoded?.email;
  }
  login(email: string, password: string): 'not_found' | 'wrong_password' | 'success' {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email);

    if (!user) {return 'not_found';}
    if (user.password !== password) {return 'wrong_password';}

    const token = this.createMockJWT({ id: user.id, email: user.email, name: user.name });
    localStorage.setItem('jwt', token);
    localStorage.setItem('current-user', JSON.stringify(user));
    this.currentUserSubject.next(user);

    return 'success';
  }


}
