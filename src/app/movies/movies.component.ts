import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../shared/movie.model';
import { Subscription } from 'rxjs';
import { MoviesService } from '../shared/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  moviesList: Movie[] = [];
  isFetching: boolean = false;
  isFetchingSubscription!: Subscription;
  moviesChangeSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
  ) { }

  ngOnInit() {
    this.moviesList = this.moviesService.getMovies();
    this.moviesChangeSubscription = this.moviesService.moviesChange.subscribe((movies: Movie[]) => {
      this.moviesList = movies;
    })
    this.isFetchingSubscription = this.moviesService.isFetchingChange.subscribe((isFetching: boolean) => {
      this.isFetching = isFetching;
    })
    this.moviesService.fetchData();
  }

  ngOnDestroy() {
    this.moviesChangeSubscription.unsubscribe();
    this.isFetchingSubscription.unsubscribe();
  }

}
