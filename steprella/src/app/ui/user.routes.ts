import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '../layout/default-layout/default-layout.component';

export const userRoutes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        title: 'Steprella | Online Ayakakbı Alışverişi',
        children:[
            {
                path: '',
                loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
            }
        ]
    }
];
