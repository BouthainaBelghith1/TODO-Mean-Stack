import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.services';
import { Item } from '../../models/item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  newItem = { name: '', price: 0};
  Item = { name: '', price: 0 , description:''};
  isLoading: boolean = true; 
  errorMessage: string | null = null;
  constructor(private itemService: ItemService, private router: Router) {

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

  deleteItem(id: string): void {
    this.itemService.deleteItem(id).subscribe(() => this.loadItems());
  }


  trackItem(index: number, item: any): number {
    return item.id; 
  }

  editItem(itemId: string): void{
    this.router.navigate(['/edit-item', itemId]);
  }

}
