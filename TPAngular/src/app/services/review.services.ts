import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/Review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'http://localhost:3000/api/reviews'; 

  constructor(private http: HttpClient) {}

  getReviewsByItemId(itemId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/item/${itemId}`);
  }
}
