import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<User> {
    // Aquí se conectaría con la API real en la capa de servicios
    // return this.http.post<User>(`${environment.apiUrl}/auth/login`, credentials)

    // Simulación de login para desarrollo
    return new Observable<User>(observer => {
      setTimeout(() => {
        const mockUser: User = {
          id: 1,
          username: credentials.username,
          email: 'doctor@hospitalelcarmen.gob.pe',
          role: 'doctor',
          token: 'fake-jwt-token'
        };
        this.currentUserSubject.next(mockUser);
        observer.next(mockUser);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}
