import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  //durch selector Komponente ansprechbar
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }
  route: String;
  //sobald component geladen, wird ausgeführt was unter ##init steht
  //erstwert festgelegt für route
  ngOnInit(): void {
    this.route ="/input"
  }
  // route merken, hier als ts variable definieren

  goto(route:string){
    this.router.navigateByUrl(route)
    this.route=route
  }

}
