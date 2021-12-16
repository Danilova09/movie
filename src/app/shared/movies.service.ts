import { Movie } from './movie.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MoviesService {
  movies: Movie[] = [];
  moviesChange = new Subject<Movie[]>();
  isFetchingChange = new Subject<boolean>();
  isAddingMovie = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) { }

  getMovies() {
    return this.movies.slice();
  }

  fetchData() {
    this.isFetchingChange.next(true);
    this.http.get<{ [id: string]: Movie }>('https://movielist-1dbc6-default-rtdb.firebaseio.com/movies.json')
      .pipe(map(result => {
        return Object.keys(result).map(id => {
          const movieData = result[id];
          return new Movie(id, movieData.movieName);
        })
      }))
      .subscribe(movies => {
        this.movies = movies;
        this.moviesChange.next(movies);
        this.isFetchingChange.next(false);
      }, error => {
        this.isFetchingChange.next(false);
      })
  }

  addMovieSecond(movieName: string) {
    this.isAddingMovie.next(true);
    const body = {movieName: movieName};
    this.http.post<{[id: string]: string}>( 'https://movielist-1dbc6-default-rtdb.firebaseio.com/movies.json', body)
      .subscribe(result => {
        const id = result.name;
        const  movie = new Movie(id, movieName);
        this.isAddingMovie.next(false);
        this.movies.push(movie);
      })
  }

}
