import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { CurrencyConversionService, IConversionHistory } from '@currency-conversion/services';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cc-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.scss'],
  imports: [
    MatTableModule, MatPaginatorModule, MatButtonModule,
    DecimalPipe, DatePipe
  ],
  encapsulation: ViewEncapsulation.None
})
export class CurrencyHistoryComponent implements OnInit {
  displayedColumns: string[] = ['ConversionDate', 'FromCurrency', 'ToCurrency', 'ExchangeRate', 'FromAmount', 'ToAmount'];
  dataSource = new MatTableDataSource<IConversionHistory>();
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private snackBar: MatSnackBar, private currencyConversionService: CurrencyConversionService) {}
  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  onRefresh() {
    this.loadData(this.pageIndex, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  private loadData(pageIndex: number, pageSize: number) {
    this.currencyConversionService.getCurrencyConversionHistory(pageIndex + 1, pageSize).subscribe({
      next: (response) => {
        console.log(response);
        this.dataSource.data = response.data;
        this.totalItems = response.total;
      },
      error: ({ message}) => {
         this.snackBar.open(message, null, {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: 'error-snackbar'
          });
      }
    });
  }
}
