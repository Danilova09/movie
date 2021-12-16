import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  movieName!: string;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submited');
  }
}
