import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';

export interface LoginCredentials {
  email: string;
  password?: string;
}

interface AuthResponse {
  jwtToken: {
    accessToken: string;
    refreshToken: string;
  };
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  public showSessionWarning = new Subject<boolean>();
  public showSessionExpiredModal = new Subject<boolean>();

  constructor() {

  }

  logout(): void {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  closeSessionExpiredModal(): void {
    this.showSessionExpiredModal.next(false);
  }
}
