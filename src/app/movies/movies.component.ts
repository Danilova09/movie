import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../shared/movie.model';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  moviesList: Movie[] = [];
  isFetching: boolean = false;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
  ) { }


  ngOnInit() {
    this.moviesList = this.moviesService.getMovies();
    this.moviesService.moviesChange.subscribe((movies: Movie[]) => {
      this.moviesList = movies;
    })
    this.moviesService.isFetchingChange.subscribe((isFetching: boolean) => {
      this.isFetching = isFetching;
    })
    this.moviesService.fetchData();
  }

  ngOnDestroy() {

  }

}
