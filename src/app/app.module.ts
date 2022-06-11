import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from './search.service';
import { SharedService } from './shared.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchbarComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SearchService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
