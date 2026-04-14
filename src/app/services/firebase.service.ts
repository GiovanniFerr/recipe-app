import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  constructor(private http: HttpClient) {}

  createRecipe<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  getRecipes<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  updateRecipe<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(url, body);
  }

  deleteRecipe<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  loginData(url: string, body: {}) {
    return this.http.post(url, body)
  }

  getAccounts() {
    return this.http.get(
      'https://angular-project-c6646-default-rtdb.europe-west1.firebasedatabase.app/accounts.json'
    );
  }
}
