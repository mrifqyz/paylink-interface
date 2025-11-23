import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'error-page', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/error-page' }
];
