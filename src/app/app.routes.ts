import { Routes } from '@angular/router';
import { CurrencyConversionService } from '@currency-conversion/services';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/ui/layouts').then(m => m.DefaultLayoutComponent),
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'convert',
                loadComponent: () => import('./features/currency-conversion/currency-conversion.component').then(m => m.CurrencyConversionComponent)
            },
            {
                path: 'history',
                loadComponent: () => import('./features/currency-history/currency-history.component').then(m => m.CurrencyHistoryComponent)
            }
        ],
        providers: [
            CurrencyConversionService
        ]
    },


];
