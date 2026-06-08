import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal';

declare const NG_APP_API_URL: string;

@Injectable({ providedIn: 'root' })
export class AnimalService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = (typeof NG_APP_API_URL !== 'undefined' ? NG_APP_API_URL : 'http://localhost:8000/api/animales/');
  }

  getAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  getById(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}${id}/`);
  }

  create(data: Omit<Animal, 'id'>): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, data);
  }

  update(id: string, data: Partial<Animal>): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}${id}/`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}
