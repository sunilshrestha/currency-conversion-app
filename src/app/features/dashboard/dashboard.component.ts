import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from "@angular/material/divider";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CurrencyConversionService, ICurrencyRate } from '@currency-conversion/services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cc-dashboard',
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatTableModule, MatIconModule, MatDividerModule, DatePipe, DecimalPipe, ɵInternalFormsSharedModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  base = 'USD';
  timestamp!: Date;
  filterControl: FormControl = new FormControl(null);
  displayedColumns: string[] = ['currency', 'rate'];
  dataSource = new MatTableDataSource<ICurrencyRate>();
  constructor(private snackBar: MatSnackBar, private currencyConversionService: CurrencyConversionService) { }

  ngOnInit(): void {
    this.currencyConversionService.getExchangeRates(this.base).subscribe({
      next: (response) => {
        this.dataSource.data = response.rates;
        this.timestamp = response.timestamp;
      },
      error: ({ message }) => {
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar'
        })
      }
    });

    this.filterControl.valueChanges.subscribe((value)=>{
      this.dataSource.filter = value.trim().toLowerCase();
    })
  }

  clearFilter() {
        this.filterControl.setValue('');
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
