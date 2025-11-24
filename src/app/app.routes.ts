import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './components/layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { 
                path: '', redirectTo: 'dashboard', 
                pathMatch: 'full' 
            },
            {
                path: 'dashboard',
                component: DashboardComponent
      },
        ]
    },
    { path: 'error-page', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/error-page' }
];
