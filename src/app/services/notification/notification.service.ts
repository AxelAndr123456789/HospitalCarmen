import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$ = new BehaviorSubject<Notification[]>([]);
  private counter = 0;

  getNotifications(): Observable<Notification[]> {
    return this.notifications$.asObservable();
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', title?: string, duration: number = 5000) {
    const id = this.counter++;
    const notification: Notification = { id, message, type, title, duration };
    
    const current = this.notifications$.value;
    this.notifications$.next([...current, notification]);

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }
  }

  success(message: string, title: string = 'Éxito') {
    this.show(message, 'success', title);
  }

  error(message: string, title: string = 'Error') {
    this.show(message, 'error', title);
  }

  info(message: string, title: string = 'Información') {
    this.show(message, 'info', title);
  }

  warning(message: string, title: string = 'Advertencia') {
    this.show(message, 'warning', title);
  }

  remove(id: number) {
    const current = this.notifications$.value;
    this.notifications$.next(current.filter(n => n.id !== id));
  }
}
