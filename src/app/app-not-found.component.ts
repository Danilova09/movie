import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="alert alert-danger">
      page is not found!
    </div>`,
  styles: [`
    .alert {
      margin: 70px auto;
      width: 700px;
      display: block;
    }`]
})
export class AppNotFoundComponent { }
