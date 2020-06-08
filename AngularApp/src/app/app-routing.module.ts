import { Routes } from '@angular/router';
import { PagolinComponent } from './pagolin/pagolin.component';
import { SignUpComponent } from './pagolin/sign-up/sign-up.component';
import { SignInComponent } from './pagolin/sign-in/sign-in.component';
import { PagolinProfileComponent } from './pagolin-profile/pagolinprofile.component';
import { AuthGuard } from './auth/auth.guard';
import { ListedesppangolinsComponent } from './listedesppangolins/listedesppangolins.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: PagolinComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: PagolinComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'pagolinProfile', component: PagolinProfileComponent,canActivate:[AuthGuard]
    },
 
    
  
    {
        path: 'listPagolin', component: ListedesppangolinsComponent
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/login', pathMatch: 'full'
    }
];