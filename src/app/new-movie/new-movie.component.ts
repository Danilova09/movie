import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../shared/movies.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../shared/movie.model';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  movieName!: string;
  isFetching = false;
  constructor(
    private moviesService: MoviesService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.moviesService.isFetchingChange.subscribe((isFetching:boolean) => {
      this.isFetching = isFetching;
    })
  }

  onSubmit() {
    const body = {movieName: this.movieName};
    this.http.post<{[id: string]: string}>( 'https://movielist-1dbc6-default-rtdb.firebaseio.com/movies.json', body)
      .subscribe(result => {
        const id = result.name;
        const movie = new Movie(id, this.movieName);
        this.moviesService.addMovie(movie);
        })
  }
}
