import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  public showErrorModal = new Subject<{ message: string, isOpen: boolean }>();

  closeErrorModal(): void {
    this.showErrorModal.next({ message: '', isOpen: false });
  }

  private formatError(error: HttpErrorResponse): string {
    let errorMessage = '不明なエラーが発生しました。'; // Default generic message

    if (error.error instanceof ErrorEvent) {
      // Client-side error (e.g., network error, or script error)
      errorMessage = `クライアントエラー: ${error.error.message}`;
    } else {
      // Server-side error (backend returned an unsuccessful response code)
      if (error.error && error.error.message) {
        // If the backend provides a specific error message in error.error.message
        errorMessage = error.error.message;
      } else if (error.status) {
        // Fallback to status and statusText if no specific message from backend
        errorMessage = `サーバーエラー: ${error.status} - ${error.statusText || '不明なステータス'}`;
      } else {
        // Network error or other unhandled HTTP error
        errorMessage = 'ネットワークエラーが発生しました。'; // Generic network error message
      }
    }

    // Remove any potential URL information from the message
    // This is a heuristic and might need adjustment based on actual error message formats
    errorMessage = errorMessage.replace(/https?:\[^\]\/$.?#.\[^\s]*/g, ''); // Remove URLs

    return errorMessage.trim(); // Trim whitespace
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params }).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          // These errors are handled by AuthInterceptor/AuthService (e.g., session expired modal)
          // Do not show generic error modal or trigger logout here
          return throwError(() => error); // Re-throw the error for AuthInterceptor to handle
        } else {
          const errorMessage = this.formatError(error);
          this.showErrorModal.next({ message: errorMessage, isOpen: true });
          return throwError(() => error);
        }
      })
    );
  }

  post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          // These errors are handled by AuthInterceptor/AuthService (e.g., session expired modal)
          // Do not show generic error modal or trigger logout here
          return throwError(() => error); // Re-throw the error for AuthInterceptor to handle
        } else {
          const errorMessage = this.formatError(error);
          this.showErrorModal.next({ message: errorMessage, isOpen: true });
          return throwError(() => error);
        }
      })
    );
  }

  put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          // These errors are handled by AuthInterceptor/AuthService (e.g., session expired modal)
          // Do not show generic error modal or trigger logout here
          return throwError(() => error); // Re-throw the error for AuthInterceptor to handle
        } else {
          const errorMessage = this.formatError(error);
          this.showErrorModal.next({ message: errorMessage, isOpen: true });
          return throwError(() => error);
        }
      })
    );
  }

  patch<T>(path: string, body: unknown): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          // These errors are handled by AuthInterceptor/AuthService (e.g., session expired modal)
          // Do not show generic error modal or trigger logout here
          return throwError(() => error); // Re-throw the error for AuthInterceptor to handle
        } else {
          const errorMessage = this.formatError(error);
          this.showErrorModal.next({ message: errorMessage, isOpen: true });
          return throwError(() => error);
        }
      })
    );
  }

  delete<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, { params }).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          // These errors are handled by AuthInterceptor/AuthService (e.g., session expired modal)
          // Do not show generic error modal or trigger logout here
          return throwError(() => error); // Re-throw the error for AuthInterceptor to handle
        } else {
          const errorMessage = this.formatError(error);
          this.showErrorModal.next({ message: errorMessage, isOpen: true });
          return throwError(() => error);
        }
      })
    );
  }

  uploadFile<T>(path: string, file: File, additionalData?: { [key: string]: any }): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add any additional data to the form
    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.http.post<T>(`${this.baseUrl}${path}`, formData).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
          // These errors are handled by AuthInterceptor/AuthService (e.g., session expired modal)
          // Do not show generic error modal or trigger logout here
          return throwError(() => error); // Re-throw the error for AuthInterceptor to handle
        } else {
          const errorMessage = this.formatError(error);
          this.showErrorModal.next({ message: errorMessage, isOpen: true });
          return throwError(() => error);
        }
      })
    );
  }
}
