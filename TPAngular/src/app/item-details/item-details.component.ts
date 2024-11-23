import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReviewService } from '../services/review.services';
import { Review } from '../models/Review.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit{
  itemId: string = '';
  reviews: Review[] = [];

  constructor(private route: ActivatedRoute, private reviewService: ReviewService) {
    this.route.params.subscribe(params => {
      this.itemId = params['id']; 
    });
  }

  ngOnInit(): void {
    this.fetchData();  
  }

  fetchData(): void {
    if (!this.itemId) {
      return;
    }
    this.reviewService.getReviewsByItemId(this.itemId).subscribe({
      next: (data) => {
        this.reviews = data;
        console.log(this.reviews)
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
        this.reviews = [];
      },
    });
  }
}
