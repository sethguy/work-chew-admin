import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { app_routing } from './app.routing';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { PartnetListComponent } from './partnet-list/partnet-list.component';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { AuthGuard } from './app.guard';
import { FireService } from './fire.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPartnerComponent } from './edit-partner/edit-partner.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBI9O72qcsHB1fdvQHADtlPiyazGYy18WI",
      libraries: ["places"]
    }),
    BrowserAnimationsModule,
    GooglePlaceModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    BrowserModule,
    FormsModule,
    app_routing
  ],
  declarations: [AppComponent, HelloComponent, PartnetListComponent, LoginComponent, DashboardComponent, EditPartnerComponent],
  bootstrap: [AppComponent],
  providers: [AuthGuard, FireService]
})
export class AppModule { }
