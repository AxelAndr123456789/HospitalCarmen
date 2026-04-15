import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { FedatarioDashboard } from './pages/fedatario-dashboard/fedatario-dashboard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    { path: 'admin-dashboard', component: AdminDashboard },
    { path: 'fedatario-dashboard', component: FedatarioDashboard },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

