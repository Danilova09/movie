import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MoviesService } from '../../shared/movies.service';
import { Movie } from '../../shared/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit, OnDestroy {
  @Input() movie!: Movie;
  isDeleting = false;
  deletingSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.deletingSubscription = this.moviesService.isDeletingChange.subscribe((isDeleting: boolean) => {
      this.isDeleting = isDeleting;
    })
  }

  delete() {
    this.moviesService.deleteMovie(this.movie);
  }

  ngOnDestroy() {
    this.deletingSubscription.unsubscribe();
  }
}
