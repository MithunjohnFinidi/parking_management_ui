import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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

import { ApiService } from './services/api.service';
import { HttpService } from './services/http.service';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import { ModalComponent } from './components/modal/modal.component';
import { httpFactory } from './factory/http.factory';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ToastComponent } from './components/toast/toast.component';

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
    ModalComponent,
    BarChartComponent,
    PieChartComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
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
  providers: [
    ApiService, 
    HttpService,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
