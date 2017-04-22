import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { OptionsComponent } from './components/options/options.component';


const BIG_ROUTES: Routes = [
    {path: '', redirectTo: 'login',pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'details/:id', component: DetailsComponent},
    {path: 'overview', component: OverviewComponent},
    {path: 'options', component: OptionsComponent},
    {path: 'details', component: DetailsComponent},
    {path: '**', redirectTo: 'login',pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(BIG_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
