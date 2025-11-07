import { Component, computed, ElementRef, model, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { CurrencyConversionService, IConversionRequest, IConversionResponse, ICurrency } from '@currency-conversion/services';

@Component({
  selector: 'cc-currency-conversion',
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    DatePipe,
    NgxMaskDirective
  ],
  templateUrl: './currency-conversion.component.html',
  styleUrls: ['./currency-conversion.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    provideNgxMask()
  ]
})
export class CurrencyConversionComponent implements OnInit {
  private processing = signal(false);
  loading = computed(() => {
    return this.processing();
  });

  converterForm!: FormGroup;
  conversionResult = model<IConversionResponse | null>(null);
  currencies: ICurrency[] = [];

  @ViewChild('fromCurrency') fromCurrencyInput: ElementRef<HTMLInputElement>;
  @ViewChild('toCurrency') toCurrencyInput: ElementRef<HTMLInputElement>;

  filteredFromCurrencies!: ICurrency[];
  filteredToCurrencies!: ICurrency[];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private currencyConversionService: CurrencyConversionService) { }
  ngOnInit(): void {

    this.converterForm = this.fb.group({
      fromCurrency: [null, Validators.required],
      toCurrency: [null, Validators.required],
      amount: [1, [Validators.required, Validators.min(1)]]
    });

    this.converterForm.valueChanges.subscribe((value) => {
      this.conversionResult.set(null);
    })

    this.currencyConversionService.getCurrencies().subscribe({
      next: (currencies) => {
        this.currencies = currencies;
        const defaultFrom = currencies.find(c => c.code === 'USD') || currencies[0];
        const defaultTo = currencies.find(c => c.code === 'AUD') || currencies[1];
        this.converterForm.patchValue({
          fromCurrency: defaultFrom.code,
          toCurrency: defaultTo.code
        })
      },
      error: ({ message }) => this.showMessage(message)
    });
  }

  fromCurrencySelected(e: MatAutocompleteSelectedEvent): void {
    if (this.converterForm.controls.toCurrency.value === e.option.value) {
      this.converterForm.controls.toCurrency.reset();
    }
  }

  toCurrencySelected(e: MatAutocompleteSelectedEvent): void {
    if (this.converterForm.controls.fromCurrency.value === e.option.value) {
      this.converterForm.controls.fromCurrency.reset()
    }
  }

  swapCurrency() {
    if (this.converterForm.controls.fromCurrency.valid && this.converterForm.controls.toCurrency.valid) {
      const fc = this.converterForm.controls.fromCurrency.value;
      const tc = this.converterForm.controls.toCurrency.value;
      this.converterForm.patchValue({
        fromCurrency: tc,
        toCurrency: fc
      })
    }
  }

  convert() {
    if (!this.converterForm.invalid) {
      const { fromCurrency, toCurrency, amount } = this.converterForm.value;

      const request: IConversionRequest = {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        amount
      };

      this.currencyConversionService.convert(request).subscribe({
        next: (response) => {
          this.conversionResult.set(response);
        },
        error: ({ message }) => this.showMessage(message)
      })
    }
  }

  filterFromCurrencies(clearFilter: boolean = false): void {
    if (clearFilter) {
      this.fromCurrencyInput.nativeElement.select();
      this.filteredFromCurrencies = this._filter('');
    } else {
      const filterValue = this.fromCurrencyInput.nativeElement.value?.toLowerCase() || '';
      this.filteredFromCurrencies = this._filter(filterValue);
    }
  }

  filterToCurrencies(clearFilter: boolean = false): void {
    if (clearFilter) {
      this.toCurrencyInput.nativeElement.select();
      this.filteredToCurrencies = this._filter('');
    } else {
      const filterValue = this.toCurrencyInput.nativeElement.value?.toLowerCase() || '';
      this.filteredToCurrencies = this._filter(filterValue);
    }
  }

  private _filter(value: string): ICurrency[] {
    const data = this.currencies.filter(currency => currency.code.toLowerCase().includes(value));
    return data;
  }

  private showMessage(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: 'error-snackbar'
    });
  }
}
