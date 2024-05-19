import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  // standalone: true,
  // imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  searchQuery: string = '';
  fromDate: string = '';
  toDate: string = '';
  selectedCategory: string | undefined;
  searchResults: any[] = [];

  ngOnInit(): void {
    this.selectedCategory = 'Search By Name and Date Range';
  }
  onSearch() {
    console.log('Search Query:', this.searchQuery);
    console.log('From Date:', this.fromDate);
    console.log('To Date:', this.toDate);
    // Add your search logic here

    this.searchResults = [
      {
        column1: 'Result 1 Col 1',
        column2: 'Result 1 Col 2',
        column3: 'Result 1 Col 3',
        column4: 'Result 1 Col 4',
      },
      {
        column1: 'Result 2 Col 1',
        column2: 'Result 2 Col 2',
        column3: 'Result 2 Col 3',
        column4: 'Result 2 Col 4',
      },
      {
        column1: 'Result 3 Col 1',
        column2: 'Result 3 Col 2',
        column3: 'Result 3 Col 3',
        column4: 'Result 3 Col 4',
      },
      // Add more results as needed
    ];
  }
}
