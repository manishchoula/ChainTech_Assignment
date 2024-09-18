import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule, RouterModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css',

})
export class ListingComponent implements OnInit {

  items: any[] = [];
  filteredItems: any[] = [];
  filterText: string = '';
  sortDirection: string = 'asc';

  constructor(private itemService: ItemsService) { }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data => {
      this.items = data; // Response is stored 
      this.filteredItems = [...this.items]; // Clone the items to filteredItems
      // console.log(data);
    });

  }

  filterItems(): void {
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  sortItems(): void {
    const direction = this.sortDirection === 'asc' ? 1 : -1;
    this.filteredItems.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1 * direction;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1 * direction;
      return 0;
    });
  }

  changeSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortItems();
  }

}
