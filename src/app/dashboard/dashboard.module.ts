import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
