import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

