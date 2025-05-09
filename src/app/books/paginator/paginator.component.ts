import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-custom-paginator',
  imports: [CommonModule, MatPaginatorModule],
  template: `
    <mat-paginator
      [length]="length"
      [pageSize]="pageSize"
      [pageSizeOptions]="pageSizeOptions"
      [showFirstLastButtons]="showFirstLastButtons"
      (page)="onPageChange($event)"
      aria-label="Oldal lapozása"
    ></mat-paginator>
  `,
  styles: [`
    mat-paginator {
      background: transparent;
      margin-top: 16px;
    }
  `]
})
export class CustomPaginatorComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  @Input() length: number = 0;
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() showFirstLastButtons: boolean = true;
  
  @Output() pageChanged = new EventEmitter<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }

  reset() {
    this.paginator.firstPage();
  }
}