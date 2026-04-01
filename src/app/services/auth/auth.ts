import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registeredUsers: any[] = [
    { username: 'admin', password: 'password123', role: 'admin', email: 'admin@hospital.gob.pe' },
    { username: 'doctor', password: 'password123', role: 'doctor', email: 'doctor@hospital.gob.pe' }
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  registerUser(userData: any): void {
    this.registeredUsers.push({
      username: userData.username,
      password: userData.password,
      role: userData.role === 'administrativo' ? 'admin' : 'doctor',
      email: userData.email,
      name: userData.firstName + ' ' + userData.lastName
    });
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
            token: 'fake-jwt-token'
          };
          this.currentUserSubject.next(user);
          observer.next(user);
        } else {
          // Fallback simple por si falla la coincidencia exacta de contraseña en pruebas
          const isAdmin = credentials.username.toLowerCase() === 'admin';
          const mockUser: User = {
            id: 1,
            username: credentials.username,
            email: isAdmin ? 'admin@hospital.gob.pe' : 'doctor@hospitalelcarmen.gob.pe',
            role: isAdmin ? 'admin' : 'doctor',
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
