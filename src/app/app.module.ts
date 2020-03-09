import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/app-holder/dashboard/dashboard.component';
import { LocationsComponent } from './components/app-holder/locations/locations.component';
import { VehiclesComponent } from './components/app-holder/vehicles/vehicles.component';
import { BookingsComponent } from './components/app-holder/bookings/bookings.component';
import { PageNotFoundComponentComponent } from './components/app-holder/page-not-found-component/page-not-found-component.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    DashboardComponent,
    LocationsComponent,
    VehiclesComponent,
    BookingsComponent,
    PageNotFoundComponentComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'locations',      component: LocationsComponent },
        { path: 'vehicles',      component: VehiclesComponent },
        { path: 'bookings',      component: BookingsComponent },
        // {
        //   path: 'heroes',
        //   component: HeroListComponent,
        //   data: { title: 'Heroes List' }
        // },
        { path: '',
          redirectTo: '/dashboard',
          pathMatch: 'full'
        },
        { path: '**', component: PageNotFoundComponentComponent }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
