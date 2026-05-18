import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      <div *ngFor="let n of notifications$ | async" 
           [class]="'notification-card ' + n.type"
           (click)="remove(n.id)">
        <div class="notification-icon">
          <span *ngIf="n.type === 'success'">✓</span>
          <span *ngIf="n.type === 'error'">✕</span>
          <span *ngIf="n.type === 'info'">ℹ</span>
          <span *ngIf="n.type === 'warning'">⚠</span>
        </div>
        <div class="notification-content">
          <div class="notification-title" *ngIf="n.title">{{ n.title }}</div>
          <div class="notification-message">{{ n.message }}</div>
        </div>
        <div class="notification-progress" [style.animation-duration.ms]="n.duration"></div>
      </div>
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .notification-card {
      pointer-events: auto;
      width: 320px;
      padding: 16px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      display: flex;
      gap: 12px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      animation: slideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border-left: 4px solid #ccc;
    }

    .notification-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .notification-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      flex-shrink: 0;
    }

    .notification-content {
      flex: 1;
    }

    .notification-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
      color: #1a1a1a;
    }

    .notification-message {
      font-size: 13px;
      color: #666;
      line-height: 1.4;
    }

    /* Types */
    .success { border-left-color: #10b981; }
    .success .notification-icon { background: #dcfce7; color: #10b981; }
    
    .error { border-left-color: #ef4444; }
    .error .notification-icon { background: #fee2e2; color: #ef4444; }
    
    .info { border-left-color: #3b82f6; }
    .info .notification-icon { background: #dbeafe; color: #3b82f6; }
    
    .warning { border-left-color: #f59e0b; }
    .warning .notification-icon { background: #fef3c7; color: #f59e0b; }

    .notification-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: rgba(0, 0, 0, 0.05);
      width: 100%;
      transform-origin: left;
      animation: progress linear forwards;
    }

    .success .notification-progress { background: #10b98144; }
    .error .notification-progress { background: #ef444444; }
    .info .notification-progress { background: #3b82f644; }
    .warning .notification-progress { background: #f59e0b44; }

    @keyframes progress {
      from { transform: scaleX(1); }
      to { transform: scaleX(0); }
    }
  `]
})
export class NotificationComponent {
  notifications$;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.getNotifications();
  }

  remove(id: number) {
    this.notificationService.remove(id);
  }
}
