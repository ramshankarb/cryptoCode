import { Component, OnInit } from '@angular/core';
import { Model } from '../models/list.model';
import { CookieService } from 'angular2-cookie/core';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  cookies: Object[]=[];
  result2: Object;
  public objectKeys = Object.keys;
  arr3: string[];
  newCookie: Model;
  constructor(public _cookieService: CookieService,private toastaService: ToastaService) { }

  ngOnInit() {
    //this.cookies=this._cookieService.getAll();
    this.result2=this._cookieService.getAll();
    console.log(this.result2)
    this.getAllCookies();
  }

  getAllCookies() {
    this.cookies=[];
    console.log(this._cookieService.getAll());
    this.result2=this._cookieService.getAll();
    this.arr3=this.objectKeys(this.result2);
    for(let i of this.arr3){
      this.newCookie = new Model();
      this.newCookie.id=JSON.parse(this.result2[i]).id;
      this.newCookie.marketCap=JSON.parse(this.result2[i]).marketCap;
      this.newCookie.name=JSON.parse(this.result2[i]).name;
      this.newCookie.price=JSON.parse(this.result2[i]).price;
      this.cookies.push(this.newCookie);
    }
    //console.log(this.cookies)
  }

  remove(cookie:any){
    //this.getAllCookies();
    //console.log(cookie)
    //console.log(cookie.id.toString());
    this._cookieService.remove(cookie);
    this.toastaService.warning({
      title: "Success!",
      msg: "Removed from favourites...",
      showClose: false,
      timeout: 3000,
      theme: "bootstrap"
  });
  this.ngOnInit();
  }

}
