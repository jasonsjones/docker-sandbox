import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <a routerLink="/heroes">Heroes</a>
    <router-oulet></router-oulet>
  `
})
export class AppComponent {
  title = 'Tour of Heroes';
}
