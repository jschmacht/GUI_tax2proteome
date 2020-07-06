import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  route: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.route = "/input";
  }

  goto(route: string) {
    this.router.navigateByUrl(route);
    this.route = route;
  }

}
