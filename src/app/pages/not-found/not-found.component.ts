import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class PageNotFoundComponent implements OnInit{
    public destinationLink: string = '';
    public linkText: string = '';

    constructor() { }

    ngOnInit(): void {
    const token = localStorage.getItem('jwt_token');

    if (token) {
      this.destinationLink = '/dashboard';
      this.linkText = 'Return to dashboard';
    } else {
      this.destinationLink = '/login';
      this.linkText = 'Return to login page';
    }
  }

}