import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../shared/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit, OnDestroy {
  movieName!: string;
  isAddingMovie = false;
  addingMovieSubscription!: Subscription;

  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.addingMovieSubscription = this.moviesService.isAddingMovie.subscribe((isAdding: boolean) => {
      this.isAddingMovie = isAdding;
    })
  }

  onSubmit() {
    this.moviesService.addMovie(this.movieName);
  }

  ngOnDestroy() {
    this.addingMovieSubscription.unsubscribe();
  }

}
