import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService,CookieOptions  } from 'angular2-cookie/core';
import { CryptoService } from './crypto.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { RouterModule, Routes } from '@angular/router';
import { ToastaModule } from 'ngx-toasta';
import { FavouritesComponent } from './favourites/favourites.component';
import { DxRangeSelectorModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PriceChartComponent,
    ComparisonComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DxRangeSelectorModule,
    RouterModule.forRoot([
      { path: 'list', component: ListComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'price/:id', component: PriceChartComponent },
      { path :'favourites' , component: FavouritesComponent}
    ]),
    ToastaModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [CryptoService,CookieService,{ provide: CookieOptions, useValue: {} } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function cookieServiceFactory() { return new CookieService(); }