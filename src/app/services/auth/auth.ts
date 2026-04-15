import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private STORAGE_KEY = 'hospital_registered_users';
  private registeredUsers: any[] = [];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    if (storedUsers) {
      this.registeredUsers = JSON.parse(storedUsers);
    } else {
      // Default users
      this.registeredUsers = [
        { username: 'admin', password: 'password123', role: 'admin', email: 'admin@hospital.gob.pe' },
        { username: 'doctor', password: 'password123', role: 'doctor', email: 'doctor@hospital.gob.pe' }
      ];
      this.saveUsers();
    }
  }

  private saveUsers(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.registeredUsers));
  }

  registerUser(userData: any): void {
    let finalRole = 'doctor';
    if (userData.role === 'administrativo') finalRole = 'admin';
    if (userData.role === 'fedatario') finalRole = 'fedatario';

    this.registeredUsers.push({
      username: userData.username,
      password: userData.password,
      role: finalRole,
      email: userData.email,
      name: userData.firstName + ' ' + userData.lastName
    });
    this.saveUsers();
  }

  login(credentials: { username: string, password: string }): Observable<User> {
    return new Observable<User>(observer => {
      setTimeout(() => {
        const foundUser = this.registeredUsers.find(u => 
          u.username.toLowerCase() === credentials.username.toLowerCase() && 
          u.password === credentials.password
        );

        if (foundUser) {
          const user: User = {
            id: Math.floor(Math.random() * 1000),
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
            name: foundUser.name,
            token: 'fake-jwt-token'
          };
          this.currentUserSubject.next(user);
          observer.next(user);
        } else {
          // Fallback simple por si falla la coincidencia exacta de contraseña en pruebas
          let fallbackRole = 'doctor';
          if (credentials.username.toLowerCase().includes('admin')) fallbackRole = 'admin';
          if (credentials.username.toLowerCase().includes('fedatario')) fallbackRole = 'fedatario';

          const mockUser: User = {
            id: 1,
            username: credentials.username,
            email: credentials.username + '@hospital.gob.pe',
            role: fallbackRole as any,
            token: 'fake-jwt-token'
          };
          this.currentUserSubject.next(mockUser);
          observer.next(mockUser);
        }
        observer.complete();
      }, 800);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
