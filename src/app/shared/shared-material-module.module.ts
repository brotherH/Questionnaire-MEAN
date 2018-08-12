import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// 引入 material 模块
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatListModule,
  MatCardModule,
  MatBadgeModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
} from '@angular/material';

@NgModule({
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ]
})
export class SharedMaterialModuleModule { }
