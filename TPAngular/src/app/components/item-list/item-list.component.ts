import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.services';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Review } from '../../models/Review.model';
import { ReviewService } from '../../services/review.services';
@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  newItem = { name: '', price: 0};
  Item = { name: '', price: 0 , description:''};
  isLoading: boolean = true; 
  errorMessage: string | null = null;
  page: number = 1;
  selectedItemId: string = '';
  reviews: Review[] = [];

  constructor(private itemService: ItemService, private router: Router, private reviewService: ReviewService) {

  }


  ngOnInit(): void {
    this.fetchItems();  
  }

  fetchItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        console.log('Fetched items:', data);
        this.items = data;  // Store the fetched items
        this.isLoading = false;  // Hide the loading indicator
      },
      error: (err) => {
        console.error('Error fetching items:', err);  // Log the error
        this.errorMessage = 'Failed to load items';  // Set the error message
        this.isLoading = false;  // Hide the loading indicator
      },
    });
  }
  loadItems(): void {
    this.itemService.getItems().subscribe((data) => (this.items = data));
  }
  isLoader(): boolean {
    return this.isLoading;
  }
  addItem(): void {
    if (this.newItem.name && this.newItem.price) {
      this.itemService.addItem(this.newItem).subscribe(() => {
        this.newItem = { name: '', price: 0 };
        this.loadItems();
      });
    }
  }

  deleteItem(id: string | undefined): void {
    if (id) {
      this.itemService.deleteItem(id).subscribe(() => this.loadItems());
    }
  }


  trackItem(index: number, item: any): number {
    return item.id; 
  }

  editItem(itemId: string | undefined): void{
    if (itemId) {
      this.router.navigate(['/edit-item', itemId]);
    }
  }

  showReviews(): void {
    if (!this.selectedItemId) {
      return;
    }
    this.reviewService.getReviewsByItemId(this.selectedItemId).subscribe({
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
