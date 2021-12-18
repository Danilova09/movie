import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './shared/movies.service';
import { AppNotFoundComponent } from './app-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieItemComponent,
    NewMovieComponent,
    AppNotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
