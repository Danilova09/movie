import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesService } from '../../shared/movies.service';
import { Movie } from '../../shared/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
  @Input() movie!: Movie;
  isDeleting = false;

  constructor(
    private http: HttpClient,
    private moviesService: MoviesService,
  ) { }

  delete() {
    this.isDeleting = true
    this.http.delete(`https://movielist-1dbc6-default-rtdb.firebaseio.com/movies/${this.movie.id}.json`)
      .subscribe(result => {
        this.isDeleting = false;
        this.moviesService.fetchData();
      });
  }
}
