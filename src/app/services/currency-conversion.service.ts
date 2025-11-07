import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@currency-conversion/core/tokens';

export interface ICurrency {
  code: string;
  name: string;
}

export interface ICurrencyRate {
  code: string;
  rate: number;
}

export interface IExchangeRates {
  base: string;
  timestamp: Date; 
  rates: ICurrencyRate[];
}

export interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface IConversionRequest {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

export interface IConversionMeta {
  timestamp: Date;
  rate: number;
}

export interface IConversionResponse {
  amount: number;
  request: IConversionRequest;
  meta: IConversionMeta
}
export interface IConversionHistory {
  conversionDate: Date;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
}

export interface PagedResponse<T> {
  total: number;
  data: T[];
}

@Injectable()
export class CurrencyConversionService {

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiBaseUrl: string) {}

  getExchangeRates(base = 'USD'): Observable<IExchangeRates> {
    return this.http.get<IExchangeRates>(`${this.apiBaseUrl}/api/rates/${base}`);
  }

  getCurrencies(): Observable<ICurrency[]> {
    return this.http.get<ICurrency[]>(`${this.apiBaseUrl}/api/currencies`);
  }

  getCurrencyConversionHistory(page: number, pageSize: number): Observable<PagedResponse<IConversionHistory>> {
    return this.http.get<PagedResponse<IConversionHistory>>(`${this.apiBaseUrl}/api/conversion/history/${page}/${pageSize}`);
  }

  convert(conversionRequest: IConversionRequest): Observable<IConversionResponse> {
    return this.http.post<IConversionResponse>(`${this.apiBaseUrl}/api/conversion`, conversionRequest)
  }
}
