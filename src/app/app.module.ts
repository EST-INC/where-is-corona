import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './pages/map/map.component';
import { MapService } from './core/services/map.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { IntervalService } from './core/services/interval.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {LeafletDemoModule} from './pages/demo/leaflet/leaflet-demo.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LeafletModule.forRoot(),
    LeafletDemoModule
  ],
  providers: [MapService, IntervalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
