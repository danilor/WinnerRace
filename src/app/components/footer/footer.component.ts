import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public icons: any = [
    {
      label: 'Home',
      img: './assets/img/icons/home.svg',
      action: ()=>{
        const r = this._router.navigate(['/'],
          {
            queryParams: {origin: 'navigation'},
          }
        );
      }
    },
    {
      label: 'Instagram',
      img: './assets/img/icons/instagram.svg',
      action: ()=>{
        window.open('https://www.instagram.com/daniloramirezcr_thearkhive/');
      }
    },
    {
      label: 'Replit',
      img: './assets/img/icons/apps.svg',
      action: ()=>{
        window.open('https://replit.com/@arkofdan');
      }
    },
    {
      label: 'Github',
      img: './assets/img/icons/github.svg',
      action: ()=>{
        window.open('https://github.com/danilor');
      }
    }


  ];


  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

}
